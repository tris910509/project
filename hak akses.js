//Pembatasan Hak Akses simpan setiap halaman kecuali login
<script>
    // Periksa peran pengguna
    const role = localStorage.getItem('userRole');

    // Batasi akses berdasarkan peran
    const allowedRoles = ['Admin', 'Member']; // Ganti sesuai halaman
    if (!allowedRoles.includes(role)) {
        alert('Anda tidak memiliki akses ke halaman ini!');
        window.location.href = 'login.html'; // Redirect ke login
    }
</script>
