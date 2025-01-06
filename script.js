// Memuat data pelanggan untuk dropdown
function loadPelanggan() {
    const pelangganSelect = document.getElementById('pelangganDropdown');
    pelangganSelect.innerHTML = '<option value="">Pilih Pelanggan</option>';
    pelanggan.forEach(p => {
        pelangganSelect.innerHTML += `<option value="${p.id}">${p.nama}</option>`;
    });
}

// Memuat data kategori untuk dropdown
function loadKategori() {
    const kategoriSelect = document.getElementById('kategoriDropdown');
    kategoriSelect.innerHTML = '<option value="">Pilih Kategori</option>';
    kategori.forEach(k => {
        kategoriSelect.innerHTML += `<option value="${k.id}">${k.nama}</option>`;
    });
}

// Memuat data suplier untuk dropdown
function loadSuplier() {
    const suplierSelect = document.getElementById('suplierDropdown');
    suplierSelect.innerHTML = '<option value="">Pilih Suplier</option>';
    suplier.forEach(s => {
        suplierSelect.innerHTML += `<option value="${s.id}">${s.nama}</option>`;
    });
}

// Memuat data produk untuk dropdown
function loadProduk() {
    const produkSelect = document.getElementById('produkDropdown');
    produkSelect.innerHTML = '<option value="">Pilih Produk</option>';
    produk.forEach(p => {
        produkSelect.innerHTML += `<option value="${p.id}">${p.nama}</option>`;
    });
}

// Fungsi untuk menyimpan pelanggan
document.getElementById('savePelangganBtn').addEventListener('click', () => {
    const nama = document.getElementById('pelangganNama').value;
    const noHp = document.getElementById('pelangganNoHp').value;
    const alamat = document.getElementById('pelangganAlamat').value;

    if (nama && noHp && alamat) {
        const newPelanggan = { id: pelanggan.length + 1, nama, noHp, alamat };
        pelanggan.push(newPelanggan);
        updateTable('pelangganList', pelanggan);
        clearForm('pelangganForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk update pelanggan
function updatePelanggan(id) {
    const pelangganItem = pelanggan.find(p => p.id == id);
    document.getElementById('pelangganNama').value = pelangganItem.nama;
    document.getElementById('pelangganNoHp').value = pelangganItem.noHp;
    document.getElementById('pelangganAlamat').value = pelangganItem.alamat;

    document.getElementById('savePelangganBtn').style.display = 'none';
    document.getElementById('editPelangganBtn').style.display = 'inline-block';
    document.getElementById('editPelangganBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit pelanggan
document.getElementById('editPelangganBtn').addEventListener('click', () => {
    const id = document.getElementById('editPelangganBtn').getAttribute('data-id');
    const nama = document.getElementById('pelangganNama').value;
    const noHp = document.getElementById('pelangganNoHp').value;
    const alamat = document.getElementById('pelangganAlamat').value;

    const pelangganIndex = pelanggan.findIndex(p => p.id == id);
    pelanggan[pelangganIndex] = { id, nama, noHp, alamat };
    updateTable('pelangganList', pelanggan);
    clearForm('pelangganForm');
    document.getElementById('editPelangganBtn').style.display = 'none';
    document.getElementById('savePelangganBtn').style.display = 'inline-block';
}

// Fungsi untuk hapus pelanggan
document.getElementById('pelangganList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        pelanggan = pelanggan.filter(p => p.id != id);
        updateTable('pelangganList', pelanggan);
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
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk update kategori
function updateKategori(id) {
    const kategoriItem = kategori.find(k => k.id == id);
    document.getElementById('kategoriNama').value = kategoriItem.nama;

    document.getElementById('saveKategoriBtn').style.display = 'none';
    document.getElementById('editKategoriBtn').style.display = 'inline-block';
    document.getElementById('editKategoriBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit kategori
document.getElementById('editKategoriBtn').addEventListener('click', () => {
    const id = document.getElementById('editKategoriBtn').getAttribute('data-id');
    const nama = document.getElementById('kategoriNama').value;

    const kategoriIndex = kategori.findIndex(k => k.id == id);
    kategori[kategoriIndex] = { id, nama };
    updateTable('kategoriList', kategori);
    clearForm('kategoriForm');
    document.getElementById('editKategoriBtn').style.display = 'none';
    document.getElementById('saveKategoriBtn').style.display = 'inline-block';
}

// Fungsi untuk hapus kategori
document.getElementById('kategoriList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        kategori = kategori.filter(k => k.id != id);
        updateTable('kategoriList', kategori);
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

// Fungsi untuk update suplier
function updateSuplier(id) {
    const suplierItem = suplier.find(s => s.id == id);
    document.getElementById('suplierNama').value = suplierItem.nama;
    document.getElementById('suplierNoHp').value = suplierItem.noHp;
    document.getElementById('suplierAlamat').value = suplierItem.alamat;

    document.getElementById('saveSuplierBtn').style.display = 'none';
    document.getElementById('editSuplierBtn').style.display = 'inline-block';
    document.getElementById('editSuplierBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit suplier
document.getElementById('editSuplierBtn').addEventListener('click', () => {
    const id = document.getElementById('editSuplierBtn').getAttribute('data-id');
    const nama = document.getElementById('suplierNama').value;
    const noHp = document.getElementById('suplierNoHp').value;
    const alamat = document.getElementById('suplierAlamat').value;

    const suplierIndex = suplier.findIndex(s => s.id == id);
    suplier[suplierIndex] = { id, nama, noHp, alamat };
    updateTable('suplierList', suplier);
    clearForm('suplierForm');
    document.getElementById('editSuplierBtn').style.display = 'none';
    document.getElementById('saveSuplierBtn').style.display = 'inline-block';
}

// Fungsi untuk hapus suplier
document.getElementById('suplierList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        suplier = suplier.filter(s => s.id != id);
        updateTable('suplierList', suplier);
    }
});

// Fungsi untuk menyimpan produk
document.getElementById('saveProdukBtn').addEventListener('click', () => {
    const nama = document.getElementById('produkNama').value;
    const kategoriId = document.getElementById('produkKategori').value;
    const stok = document.getElementById('produkStok').value;
    const harga = document.getElementById('produkHarga').value;

    if (nama && kategoriId && stok && harga) {
        const newProduk = { id: produk.length + 1, nama, kategori: kategoriId, stok, harga };
        produk.push(newProduk);
        updateTable('produkList', produk);
        clearForm('produkForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk update produk
function updateProduk(id) {
    const produkItem = produk.find(p => p.id == id);
    document.getElementById('produkNama').value = produkItem.nama;
    document.getElementById('produkKategori').value = produkItem.kategori;
    document.getElementById('produkStok').value = produkItem.stok;
    document.getElementById('produkHarga').value = produkItem.harga;

    document.getElementById('saveProdukBtn').style.display = 'none';
    document.getElementById('editProdukBtn').style.display = 'inline-block';
    document.getElementById('editProdukBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit produk
document.getElementById('editProdukBtn').addEventListener('click', () => {
    const id = document.getElementById('editProdukBtn').getAttribute('data-id');
    const nama = document.getElementById('produkNama').value;
    const kategoriId = document.getElementById('produkKategori').value;
    const stok = document.getElementById('produkStok').value;
    const harga = document.getElementById('produkHarga').value;

    const produkIndex = produk.findIndex(p => p.id == id);
    produk[produkIndex] = { id, nama, kategori: kategoriId, stok, harga };
    updateTable('produkList', produk);
    clearForm('produkForm');
    document.getElementById('editProdukBtn').style.display = 'none';
    document.getElementById('saveProdukBtn').style.display = 'inline-block';
}

// Fungsi untuk hapus produk
document.getElementById('produkList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        produk = produk.filter(p => p.id != id);
        updateTable('produkList', produk);
    }
});

// Fungsi untuk menyimpan transaksi
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

// Fungsi untuk update transaksi
function updateTransaksi(id) {
    const transaksiItem = transaksi.find(t => t.id == id);
    document.getElementById('transaksiPelanggan').value = transaksiItem.pelanggan;
    document.getElementById('transaksiProduk').value = transaksiItem.produk;
    document.getElementById('transaksiJumlah').value = transaksiItem.jumlah;
    document.getElementById('transaksiTotal').value = transaksiItem.total;

    document.getElementById('saveTransaksiBtn').style.display = 'none';
    document.getElementById('editTransaksiBtn').style.display = 'inline-block';
    document.getElementById('editTransaksiBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit transaksi
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
}

// Fungsi untuk hapus transaksi
document.getElementById('transaksiList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        transaksi = transaksi.filter(t => t.id != id);
        updateTable('transaksiList', transaksi);
    }
});

// Fungsi untuk menyimpan laporan (ex: laporan transaksi, dll.)
document.getElementById('saveLaporanBtn').addEventListener('click', () => {
    const laporanData = {
        // Ambil data laporan yang dibutuhkan
    };

    laporan.push(laporanData);
    updateTable('laporanList', laporan);
    clearForm('laporanForm');
});

// Fungsi untuk update laporan
function updateLaporan(id) {
    const laporanItem = laporan.find(l => l.id == id);
    // Isi form laporan dengan data laporanItem
    document.getElementById('saveLaporanBtn').style.display = 'none';
    document.getElementById('editLaporanBtn').style.display = 'inline-block';
    document.getElementById('editLaporanBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit laporan
document.getElementById('editLaporanBtn').addEventListener('click', () => {
    const id = document.getElementById('editLaporanBtn').getAttribute('data-id');
    const laporanData = {
        // Ambil data dari form laporan
    };

    const laporanIndex = laporan.findIndex(l => l.id == id);
    laporan[laporanIndex] = laporanData;
    updateTable('laporanList', laporan);
    clearForm('laporanForm');
    document.getElementById('editLaporanBtn').style.display = 'none';
    document.getElementById('saveLaporanBtn').style.display = 'inline-block';
});

// Fungsi untuk hapus laporan
document.getElementById('laporanList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        laporan = laporan.filter(l => l.id != id);
        updateTable('laporanList', laporan);
    }
});

// Fungsi untuk menyimpan profil user
document.getElementById('saveProfilBtn').addEventListener('click', () => {
    const username = document.getElementById('profilUsername').value;
    const password = document.getElementById('profilPassword').value;
    const email = document.getElementById('profilEmail').value;

    if (username && password && email) {
        const newProfil = { id: profil.length + 1, username, password, email };
        profil.push(newProfil);
        updateTable('profilList', profil);
        clearForm('profilForm');
    } else {
        alert('Harap isi semua field!');
    }
});

// Fungsi untuk update profil
function updateProfil(id) {
    const profilItem = profil.find(p => p.id == id);
    document.getElementById('profilUsername').value = profilItem.username;
    document.getElementById('profilPassword').value = profilItem.password;
    document.getElementById('profilEmail').value = profilItem.email;

    document.getElementById('saveProfilBtn').style.display = 'none';
    document.getElementById('editProfilBtn').style.display = 'inline-block';
    document.getElementById('editProfilBtn').setAttribute('data-id', id);
}

// Fungsi untuk edit profil
document.getElementById('editProfilBtn').addEventListener('click', () => {
    const id = document.getElementById('editProfilBtn').getAttribute('data-id');
    const username = document.getElementById('profilUsername').value;
    const password = document.getElementById('profilPassword').value;
    const email = document.getElementById('profilEmail').value;

    const profilIndex = profil.findIndex(p => p.id == id);
    profil[profilIndex] = { id, username, password, email };
    updateTable('profilList', profil);
    clearForm('profilForm');
    document.getElementById('editProfilBtn').style.display = 'none';
    document.getElementById('saveProfilBtn').style.display = 'inline-block';
});

// Fungsi untuk hapus profil
document.getElementById('profilList').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        profil = profil.filter(p => p.id != id);
        updateTable('profilList', profil);
    }
});

// Fungsi untuk mengupdate tabel
function updateTable(elementId, data) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = '';
    data.forEach(item => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nama || item.username}</td>
                <td>${item.noHp || item.password || item.kategori}</td>
                <td>${item.alamat || item.email || item.stok || item.total}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Fungsi untuk membersihkan form
function clearForm(formId) {
    document.getElementById(formId).reset();
}
