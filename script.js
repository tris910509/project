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
