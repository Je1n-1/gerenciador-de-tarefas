// main.js

// ===== Mock data (exemplo) =====
// Array para armazenar as tarefas
const tasks = [];

// Seleciona o corpo da tabela onde as tarefas serão exibidas
const tbody = document.querySelector('#tasksTable tbody');

// Função para retornar o HTML do badge de prioridade
function priorityBadge(p) {
    if (p === 'Alta') return '<span class="badge status-pill badge-priority-high">Alta</span>';
    if (p === 'Média') return '<span class="badge status-pill badge-priority-medium">Média</span>';
    return '<span class="badge status-pill badge-priority-low">Baixa</span>';
}

// Função para retornar o HTML do status da tarefa
function statusPill(s) {
    if (s === 'Concluída') return '<span class="status-pill status-done">Concluída</span>';
    if (s === 'Atrasada') return '<span class="status-pill status-overdue">Atrasada</span>';
    return '<span class="status-pill status-open">Aberta</span>';
}

// Função para renderizar as linhas da tabela com as tarefas
function renderRows(data) {
    tbody.innerHTML = data.map(t => `
        <tr data-id="${t.id}">
            <td>
                <div class="fw-semibold">${t.title}</div>
                <div class="text-muted small">${t.description}</div>
            </td>
            <td>${t.category}</td>
            <td>${priorityBadge(t.priority)}</td>
            <td>${t.created}</td>
            <td>${t.due}</td>
            <td>${statusPill(t.status)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="onEdit(${t.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="onDelete(${t.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Renderiza as tarefas iniciais (vazio)
renderRows(tasks);

// ===== Filtros & Busca =====
// Função para aplicar filtros e busca nas tarefas
function applyFilters() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('filterCategory').value;
    const pr = document.getElementById('filterPriority').value;
    const st = document.getElementById('filterStatus').value;
    const d1 = document.getElementById('dateFrom').value;
    const d2 = document.getElementById('dateTo').value;
    const filtered = tasks.filter(t => {
        let ok = true;
        if (q && !(t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))) ok = false;
        if (cat && t.category !== cat) ok = false;
        if (pr && t.priority !== pr) ok = false;
        if (st && t.status !== st) ok = false;
        if (d1 && t.due < d1) ok = false;
        if (d2 && t.due > d2) ok = false;
        return ok;
    });
    renderRows(filtered);
}

// Adiciona eventos para os campos de filtro e busca
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('filterCategory').addEventListener('change', applyFilters);
document.getElementById('filterPriority').addEventListener('change', applyFilters);
document.getElementById('filterStatus').addEventListener('change', applyFilters);
document.getElementById('dateFrom').addEventListener('change', applyFilters);
document.getElementById('dateTo').addEventListener('change', applyFilters);

// ===== CRUD (mock) =====
// Seleciona o formulário de tarefas
const taskForm = document.getElementById('taskForm');
// Variável para armazenar o id da tarefa em edição
let editingId = null;

// Função para editar uma tarefa
function onEdit(id) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    editingId = id;
    taskForm.querySelector('.modal-title').textContent = 'Editar Tarefa';
    taskForm.title.value = t.title;
    taskForm.description.value = t.description;
    taskForm.category.value = t.category;
    taskForm.priority.value = t.priority;
    taskForm.status.value = t.status;
    taskForm.due.value = t.due;
    const modal = new bootstrap.Modal('#taskModal');
    modal.show();
}

// Função para excluir uma tarefa (com confirmação)
function onDelete(id) {
    const delBtn = document.getElementById('confirmDelete');
    delBtn.onclick = () => {
        const idx = tasks.findIndex(x => x.id === id);
        if (idx > -1) { tasks.splice(idx, 1); applyFilters(); showToast('Tarefa excluída.'); }
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    };
    new bootstrap.Modal('#deleteModal').show();
}

// Evento de envio do formulário de tarefa (criar/editar)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
        id: editingId ?? (Math.max(0, ...tasks.map(t => t.id)) + 1),
        title: taskForm.title.value.trim(),
        description: taskForm.description.value.trim(),
        category: taskForm.category.value,
        priority: taskForm.priority.value,
        status: taskForm.status.value,
        created: new Date().toISOString().slice(0,10),
        due: taskForm.due.value || new Date().toISOString().slice(0,10)
    };
    if (editingId) {
        const idx = tasks.findIndex(t => t.id === editingId);
        tasks[idx] = payload;
        showToast('Tarefa atualizada.');
    } else {
        tasks.unshift(payload);
        showToast('Tarefa criada.');
    }
    editingId = null;
    taskForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
    applyFilters();
});

// ===== Export (placeholders) =====
// Botões de exportação (apenas exibe toast, exportação real será feita no backend)
document.getElementById('btnExportCSV').addEventListener('click', () => showToast('Exportação CSV será feita no backend (pandas).'));
document.getElementById('btnExportPDF').addEventListener('click', () => showToast('Exportação PDF será feita no backend (ReportLab).'));

// ===== Toast helper =====
// Função auxiliar para exibir mensagens toast
function showToast(msg) {
    document.querySelector('#toast .toast-body').textContent = msg;
    const t = new bootstrap.Toast(document.getElementById('toast'));
    t.show();
}