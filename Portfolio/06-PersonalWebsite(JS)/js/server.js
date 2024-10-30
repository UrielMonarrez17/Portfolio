console.log("Running the script");

function handleForm() {
    const date = document.getElementById('date').value;
    const start = document.getElementById('start').value; 
    const end = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const colors = document.getElementById('colors').value;
    const status = document.getElementById('status').value;

    console.log("date:",date);
    const statusIcon = status ? "images/busy.png" : "images/free.png";
    const table = document.getElementById('TablaDatos');

    // Crear una nueva fila
    const newRow = table.insertRow(-1);

    // Insertar celdas en la fila
    newRow.insertCell(0).innerHTML = date;
    newRow.insertCell(1).innerHTML = start;
    newRow.insertCell(2).innerHTML = end;
    newRow.insertCell(3).innerHTML = description;
    newRow.insertCell(4).innerHTML = place;
    newRow.insertCell(5).innerHTML = type;
    newRow.insertCell(6).innerHTML = notes;
    newRow.insertCell(7).innerHTML = `<img src="${statusIcon}" width="40"/>`;

    document.getElementById('form-schedule').reset();
};