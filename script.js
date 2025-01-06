// Data Array untuk setiap entitas
let pelanggan = [];
let produk = [];
let kategori = [];
let suplier = [];
let transaksi = [];

// Fungsi untuk menampilkan data dalam tabel
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
        document.getElementById('transaksiPelanggan').value = item.pelanggan;
        document.getElementById('transaksiProduk').value = item.produk;
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
    const total = document.getElementById('transaksiTotal').value;
    
    if (pelangganId && produkId && jumlah && total) {
        const pelanggan = pelanggan.find(p => p.id === parseInt(pelangganId));
        const produk = produk.find(p => p.id === parseInt(produkId));
        const newTransaksi = {
            id: transaksi.length + 1,
            pelanggan: pelanggan.nama,
            produk: produk.nama,
            jumlah,
            total,
        };
        transaksi.push(newTransaksi);
        updateTable('transaksiList', transaksi);
        clearForm('transaksiForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk membersihkan form setelah submit
function clearForm(formId) {
    document.getElementById(formId).reset();
}
