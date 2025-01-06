let products = [];
let transactions = [];

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data produk
    const name = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const supplier = document.getElementById("supplier").value;
    const price = parseFloat(document.getElementById("price").value);

    // Tambahkan ke daftar produk
    products.push({ name, category, supplier, price });

    // Reset form
    e.target.reset();
    updateProductList();
    updateProductDropdown();
});

function updateProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${product.name} - ${product.category} - Rp${product.price}`;
        productList.appendChild(li);
    });
}

function updateProductDropdown() {
    const productDropdown = document.getElementById("selectedProduct");
    productDropdown.innerHTML = "";
    products.forEach((product, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = product.name;
        productDropdown.appendChild(option);
    });
}

document.getElementById("transactionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data transaksi
    const customerName = document.getElementById("customerName").value;
    const productIndex = parseInt(document.getElementById("selectedProduct").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const paymentMethod = document.getElementById("paymentMethod").value;

    const product = products[productIndex];
    const total = product.price * quantity;
    const status = total > 0 ? "Lunas" : "Belum Lunas";

    // Tambahkan ke daftar transaksi
    transactions.push({ customerName, product: product.name, quantity, total, paymentMethod, status });

    // Reset form
    e.target.reset();
    updateTransactionReport();
});

function updateTransactionReport() {
    const transactionReport = document.getElementById("transactionReport");
    transactionReport.innerHTML = "";
    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.customerName}</td>
            <td>${transaction.product}</td>
            <td>${transaction.quantity}</td>
            <td>Rp${transaction.total}</td>
            <td>${transaction.paymentMethod}</td>
            <td>${transaction.status}</td>
        `;
        transactionReport.appendChild(row);
    });
}
