// Contoh data pengguna dengan role admin dan user
const users = [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'user1', password: 'user123', email: 'user1@example.com', role: 'user' }
];


// Data pengguna (misalnya disimpan di localStorage untuk demo)
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Fungsi untuk memvalidasi login
function login(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Login berhasil!');
        window.location.href = 'index.html'; // Arahkan ke halaman utama setelah login
    } else {
        alert('Username atau password salah.');
    }
}

// Fungsi untuk register
function register(e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    const newUser = { id: users.length + 1, username, password, email };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
}

// Cek apakah pengguna sudah login
function checkAuth() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

// Event listener untuk form login dan register
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('registerForm').addEventListener('submit', register);

// Contoh penggunaan checkAuth
document.addEventListener('DOMContentLoaded', checkAuth);



function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect jika tidak login
    } else {
        document.getElementById('logoutLink').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });

        // Hak akses
        if (currentUser.role === 'admin') {
            loadAdminContent();
        } else if (currentUser.role === 'user') {
            loadUserContent();
        }
    }
}

function loadAdminContent() {
    document.getElementById('content').innerHTML = `
        <h3>Admin Content</h3>
        <p>Hanya admin yang bisa mengakses ini.</p>
        <a href="#" id="managePelanggan" class="nav-link">Kelola Pelanggan</a>
        <a href="#" id="manageKategori" class="nav-link">Kelola Kategori</a>
        <a href="#" id="manageSuplier" class="nav-link">Kelola Suplier</a>
        <a href="#" id="manageProduk" class="nav-link">Kelola Produk</a>
        <a href="#" id="manageTransaksi" class="nav-link">Kelola Transaksi</a>
        <a href="#" id="viewLaporan" class="nav-link">Lihat Laporan</a>
    `;

    document.getElementById('managePelanggan').addEventListener('click', () => {
        window.location.href = 'pelanggan.html'; // Halaman pelanggan admin
    });
    // Tambahkan event listener lainnya...
}

function loadUserContent() {
    document.getElementById('content').innerHTML = `
        <h3>User Content</h3>
        <p>Hanya user yang bisa mengakses ini.</p>
        <a href="#" id="viewProduk" class="nav-link">Lihat Produk</a>
        <a href="#" id="viewTransaksi" class="nav-link">Lihat Transaksi</a>
        <a href="#" id="viewProfil" class="nav-link">Profil</a>
    `;

    document.getElementById('viewProduk').addEventListener('click', () => {
        window.location.href = 'produk.html'; // Halaman produk user
    });
    // Tambahkan event listener lainnya...
}

// Jalankan checkAuth saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkAuth);
