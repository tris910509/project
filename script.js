let pelanggan = [];
let produk = [];
let kategori = [];
let suplier = [];
let transaksi = [];

// Fungsi untuk update tabel
function updateTable(elementId, data) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nama || item.produk || item.kategori || item.suplier}</td>
            <td>${item.email || item.noHp || item.perusahaan || item.jumlah || item.total}</td>
            <td>${item.kategori || item.stok || ''}</td>
            <td>${item.harga || ''}</td>
            <td>${item.aksi || ''}</td>
        `;
        row.innerHTML += `
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}" data-type="${elementId}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}" data-type="${elementId}">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi CRUD Pelanggan
document.getElementById('savePelangganBtn').addEventListener('click', () => {
    const nama = document.getElementById('pelangganNama').value;
    const email = document.getElementById('pelangganEmail').value;
    const noHp = document.getElementById('pelangganNoHp').value;

    if (nama && email && noHp) {
        const newPelanggan = { id: pelanggan.length + 1, nama, email, noHp };
        pelanggan.push(newPelanggan);
        updateTable('pelangganList', pelanggan);
        clearForm('pelangganForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi Edit Pelanggan
document.getElementById('pelangganList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const pelangganItem = pelanggan.find(p => p.id == id);
        document.getElementById('pelangganNama').value = pelangganItem.nama;
        document.getElementById('pelangganEmail').value = pelangganItem.email;
        document.getElementById('pelangganNoHp').value = pelangganItem.noHp;
        document.getElementById('savePelangganBtn').style.display = 'none';
        document.getElementById('editPelangganBtn').style.display = 'inline-block';
        document.getElementById('editPelangganBtn').setAttribute('data-id', id);
    }
});

document.getElementById('editPelangganBtn').addEventListener('click', () => {
    const id = document.getElementById('editPelangganBtn').getAttribute('data-id');
    const nama = document.getElementById('pelangganNama').value;
    const email = document.getElementById('pelangganEmail').value;
    const noHp = document.getElementById('pelangganNoHp').value;

    const pelangganIndex = pelanggan.findIndex(p => p.id == id);
    pelanggan[pelangganIndex] = { id, nama, email, noHp };
    updateTable('pelangganList', pelanggan);
    clearForm('pelangganForm');
    document.getElementById('editPelangganBtn').style.display = 'none';
    document.getElementById('savePelangganBtn').style.display = 'inline-block';
});

// Fungsi Hapus Pelanggan
document.getElementById('pelangganList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        pelanggan = pelanggan.filter(p => p.id != id);
        updateTable('pelangganList', pelanggan);
    }
});

// Fungsi CRUD Produk
document.getElementById('saveProdukBtn').addEventListener('click', () => {
    const namaProduk = document.getElementById('produkNama').value;
    const kategoriId = document.getElementById('produkKategori').value;
    const stok = document.getElementById('produkStok').value;
    const harga = document.getElementById('produkHarga').value;

    if (namaProduk && kategoriId && stok && harga) {
        const newProduk = { id: produk.length + 1, nama: namaProduk, kategori: kategoriId, stok, harga };
        produk.push(newProduk);
        updateTable('produkList', produk);
        clearForm('produkForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi Edit Produk
document.getElementById('produkList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const produkItem = produk.find(p => p.id == id);
        document.getElementById('produkNama').value = produkItem.nama;
        document.getElementById('produkKategori').value = produkItem.kategori;
        document.getElementById('produkStok').value = produkItem.stok;
        document.getElementById('produkHarga').value = produkItem.harga;
        document.getElementById('saveProdukBtn').style.display = 'none';
        document.getElementById('editProdukBtn').style.display = 'inline-block';
        document.getElementById('editProdukBtn').setAttribute('data-id', id);
    }
});

document.getElementById('editProdukBtn').addEventListener('click', () => {
    const id = document.getElementById('editProdukBtn').getAttribute('data-id');
    const namaProduk = document.getElementById('produkNama').value;
    const kategoriId = document.getElementById('produkKategori').value;
    const stok = document.getElementById('produkStok').value;
    const harga = document.getElementById('produkHarga').value;

    const produkIndex = produk.findIndex(p => p.id == id);
    produk[produkIndex] = { id, nama: namaProduk, kategori: kategoriId, stok, harga };
    updateTable('produkList', produk);
    clearForm('produkForm');
    document.getElementById('editProdukBtn').style.display = 'none';
    document.getElementById('saveProdukBtn').style.display = 'inline-block';
});

// Fungsi Hapus Produk
document.getElementById('produkList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        produk = produk.filter(p => p.id != id);
        updateTable('produkList', produk);
    }
});

// Fungsi CRUD Kategori
document.getElementById('saveKategoriBtn').addEventListener('click', () => {
    const namaKategori = document.getElementById('kategoriNama').value;

    if (namaKategori) {
        const newKategori = { id: kategori.length + 1, nama: namaKategori };
        kategori.push(newKategori);
        updateTable('kategoriList', kategori);
        clearForm('kategoriForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi Edit Kategori
document.getElementById('kategoriList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const kategoriItem = kategori.find(k => k.id == id);
        document.getElementById('kategoriNama').value = kategoriItem.nama;
        document.getElementById('saveKategoriBtn').style.display = 'none';
        document.getElementById('editKategoriBtn').style.display = 'inline-block';
        document.getElementById('editKategoriBtn').setAttribute('data-id', id);
    }
});

document.getElementById('editKategoriBtn').addEventListener('click', () => {
    const id = document.getElementById('editKategoriBtn').getAttribute('data-id');
    const namaKategori = document.getElementById('kategoriNama').value;

    const kategoriIndex = kategori.findIndex(k => k.id == id);
    kategori[kategoriIndex] = { id, nama: namaKategori };
    updateTable('kategoriList', kategori);
    clearForm('kategoriForm');
    document.getElementById('editKategoriBtn').style.display = 'none';
    document.getElementById('saveKategoriBtn').style.display = 'inline-block';
});

// Fungsi Hapus Kategori
document.getElementById('kategoriList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        kategori = kategori.filter(k => k.id != id);
        updateTable('kategoriList', kategori);
    }
});

// Fungsi CRUD Suplier
document.getElementById('saveSuplierBtn').addEventListener('click', () => {
    const namaSuplier = document.getElementById('suplierNama').value;
    const noHp = document.getElementById('suplierNoHp').value;
    const namaPerusahaan = document.getElementById('suplierPerusahaan').value;
    const alamatPerusahaan = document.getElementById('suplierAlamat').value;

    if (namaSuplier && noHp && namaPerusahaan && alamatPerusahaan) {
        const newSuplier = { id: suplier.length + 1, nama: namaSuplier, noHp, perusahaan: namaPerusahaan, alamat: alamatPerusahaan };
        suplier.push(newSuplier);
        updateTable('suplierList', suplier);
        clearForm('suplierForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi Edit Suplier
document.getElementById('suplierList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const suplierItem = suplier.find(s => s.id == id);
        document.getElementById('suplierNama').value = suplierItem.nama;
        document.getElementById('suplierNoHp').value = suplierItem.noHp;
        document.getElementById('suplierPerusahaan').value = suplierItem.perusahaan;
        document.getElementById('suplierAlamat').value = suplierItem.alamat;
        document.getElementById('saveSuplierBtn').style.display = 'none';
        document.getElementById('editSuplierBtn').style.display = 'inline-block';
        document.getElementById('editSuplierBtn').setAttribute('data-id', id);
    }
});

document.getElementById('editSuplierBtn').addEventListener('click', () => {
    const id = document.getElementById('editSuplierBtn').getAttribute('data-id');
    const namaSuplier = document.getElementById('suplierNama').value;
    const noHp = document.getElementById('suplierNoHp').value;
    const namaPerusahaan = document.getElementById('suplierPerusahaan').value;
    const alamatPerusahaan = document.getElementById('suplierAlamat').value;

    const suplierIndex = suplier.findIndex(s => s.id == id);
    suplier[suplierIndex] = { id, nama: namaSuplier, noHp, perusahaan: namaPerusahaan, alamat: alamatPerusahaan };
    updateTable('suplierList', suplier);
    clearForm('suplierForm');
    document.getElementById('editSuplierBtn').style.display = 'none';
    document.getElementById('saveSuplierBtn').style.display = 'inline-block';
});

// Fungsi Hapus Suplier
document.getElementById('suplierList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        suplier = suplier.filter(s => s.id != id);
        updateTable('suplierList', suplier);
    }
});

// Fungsi CRUD Transaksi
document.getElementById('saveTransaksiBtn').addEventListener('click', () => {
    const pelangganId = document.getElementById('transaksiPelanggan').value;
    const produkId = document.getElementById('transaksiProduk').value;
    const jumlah = document.getElementById('transaksiJumlah').value;
    const total = document.getElementById('transaksiTotal').value;

    if (pelangganId && produkId && jumlah && total) {
        const newTransaksi = { id: transaksi.length + 1, pelanggan: pelangganId, produk: produkId, jumlah, total };
        transaksi.push(newTransaksi);
        updateTable('transaksiList', transaksi);
        clearForm('transaksiForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi Edit Transaksi
document.getElementById('transaksiList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const transaksiItem = transaksi.find(t => t.id == id);
        document.getElementById('transaksiPelanggan').value = transaksiItem.pelanggan;
        document.getElementById('transaksiProduk').value = transaksiItem.produk;
        document.getElementById('transaksiJumlah').value = transaksiItem.jumlah;
        document.getElementById('transaksiTotal').value = transaksiItem.total;
        document.getElementById('saveTransaksiBtn').style.display = 'none';
        document.getElementById('editTransaksiBtn').style.display = 'inline-block';
        document.getElementById('editTransaksiBtn').setAttribute('data-id', id);
    }
});

document.getElementById('editTransaksiBtn').addEventListener('click', () => {
    const id = document.getElementById('editTransaksiBtn').getAttribute('data-id');
    const pelangganId = document.getElementById('transaksiPelanggan').value;
    const produkId = document.getElementById('transaksiProduk').value;
    const jumlah = document.getElementById('transaksiJumlah').value;
    const total = document.getElementById('transaksiTotal').value;

    const transaksiIndex = transaksi.findIndex(t => t.id == id);
    transaksi[transaksiIndex] = { id, pelanggan: pelangganId, produk: produkId, jumlah, total };
    updateTable('transaksiList', transaksi);
    clearForm('transaksiForm');
    document.getElementById('editTransaksiBtn').style.display = 'none';
    document.getElementById('saveTransaksiBtn').style.display = 'inline-block';
});

// Fungsi Hapus Transaksi
document.getElementById('transaksiList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        transaksi = transaksi.filter(t => t.id != id);
        updateTable('transaksiList', transaksi);
    }
});

// Fungsi Clear Form
function clearForm(formId) {
    document.getElementById(formId).reset();
}
