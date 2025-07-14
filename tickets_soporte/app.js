const form = document.getElementById('ticketForm');
const tabla = document.getElementById('tablaTickets');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticket = {
    fecha: document.getElementById('fechaReporte').value,
    cliente: document.getElementById('cliente').value,
    tipo: document.getElementById('tipo').value,
    ingeniero: document.getElementById('ingeniero').value,
    descripcion: document.getElementById('descripcion').value,
    estatus: document.getElementById('estatus').value,
    inicio: document.getElementById('inicio').value,
    fin: document.getElementById('fin').value
  };

  await fetch('registrar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });

  form.reset();
  cargarTickets();
});

async function cargarTickets() {
  const res = await fetch('data/tickets.json');
  const datos = await res.json();
  tabla.innerHTML = datos.map((t, i) => `
    <tr>
      <td>${t.fecha}</td><td>${t.cliente}</td><td>${t.tipo}</td>
      <td>${t.ingeniero}</td><td>${t.descripcion}</td><td>${t.estatus}</td>
      <td>${t.inicio}</td><td>${t.fin}</td>
      <td>
        <select onchange="actualizarEstatus(${i}, this.value)">
          <option value="">Cambiar estatus</option>
          <option value="En desarrollo">En desarrollo</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </td>
    </tr>
  `).join('');
}

async function actualizarEstatus(index, nuevoEstatus) {
  const res = await fetch('data/tickets.json');
  const tickets = await res.json();

  tickets[index].estatus = nuevoEstatus;
  const ahora = new Date().toISOString().slice(0, 16);

  if (nuevoEstatus === 'En desarrollo') {
    tickets[index].inicio = ahora;
  } else if (nuevoEstatus === 'Finalizado') {
    tickets[index].fin = ahora;
  }

  await fetch('actualizar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tickets)
  });

  cargarTickets();
}
function toggleFormulario() {
  const formDiv = document.getElementById('formulario');
  formDiv.style.display = formDiv.style.display === 'none' ? 'block' : 'none';
}
cargarTickets();