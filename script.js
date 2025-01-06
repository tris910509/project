// Initial Data Storage
let pelangganData = [];
let kategoriData = [];
let suplierData = [];
let produkData = [];
let transaksiData = [];
let laporanData = [];


// Data pengguna
const users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'user1', password: 'user123', email: 'user1@example.com', role: 'user' }
];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Cek apakah user sudah login
function checkAuth() {
    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect ke login jika tidak login
    } else {
        document.getElementById('logoutLink').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html'; // Logout dan redirect ke login
        });

        if (currentUser.role === 'admin') {
            loadAdminContent();
        } else if (currentUser.role === 'user') {
            loadUserContent();
        }
    }
}

// Load konten untuk admin
function loadAdminContent() {
    document.getElementById('content').innerHTML = `
        <h3>Admin Dashboard</h3>
        <a href="pelanggan.html" class="nav-link">Kelola Pelanggan</a>
        <a href="kategori.html" class="nav-link">Kelola Kategori</a>
        <a href="produk.html" class="nav-link">Kelola Produk</a>
        <a href="transaksi.html" class="nav-link">Kelola Transaksi</a>
        <a href="laporan.html" class="nav-link">Lihat Laporan</a>
        <a href="profil.html" class="nav-link">Profil</a>
    `;
}

// Load konten untuk user
function loadUserContent() {
    document.getElementById('content').innerHTML = `
        <h3>User Dashboard</h3>
        <a href="produk.html" class="nav-link">Lihat Produk</a>
        <a href="transaksi.html" class="nav-link">Lihat Transaksi</a>
        <a href="profil.html" class="nav-link">Profil</a>
    `;
}

// Fungsi login
function login(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Login berhasil!');
        window.location.href = 'index.html'; // Redirect ke dashboard
    } else {
        alert('Username atau password salah.');
    }
}

// Fungsi register
function register(e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    const newUser = { id: users.length + 1, username, password, email, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
}

// Event listener untuk form login dan register
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('registerForm').addEventListener('submit', register);

// Jalankan checkAuth saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkAuth);


// Render Pelanggan CRUD
function renderPelanggan() {
    let html = `
        <button class="btn btn-primary mb-3" onclick="tambahPelanggan()">Tambah Pelanggan</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>No HP</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;
    pelangganData.forEach((p, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.nama}</td>
                <td>${p.noHp}</td>
                <td>${p.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPelanggan(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusPelanggan(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table>';
    document.getElementById('contentArea').innerHTML = html;
}

// Tambah Pelanggan
function tambahPelanggan() {
    const nama = prompt('Masukkan Nama Pelanggan:');
    const noHp = prompt('Masukkan No HP:');
    const alamat = prompt('Masukkan Alamat:');
    if (nama && noHp && alamat) {
        pelangganData.push({ nama, noHp, alamat });
        renderPelanggan();
    }
}

// Edit Pelanggan
function editPelanggan(index) {
    const pelanggan = pelangganData[index];
    pelanggan.nama = prompt('Masukkan Nama Baru:', pelanggan.nama);
    pelanggan.noHp = prompt('Masukkan No HP Baru:', pelanggan.noHp);
    pelanggan.alamat = prompt('Masukkan Alamat Baru:', pelanggan.alamat);
    renderPelanggan();
}

// Hapus Pelanggan
function hapusPelanggan(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
        pelangganData.splice(index, 1);
        renderPelanggan();
    }
}

// Render Kategori CRUD
function renderKategori() {
    let html = `
        <button class="btn btn-primary mb-3" onclick="tambahKategori()">Tambah Kategori</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Kategori</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;
    kategoriData.forEach((k, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${k.nama}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editKategori(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusKategori(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table>';
    document.getElementById('contentArea').innerHTML = html;
}

// Tambah Kategori
function tambahKategori() {
    const nama = prompt('Masukkan Nama Kategori:');
    if (nama) {
        kategoriData.push({ nama });
        renderKategori();
    }
}

// Edit Kategori
function editKategori(index) {
    const kategori = kategoriData[index];
    kategori.nama = prompt('Masukkan Nama Baru:', kategori.nama);
    renderKategori();
}

// Hapus Kategori
function hapusKategori(index) {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
        kategoriData.splice(index, 1);
        renderKategori();
    }
}

// Render Suplier CRUD
function renderSuplier() {
    let html = `
        <button class="btn btn-primary mb-3" onclick="tambahSuplier()">Tambah Suplier</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Suplier</th>
                    <th>No HP</th>
                    <th>Alamat</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;
    suplierData.forEach((s, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${s.nama}</td>
                <td>${s.noHp}</td>
                <td>${s.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSuplier(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSuplier(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table>';
    document.getElementById('contentArea').innerHTML = html;
}

// Tambah Suplier
function tambahSuplier() {
    const nama = prompt('Masukkan Nama Suplier:');
    const noHp = prompt('Masukkan No HP:');
    const alamat = prompt('Masukkan Alamat:');
    if (nama && noHp && alamat) {
        suplierData.push({ nama, noHp, alamat });
        renderSuplier();
    }
}

// Edit Suplier
function editSuplier(index) {
    const suplier = suplierData[index];
    suplier.nama = prompt('Masukkan Nama Baru:', suplier.nama);
    suplier.noHp = prompt('Masukkan No HP Baru:', suplier.noHp);
    suplier.alamat = prompt('Masukkan Alamat Baru:', suplier.alamat);
    renderSuplier();
}

// Hapus Suplier
function hapusSuplier(index) {
    if (confirm('Apakah Anda yakin ingin menghapus suplier ini?')) {
        suplierData.splice(index, 1);
        renderSuplier();
    }
}

// Tab Navigation
document.getElementById('pelangganTab').addEventListener('click', renderPelanggan);
document.getElementById('kategoriTab').addEventListener('click', renderKategori);
document.getElementById('suplierTab').addEventListener('click', renderSuplier);
// Implementasikan tab lainnya sesuai kebutuhan

