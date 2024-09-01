document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const totalValueDiv = document.getElementById('totalValue');
    let products = [];

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const price = parseFloat(document.getElementById('price').value);

        const product = { name, category, quantity, price, total: quantity * price };
        products.push(product);

        addProductToTable(product);
        updateTotalValue();

        productForm.reset();
    });

    function addProductToTable(product) {
        const row = productTable.insertRow();

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.total.toFixed(2)}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            const index = Array.from(productTable.rows).indexOf(row);
            products.splice(index, 1);
            productTable.deleteRow(index);
            updateTotalValue();
        });
    }

    function updateTotalValue() {
        const totalValue = products.reduce((total, product) => total + product.total, 0);
        totalValueDiv.textContent = `Total Inventory Value: $${totalValue.toFixed(2)}`;
    }
});
