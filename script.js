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

// Fungsi CRUD Transaksi
document.getElementById('saveTransaksiBtn').addEventListener('click', () => {
    const pelangganId = document.getElementById('transaksiPelanggan').value;
    const produkId = document.getElementById('transaksiProduk').value;
    const jumlah = document.getElementById('transaksiJumlah').value;
    const total = produk.find(p => p.id === parseInt(produkId)).harga * jumlah;

    if (pelangganId && produkId && jumlah) {
        const newTransaksi = { id: transaksi.length + 1, pelangganId, produkId, jumlah, total };
        transaksi.push(newTransaksi);
        updateTable('transaksiList', transaksi);
        clearForm('transaksiForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk clear form
function clearForm(formId) {
    document.getElementById(formId).reset();
}

// Fungsi untuk populate dropdown
function populateDropdown(data, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '<option value="">Pilih...</option>';
    data.forEach(item => {
        dropdown.innerHTML += `<option value="${item.id}">${item.nama}</option>`;
    });
}

// Populate dropdowns
populateDropdown(pelanggan, 'transaksiPelanggan');
populateDropdown(produk, 'transaksiProduk');
populateDropdown(kategori, 'produkKategori');
