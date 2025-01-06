let products = [];
let categories = [];
let suppliers = [];

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
document.getElementById("categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("categoryName").value;
    categories.push(name);

    e.target.reset();
    updateCategoryList();
    updateProductDropdown();
});

function updateCategoryList() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    categories.forEach((category) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = category;
        categoryList.appendChild(li);
    });
}

function updateProductDropdown() {
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
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = `S${suppliers.length + 1}`;
    const name = document.getElementById("supplierName").value;
    const phone = document.getElementById("supplierPhone").value;
    const company = document.getElementById("supplierCompany").value;
    const address = document.getElementById("supplierAddress").value;

    suppliers.push({ id, name, phone, company, address });

    e.target.reset();
    updateSupplierList();
    updateProductSupplierDropdown();
});

function updateSupplierList() {
    const supplierList = document.getElementById("supplierList");
    supplierList.innerHTML = "";
    suppliers.forEach((supplier) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${supplier.id}</td>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.company}</td>
            <td>${supplier.address}</td>
        `;
        supplierList.appendChild(row);
    });
}

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
