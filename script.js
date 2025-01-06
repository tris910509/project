// Data
let products = [];
let categories = [];
let suppliers = [];
let transactions = [];

// Tambah Produk
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = `P${products.length + 1}`;
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const supplier = document.getElementById("productSupplier").value;
    const stock = parseInt(document.getElementById("productStock").value);
    const price = parseFloat(document.getElementById("productPrice").value);

    products.push({ id, name, category, supplier, stock, price });

    e.target.reset();
    updateProductList();
});

function updateProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.supplier}</td>
            <td>${product.stock}</td>
            <td>Rp${product.price}</td>
        `;
        productList.appendChild(row);
    });
}

// Tambah Kategori
// Tambah/Edit Kategori
document.getElementById("categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const categoryId = document.getElementById("categoryId").value;
    const categoryName = document.getElementById("categoryName").value;

    if (categoryId) {
        // Edit kategori
        categories[categoryId] = categoryName;
    } else {
        // Tambah kategori baru
        categories.push(categoryName);
    }

    e.target.reset();
    document.getElementById("categoryId").value = "";
    updateCategoryList();
    updateProductCategoryDropdown();
});

// Menampilkan daftar kategori
function updateCategoryList() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    categories.forEach((category, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${category}
            <div>
                <button class="btn btn-sm btn-warning" onclick="editCategory(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCategory(${index})">Hapus</button>
            </div>
        `;
        categoryList.appendChild(li);
    });
}

// Edit kategori
function editCategory(index) {
    document.getElementById("categoryId").value = index;
    document.getElementById("categoryName").value = categories[index];
}

// Hapus kategori
function deleteCategory(index) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        categories.splice(index, 1);
        updateCategoryList();
        updateProductCategoryDropdown();
    }
}

// Perbarui dropdown kategori di produk
function updateProductCategoryDropdown() {
    const categoryDropdown = document.getElementById("productCategory");
    categoryDropdown.innerHTML = "";
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}


// Tambah Supplier
// Tambah/Edit Supplier
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const supplierId = document.getElementById("supplierId").value;
    const name = document.getElementById("supplierName").value;
    const phone = document.getElementById("supplierPhone").value;
    const company = document.getElementById("supplierCompany").value;
    const address = document.getElementById("supplierAddress").value;

    if (supplierId) {
        // Edit supplier
        suppliers[supplierId] = { id: suppliers[supplierId].id, name, phone, company, address };
    } else {
        // Tambah supplier baru
        const id = `S${suppliers.length + 1}`;
        suppliers.push({ id, name, phone, company, address });
    }

    e.target.reset();
    document.getElementById("supplierId").value = "";
    updateSupplierList();
    updateProductSupplierDropdown();
});

// Menampilkan daftar supplier
function updateSupplierList() {
    const supplierList = document.getElementById("supplierList");
    supplierList.innerHTML = "";
    suppliers.forEach((supplier, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${supplier.id}</td>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.company}</td>
            <td>${supplier.address}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editSupplier(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteSupplier(${index})">Hapus</button>
            </td>
        `;
        supplierList.appendChild(row);
    });
}

// Edit supplier
function editSupplier(index) {
    document.getElementById("supplierId").value = index;
    document.getElementById("supplierName").value = suppliers[index].name;
    document.getElementById("supplierPhone").value = suppliers[index].phone;
    document.getElementById("supplierCompany").value = suppliers[index].company;
    document.getElementById("supplierAddress").value = suppliers[index].address;
}

// Hapus supplier
function deleteSupplier(index) {
    if (confirm("Apakah Anda yakin ingin menghapus supplier ini?")) {
        suppliers.splice(index, 1);
        updateSupplierList();
        updateProductSupplierDropdown();
    }
}

// Perbarui dropdown supplier di produk
function updateProductSupplierDropdown() {
    const supplierDropdown = document.getElementById("productSupplier");
    supplierDropdown.innerHTML = "";
    suppliers.forEach((supplier) => {
        const option = document.createElement("option");
        option.value = supplier.name;
        option.textContent = supplier.name;
        supplierDropdown.appendChild(option);
    });
}


// Tambah Transaksi Baru


// Variabel transaksi
let transactions = [];

// Tambah/Edit Transaksi
document.getElementById("transactionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const transactionId = document.getElementById("transactionId").value;
    const customerName = document.getElementById("customerName").value;
    const productName = document.getElementById("transactionProduct").value;
    const quantity = parseInt(document.getElementById("transactionQuantity").value);
    const paymentMethod = document.getElementById("paymentMethod").value;
    const paymentStatus = document.getElementById("paymentStatus").value;

    // Cari produk berdasarkan nama
    const product = products.find((p) => p.name === productName);
    if (!product) {
        alert("Produk tidak valid!");
        return;
    }

    // Validasi stok produk
    if (product.stock < quantity) {
        alert("Stok produk tidak mencukupi!");
        return;
    }

    const totalPrice = product.price * quantity;

    if (transactionId) {
        // Edit transaksi
        const index = transactions.findIndex((t) => t.id === transactionId);
        if (index !== -1) {
            transactions[index] = { id: transactionId, customerName, productName, quantity, totalPrice, paymentMethod, paymentStatus };
        }
    } else {
        // Tambah transaksi baru
        const id = `T${transactions.length + 1}`;
        transactions.push({ id, customerName, productName, quantity, totalPrice, paymentMethod, paymentStatus });

        // Kurangi stok produk
        product.stock -= quantity;
        updateTransactionProductDropdown(); // Perbarui dropdown produk
    }

    e.target.reset(); // Reset form
    document.getElementById("transactionId").value = ""; // Hapus ID
    updateTransactionList(); // Perbarui daftar transaksi
});

// Perbarui daftar transaksi
function updateTransactionList() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.customerName}</td>
            <td>${transaction.productName}</td>
            <td>${transaction.quantity}</td>
            <td>Rp${transaction.totalPrice.toLocaleString()}</td>
            <td>${transaction.paymentMethod}</td>
            <td>${transaction.paymentStatus}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editTransaction(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${index})">Hapus</button>
            </td>
        `;
        transactionList.appendChild(row);
    });
}

// Edit Transaksi
function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById("transactionId").value = transaction.id;
    document.getElementById("customerName").value = transaction.customerName;
    document.getElementById("transactionProduct").value = transaction.productName;
    document.getElementById("transactionQuantity").value = transaction.quantity;
    document.getElementById("paymentMethod").value = transaction.paymentMethod;
    document.getElementById("paymentStatus").value = transaction.paymentStatus;
}

// Hapus Transaksi
function deleteTransaction(index) {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
        transactions.splice(index, 1);
        updateTransactionList();
    }
}

// Perbarui dropdown produk di transaksi
function updateTransactionProductDropdown() {
    const productDropdown = document.getElementById("transactionProduct");
    productDropdown.innerHTML = "";
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        productDropdown.appendChild(option);
    });
}

// Perbarui dropdown produk saat halaman dimuat
updateTransactionProductDropdown();


document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mengupdate tabel transaksi
    updateTransactionList();
});

function updateTransactionList() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = ""; // Clear table body
    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.customerName}</td>
            <td>${transaction.productName}</td>
            <td>${transaction.quantity}</td>
            <td>Rp${transaction.totalPrice.toLocaleString()}</td>
            <td>${transaction.paymentMethod}</td>
            <td>${transaction.paymentStatus}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editTransaction(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${index})">Hapus</button>
            </td>
        `;
        transactionList.appendChild(row);
    });
}



let users = [];

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const id = `U${users.length + 1}`;
    users.push({ id, username, email, password });

    updateUserList();

    e.target.reset();
});

function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Hapus</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
}

function deleteUser(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        users.splice(index, 1);
        updateUserList();
    }
}


