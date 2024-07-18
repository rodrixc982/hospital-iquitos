document.addEventListener('DOMContentLoaded', () => {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const tableBody = document.getElementById('inventory-body');

    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.denominacion}</td>
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.tipo}</td>
            <td>${item.color}</td>
            <td>${item.serie}</td>
            <td>${item.dimensiones}</td>
            <td>${item.imagen ? `<img src="${item.imagen}" alt="Imagen" width="50">` : ''}</td>
            <td class="actions">
                <button onclick="editItem(this)">Editar</button>
                <button onclick="deleteItem(this)">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

function editItem(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    const itemIndex = Array.from(row.parentElement.children).indexOf(row);
    const item = inventory[itemIndex];

    document.getElementById('codigo').value = item.codigo;
    document.getElementById('denominacion').value = item.denominacion;
    document.getElementById('marca').value = item.marca;
    document.getElementById('modelo').value = item.modelo;
    document.getElementById('tipo').value = item.tipo;
    document.getElementById('color').value = item.color;
    document.getElementById('serie').value = item.serie;
    document.getElementById('dimensiones').value = item.dimensiones;

    inventory.splice(itemIndex, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    row.remove();
}

function deleteItem(button) {
    const row = button.parentElement.parentElement;
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const itemIndex = Array.from(row.parentElement.children).indexOf(row);

    inventory.splice(itemIndex, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    row.remove();
}

function exportToExcel() {
    let table = document.getElementById('inventory-table');
    let html = table.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}

function exportToPDF() {
    let table = document.getElementById('inventory-table');
    let html = table.outerHTML;
    let pdfWindow = window.open('');
    pdfWindow.document.write(`
        <html>
            <head>
                <title>Exportar a PDF</title>
            </head>
            <body>${html}</body>
        </html>
    `);
    pdfWindow.document.close();
    pdfWindow.print();
}
