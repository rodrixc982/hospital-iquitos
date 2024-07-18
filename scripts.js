function getCurrentUserInventory() {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(localStorage.getItem(`inventory_${currentUser}`)) || [];
}

function setCurrentUserInventory(inventory) {
    const currentUser = localStorage.getItem('currentUser');
    localStorage.setItem(`inventory_${currentUser}`, JSON.stringify(inventory));
}

function addItem() {
    const form = document.getElementById('inventory-form');
    const inventory = getCurrentUserInventory();

    const codigo = document.getElementById('codigo').value;
    const denominacion = document.getElementById('denominacion').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const tipo = document.getElementById('tipo').value;
    const color = document.getElementById('color').value;
    const serie = document.getElementById('serie').value;
    const dimensiones = document.getElementById('dimensiones').value;
    const imagenInput = document.getElementById('imagen');
    const reader = new FileReader();

    reader.onload = function(e) {
        const imagen = e.target.result;

        const item = {
            codigo,
            denominacion,
            marca,
            modelo,
            tipo,
            color,
            serie,
            dimensiones,
            imagen
        };

        inventory.push(item);
        setCurrentUserInventory(inventory);
        form.reset();
        showInventory();
    };

    if (imagenInput.files[0]) {
        reader.readAsDataURL(imagenInput.files[0]);
    }
}

function showInventory() {
    const inventory = getCurrentUserInventory();
    const tableBody = document.getElementById('inventory-body');
    tableBody.innerHTML = '';

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
            <td>${item.imagen ? `<img src="${item.imagen}" alt="Imagen" width="50" onclick="expandImage('${item.imagen}')">` : ''}</td>
            <td class="actions">
                <button onclick="editItem(this)">Editar</button>
                <button onclick="deleteItem(this)">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('inventory-view').style.display = 'block';
}

function editItem(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');
    const inventory = getCurrentUserInventory();

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
    setCurrentUserInventory(inventory);
    row.remove();
}

function deleteItem(button) {
    const row = button.parentElement.parentElement;
    const inventory = getCurrentUserInventory();
    const itemIndex = Array.from(row.parentElement.children).indexOf(row);

    inventory.splice(itemIndex, 1);
    setCurrentUserInventory(inventory);
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

function expandImage(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth);
