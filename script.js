// Data Array untuk setiap entitas
let pelanggan = [];
let produk = [];
let kategori = [];
let suplier = [];
let transaksi = [];
let currentEditingIndex = null;

// Fungsi untuk menampilkan data dalam tabel
function updateTable(elementId, data) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nama}</td>
            ${elementId === 'transaksiList' ? `<td>${item.produk}</td>` : ''}
            ${elementId === 'transaksiList' ? `<td>${item.jumlah}</td>` : ''}
            ${elementId === 'transaksiList' ? `<td>${item.total}</td>` : ''}
            ${elementId === 'transaksiList' ? `<td>${item.pelanggan}</td>` : ''}
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRow('${elementId}', ${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRow('${elementId}', ${index})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi edit row
function editRow(tableId, index) {
    currentEditingIndex = index;
    const data = eval(tableId); // Get the data array from global scope
    const item = data[index];

    if (tableId === 'pelangganList') {
        document.getElementById('pelangganNama').value = item.nama;
        document.getElementById('pelangganEmail').value = item.email;
        document.getElementById('pelangganNoHp').value = item.noHp;
        document.getElementById('savePelangganBtn').style.display = 'none';
        document.getElementById('editPelangganBtn').style.display = 'block';
    } else if (tableId === 'produkList') {
        document.getElementById('produkNama').value = item.nama;
        document.getElementById('produkHarga').value = item.harga;
        document.getElementById('produkStok').value = item.stok;
        document.getElementById('saveProdukBtn').style.display = 'none';
        document.getElementById('editProdukBtn').style.display = 'block';
    } else if (tableId === 'kategoriList') {
        document.getElementById('kategoriNama').value = item.nama;
        document.getElementById('saveKategoriBtn').style.display = 'none';
        document.getElementById('editKategoriBtn').style.display = 'block';
    } else if (tableId === 'suplierList') {
        document.getElementById('suplierNama').value = item.nama;
        document.getElementById('suplierNoHp').value = item.noHp;
        document.getElementById('suplierAlamat').value = item.alamat;
        document.getElementById('saveSuplierBtn').style.display = 'none';
        document.getElementById('editSuplierBtn').style.display = 'block';
    } else if (tableId === 'transaksiList') {
        document.getElementById('transaksiPelanggan').value = item.pelangganId;
        document.getElementById('transaksiProduk').value = item.produkId;
        document.getElementById('transaksiJumlah').value = item.jumlah;
        document.getElementById('transaksiTotal').value = item.total;
        document.getElementById('saveTransaksiBtn').style.display = 'none';
    }
}

// Fungsi delete row
function deleteRow(tableId, index) {
    const data = eval(tableId); // Get the data array from global scope
    data.splice(index, 1);
    updateTable(tableId, data);
}

// Fungsi untuk menambahkan item ke dropdown Transaksi
function populateDropdown() {
    const pelangganSelect = document.getElementById('transaksiPelanggan');
    const produkSelect = document.getElementById('transaksiProduk');
    
    pelangganSelect.innerHTML = pelanggan.map(p => `<option value="${p.id}">${p.nama}</option>`).join('');
    produkSelect.innerHTML = produk.map(p => `<option value="${p.id}">${p.nama}</option>`).join('');
}

// Panggil fungsi untuk populate dropdown
populateDropdown();

// Fungsi untuk menyimpan pelanggan
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

// Fungsi untuk menyimpan produk
document.getElementById('saveProdukBtn').addEventListener('click', () => {
    const nama = document.getElementById('produkNama').value;
    const harga = document.getElementById('produkHarga').value;
    const stok = document.getElementById('produkStok').value;
    
    if (nama && harga && stok) {
        const newProduk = { id: produk.length + 1, nama, harga, stok };
        produk.push(newProduk);
        updateTable('produkList', produk);
        clearForm('produkForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk menyimpan kategori
document.getElementById('saveKategoriBtn').addEventListener('click', () => {
    const nama = document.getElementById('kategoriNama').value;
    
    if (nama) {
        const newKategori = { id: kategori.length + 1, nama };
        kategori.push(newKategori);
        updateTable('kategoriList', kategori);
        clearForm('kategoriForm');
    } else {
        alert('Harap isi field kategori!');
    }
});

// Fungsi untuk menyimpan suplier
document.getElementById('saveSuplierBtn').addEventListener('click', () => {
    const nama = document.getElementById('suplierNama').value;
    const noHp = document.getElementById('suplierNoHp').value;
    const alamat = document.getElementById('suplierAlamat').value;
    
    if (nama && noHp && alamat) {
        const newSuplier = { id: suplier.length + 1, nama, noHp, alamat };
        suplier.push(newSuplier);
        updateTable('suplierList', suplier);
        clearForm('suplierForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk menyimpan transaksi
document.getElementById('saveTransaksiBtn').addEventListener('click', () => {
    const pelangganId = document.getElementById('transaksiPelanggan').value;
    const produkId = document.getElementById('transaksiProduk').value;
    const jumlah = document.getElementById('transaksiJumlah').value;
    const total = jumlah * (produk.find(p => p.id == produkId).harga || 0);
    
    if (pelangganId && produkId && jumlah && total) {
        const pelanggan = pelanggan.find(p => p.id == pelangganId);
        const produk = produk.find(p => p.id == produkId);
        const newTransaksi = { id: transaksi.length + 1, pelangganId, produkId, pelanggan: pelanggan.nama, produk: produk.nama, jumlah, total };
        transaksi.push(newTransaksi);
        updateTable('transaksiList', transaksi);
        clearForm('transaksiForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk menyimpan profil user
document.getElementById('saveProfilBtn').addEventListener('click', () => {
    const nama = document.getElementById('profilNama').value;
    const email = document.getElementById('profilEmail').value;
    const password = document.getElementById('profilPassword').value;

    if (nama && email && password) {
        alert('Profil berhasil diperbarui!');
        // Simpan data profil jika diperlukan
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk membersihkan form
function clearForm(formId) {
    document.getElementById(formId).reset();
    document.getElementById('savePelangganBtn').style.display = 'block';
    document.getElementById('editPelangganBtn').style.display = 'none';
    document.getElementById('saveProdukBtn').style.display = 'block';
    document.getElementById('editProdukBtn').style.display = 'none';
    document.getElementById('saveKategoriBtn').style.display = 'block';
    document.getElementById('editKategoriBtn').style.display = 'none';
    document.getElementById('saveSuplierBtn').style.display = 'block';
    document.getElementById('editSuplierBtn').style.display = 'none';
    document.getElementById('saveTransaksiBtn').style.display = 'block';
}
