<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pembayaran</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <script>
        // Periksa peran pengguna
        const role = localStorage.getItem('userRole');
        const allowedRoles = ['Admin', 'Kasir'];
        if (!allowedRoles.includes(role)) {
            alert('Anda tidak memiliki akses ke halaman ini!');
            window.location.href = 'login.html';
        }
    </script>

    <div class="container mt-5">
        <h2 class="text-center">Pembayaran</h2>

        <!-- Daftar Pembayaran -->
        <h4>Daftar Pembayaran</h4>
        <table class="table table-striped" id="pembayaranTable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Pelanggan</th>
                    <th>Total</th>
                    <th>Metode Pembayaran</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <!-- Modal Konfirmasi Pembayaran -->
    <div class="modal fade" id="konfirmasiModal" tabindex="-1" aria-labelledby="konfirmasiModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="konfirmasiModalLabel">Konfirmasi Pembayaran</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Apakah Anda yakin ingin mengkonfirmasi pembayaran ini?</p>
                    <p id="detailPembayaran"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-success" id="konfirmasiButton">Konfirmasi</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let transaksiList = JSON.parse(localStorage.getItem('transaksi')) || [];
        let selectedIndex = null;

        // Render daftar pembayaran
        function renderPembayaran() {
            const pembayaranTable = document.querySelector('#pembayaranTable tbody');
            pembayaranTable.innerHTML = '';

            transaksiList.forEach((transaksi, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${transaksi.pelanggan}</td>
                    <td>Rp ${transaksi.total}</td>
                    <td>${transaksi.metodePembayaran}</td>
                    <td>${transaksi.status}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="lihatDetail(${index})">Detail</button>
                        ${transaksi.metodePembayaran !== 'Cash' && transaksi.status !== 'Lunas' ? `
                            <button class="btn btn-success btn-sm" onclick="bukaModal(${index})">Konfirmasi</button>
                        ` : ''}
                    </td>
                `;
                pembayaranTable.appendChild(row);
            });
        }

        // Buka modal konfirmasi pembayaran
        function bukaModal(index) {
            selectedIndex = index;
            const transaksi = transaksiList[index];
            document.getElementById('detailPembayaran').textContent = `
                Pelanggan: ${transaksi.pelanggan}, 
                Total: Rp ${transaksi.total}, 
                Metode: ${transaksi.metodePembayaran}
            `;
            const konfirmasiModal = new bootstrap.Modal(document.getElementById('konfirmasiModal'));
            konfirmasiModal.show();
        }

        // Konfirmasi pembayaran
        document.getElementById('konfirmasiButton').addEventListener('click', () => {
            if (selectedIndex !== null) {
                transaksiList[selectedIndex].status = 'Lunas';
                localStorage.setItem('transaksi', JSON.stringify(transaksiList));
                renderPembayaran();
                const konfirmasiModal = bootstrap.Modal.getInstance(document.getElementById('konfirmasiModal'));
                konfirmasiModal.hide();
                alert('Pembayaran berhasil dikonfirmasi!');
            }
        });

        // Lihat detail pembayaran
        function lihatDetail(index) {
            const transaksi = transaksiList[index];
            alert(`Detail Pembayaran:\nPelanggan: ${transaksi.pelanggan}\nTotal: Rp ${transaksi.total}\nMetode: ${transaksi.metodePembayaran}\nStatus: ${transaksi.status}`);
        }

        // Render data saat halaman dimuat
        document.addEventListener('DOMContentLoaded', renderPembayaran);
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
