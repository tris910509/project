let keranjang = [];
let transaksiList = JSON.parse(localStorage.getItem('transaksi')) || [];
let pelangganList = JSON.parse(localStorage.getItem('pelanggan')) || [];
let produkList = JSON.parse(localStorage.getItem('produk')) || [];
let idCounter = transaksiList.length + 1;

// Fungsi untuk mengisi data pelanggan ke dropdown
function renderPelanggan() {
    const pelangganSelect = document.getElementById('pelanggan');
    pelangganList.forEach((pelanggan) => {
        const option = document.createElement('option');
        option.value = pelanggan.id;
        option.textContent = `${pelanggan.nama} (ID: ${pelanggan.id})`;
        pelangganSelect.appendChild(option);
    });
}

// Fungsi untuk mengisi data produk ke dropdown
function renderProduk() {
    const produkSelect = document.getElementById('produk');
    produkList.forEach((produk) => {
        const option = document.createElement('option');
        option.value = produk.id;
        option.textContent = `${produk.nama} - Rp ${produk.harga}`;
        produkSelect.appendChild(option);
    });
}

// Tambahkan produk ke keranjang
function tambahKeKeranjang() {
    const produkId = document.getElementById('produk').value;
    const jumlah = parseInt(document.getElementById('jumlahProduk').value);

    if (!produkId || isNaN(jumlah) || jumlah < 1) {
        alert('Pilih produk dan masukkan jumlah yang valid!');
        return;
    }

    const produk = produkList.find((p) => p.id === produkId);
    const existingItem = keranjang.find((item) => item.id === produkId);

    if (existingItem) {
        existingItem.jumlah += jumlah;
    } else {
        keranjang.push({
            id: produk.id,
            nama: produk.nama,
            harga: produk.harga,
            potongan: produk.potongan || 0,
            jumlah,
        });
    }

    renderKeranjang();
}

// Render keranjang belanja
function renderKeranjang() {
    const keranjangList = document.getElementById('keranjangList');
    keranjangList.innerHTML = '';
    let totalHarga = 0;

    keranjang.forEach((item, index) => {
        const subtotal = (item.harga - item.potongan) * item.jumlah;
        totalHarga += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${item.harga}</td>
            <td>Rp ${item.potongan}</td>
            <td>Rp ${subtotal}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="hapusDariKeranjang(${index})">Hapus</button>
            </td>
        `;
        keranjangList.appendChild(row);
    });

    document.getElementById('totalHarga').textContent = `Rp ${totalHarga}`;
}

// Hapus item dari keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    renderKeranjang();
}

// Proses transaksi
function prosesTransaksi(e) {
    e.preventDefault();

    if (keranjang.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    const pelangganId = document.getElementById('pelanggan').value;
    const metode = document.getElementById('metodePembayaran').value;
    const bayar = parseFloat(document.getElementById('bayar').value);
    const totalHarga = keranjang.reduce((sum, item) => sum + (item.harga - item.potongan) * item.jumlah, 0);

    if (!pelangganId || !metode || isNaN(bayar)) {
        alert('Isi semua data transaksi dengan benar!');
        return;
    }

    const statusPembayaran =
        metode === 'Cash' && bayar >= totalHarga
            ? 'Lunas'
            : metode === 'Cash'
            ? 'Belum Lunas'
            : 'Menunggu Konfirmasi';

    const buktiPembayaran =
        metode !== 'Cash' && document.getElementById('buktiPembayaran').files.length > 0
            ? URL.createObjectURL(document.getElementById('buktiPembayaran').files[0])
            : null;

    if (metode !== 'Cash' && !buktiPembayaran) {
        alert('Unggah bukti pembayaran untuk metode non-cash!');
        return;
    }

    const transaksiBaru = {
        id: `TRX-${new Date().toISOString().slice(0, 10)}-${idCounter++}`,
        pelanggan: pelangganId,
        produk: [...keranjang],
        metode,
        totalHarga,
        bayar,
        buktiPembayaran,
        statusPembayaran,
    };

    transaksiList.push(transaksiBaru);
    localStorage.setItem('transaksi', JSON.stringify(transaksiList));

    keranjang = [];
    renderKeranjang();
    renderTransaksi();
    alert('Transaksi berhasil diproses!');
}

// Render transaksi
function renderTransaksi() {
    const transaksiTable = document.getElementById('transaksiTable');
    transaksiTable.innerHTML = '';

    transaksiList.forEach((transaksi) => {
        const produkList = transaksi.produk.map((p) => `${p.nama} x${p.jumlah}`).join(', ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaksi.id}</td>
            <td>${pelangganList.find((p) => p.id === transaksi.pelanggan)?.nama || 'Umum'}</td>
            <td>${produkList}</td>
            <td>${transaksi.metode}</td>
            <td>Rp ${transaksi.totalHarga}</td>
            <td>${transaksi.statusPembayaran}</td>
            <td>
                ${
                    transaksi.statusPembayaran === 'Menunggu Konfirmasi'
                        ? `<button class="btn btn-success btn-sm" onclick="konfirmasiPembayaran('${transaksi.id}')">Konfirmasi</button>`
                        : ''
                }
                <button class="btn btn-info btn-sm" onclick="lihatDetail('${transaksi.id}')">Detail</button>
            </td>
        `;
        transaksiTable.appendChild(row);
    });
}

// Konfirmasi pembayaran
function konfirmasiPembayaran(transaksiId) {
    const transaksi = transaksiList.find((t) => t.id === transaksiId);

    if (transaksi && transaksi.buktiPembayaran) {
        transaksi.statusPembayaran = 'Lunas';
        localStorage.setItem('transaksi', JSON.stringify(transaksiList));
        renderTransaksi();
        alert('Pembayaran berhasil dikonfirmasi!');
    } else {
        alert('Tidak ada bukti pembayaran untuk transaksi ini!');
    }
}

// Lihat detail transaksi
function lihatDetail(transaksiId) {
    const transaksi = transaksiList.find((t) => t.id === transaksiId);
    if (!transaksi) return;

    let detail = `
        ID Transaksi: ${transaksi.id}
        Pelanggan: ${pelangganList.find((p) => p.id === transaksi.pelanggan)?.nama || 'Umum'}
        Produk: ${transaksi.produk.map((p) => `${p.nama} x${p.jumlah}`).join(', ')}
        Metode: ${transaksi.metode}
        Total: Rp ${transaksi.totalHarga}
        Status: ${transaksi.statusPembayaran}
    `;

    if (transaksi.buktiPembayaran) {
        detail += `\nBukti Pembayaran: ${transaksi.buktiPembayaran}`;
    }

    alert(detail);
}

// Inisialisasi data awal
document.addEventListener('DOMContentLoaded', () => {
    renderPelanggan();
    renderProduk();
    renderKeranjang();
    renderTransaksi();
});
