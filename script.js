// Inisialisasi Data
let pelanggan = [];
let produk = [];
let kategori = [];
let suplier = [];
let transaksi = [];
let users = [];

let currentEditingIndex = null;

// Fungsi CRUD untuk Pelanggan
document.getElementById('pelangganForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('pelangganNama').value;
    const email = document.getElementById('pelangganEmail').value;
    const noHp = document.getElementById('pelangganNoHp').value;

    if (currentEditingIndex !== null) {
        pelanggan[currentEditingIndex] = { id: `P${currentEditingIndex + 1}`, nama, email, noHp };
        currentEditingIndex = null;
        document.getElementById('savePelangganBtn').style.display = 'block';
        document.getElementById('editPelangganBtn').style.display = 'none';
    } else {
        const id = `P${pelanggan.length + 1}`;
        pelanggan.push({ id, nama, email, noHp });
    }

    updateTable('pelangganList', pelanggan);
    e.target.reset();
});

// Fungsi CRUD untuk Produk
document.getElementById('produkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('produkNama').value;
    const harga = document.getElementById('produkHarga').value;
    const stok = document.getElementById('produkStok').value;

    if (currentEditingIndex !== null) {
        produk[currentEditingIndex] = { id: `PR${currentEditingIndex + 1}`, nama, harga, stok };
        currentEditingIndex = null;
        document.getElementById('saveProdukBtn').style.display = 'block';
        document.getElementById('editProdukBtn').style.display = 'none';
    } else {
        const id = `PR${produk.length + 1}`;
        produk.push({ id, nama, harga, stok });
    }

    updateTable('produkList', produk);
    e.target.reset();
});

// Fungsi CRUD untuk Kategori
document.getElementById('kategoriForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('kategoriNama').value;

    if (currentEditingIndex !== null) {
        kategori[currentEditingIndex] = { id: `K${currentEditingIndex + 1}`, nama };
        currentEditingIndex = null;
        document.getElementById('saveKategoriBtn').style.display = 'block';
        document.getElementById('editKategoriBtn').style.display = 'none';
    } else {
        const id = `K${kategori.length + 1}`;
        kategori.push({ id, nama });
    }

    updateTable('kategoriList', kategori);
    e.target.reset();
});

// Fungsi CRUD untuk Suplier
document.getElementById('suplierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('suplierNama').value;
    const noHp = document.getElementById('suplierNoHp').value;
    const alamat = document.getElementById('suplierAlamat').value;

    if (currentEditingIndex !== null) {
        suplier[currentEditingIndex] = { id: `S${currentEditingIndex + 1}`, nama, noHp, alamat };
        currentEditingIndex = null;
        document.getElementById('saveSuplierBtn').style.display = 'block';
        document.getElementById('editSuplierBtn').style.display = 'none';
    } else {
        const id = `S${suplier.length + 1}`;
        suplier.push({ id, nama, noHp, alamat });
    }

    updateTable('suplierList', suplier);
    e.target.reset();
});

// Fungsi CRUD untuk Transaksi
document.getElementById('transaksiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pelanggan = document.getElementById('transaksiPelanggan').value;
    const produk = document.getElementById('transaksiProduk').value;
    const jumlah = document.getElementById('transaksiJumlah').value;
    const total = document.getElementById('transaksiTotal').value;

    const id = `T${transaksi.length + 1}`;
    transaksi.push({ id, pelanggan, produk, jumlah, total, tanggal: new Date().toLocaleDateString() });
    updateTable('transaksiList', transaksi);
    e.target.reset();
});

// Fungsi CRUD untuk Profil User
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('profileUsername').value;
    const email = document.getElementById('profileEmail').value;
    const password = document.getElementById('profilePassword').value;

    // Tambahkan logika penyimpanan profil user
    console.log('Profil disimpan:', { username, email, password });
});

// Fungsi untuk update table
function updateTable(elementId, data) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.innerText = item[key];
                row.appendChild(cell);
            }
        }
        row.innerHTML += `
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRow(${elementId}, ${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRow(${elementId}, ${index})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk edit row
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
    }
    // Add similar logic for other tables
}

// Fungsi untuk delete row
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
