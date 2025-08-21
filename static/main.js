// ===== Mock data (exemplo) =====
    const tasks = [
      { id: 1, title: 'Comprar mantimentos', category: 'Pessoal', priority: 'Alta', created: '2025-08-15', due: '2025-08-18', status: 'Aberta', description: 'Lista: arroz, feijão, leite.' },
      { id: 2, title: 'Relatório do projeto', category: 'Trabalho', priority: 'Média', created: '2025-08-10', due: '2025-08-20', status: 'Aberta', description: 'Capítulos 3 e 4.' },
      { id: 3, title: 'Chamar encanador', category: 'Casa', priority: 'Baixa', created: '2025-08-01', due: '2025-08-19', status: 'Atrasada', description: 'Vazamento na pia da cozinha.' },
      { id: 4, title: 'Estudar Flask', category: 'Estudos', priority: 'Média', created: '2025-08-12', due: '2025-08-22', status: 'Concluída', description: 'Login, CRUD, Exportação.' },
    ];

    const tbody = document.querySelector('#tasksTable tbody');

    function priorityBadge(p) {
      if (p === 'Alta') return '<span class="badge status-pill badge-priority-high">Alta</span>';
      if (p === 'Média') return '<span class="badge status-pill badge-priority-medium">Média</span>';
      return '<span class="badge status-pill badge-priority-low">Baixa</span>';
    }
    function statusPill(s) {
      if (s === 'Concluída') return '<span class="status-pill status-done">Concluída</span>';
      if (s === 'Atrasada') return '<span class="status-pill status-overdue">Atrasada</span>';
      return '<span class="status-pill status-open">Aberta</span>';
    }

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

    renderRows(tasks);

    // ===== Filtros & Busca =====
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

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterPriority').addEventListener('change', applyFilters);
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
    document.getElementById('dateFrom').addEventListener('change', applyFilters);
    document.getElementById('dateTo').addEventListener('change', applyFilters);

    // ===== CRUD (mock) =====
    const taskForm = document.getElementById('taskForm');
    let editingId = null;

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

    function onDelete(id) {
      const delBtn = document.getElementById('confirmDelete');
      delBtn.onclick = () => {
        const idx = tasks.findIndex(x => x.id === id);
        if (idx > -1) { tasks.splice(idx, 1); applyFilters(); showToast('Tarefa excluída.'); }
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
      };
      new bootstrap.Modal('#deleteModal').show();
    }

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
    document.getElementById('btnExportCSV').addEventListener('click', () => showToast('Exportação CSV será feita no backend (pandas).'));
    document.getElementById('btnExportPDF').addEventListener('click', () => showToast('Exportação PDF será feita no backend (ReportLab).'));

    // ===== Toast helper =====
    function showToast(msg) {
      document.querySelector('#toast .toast-body').textContent = msg;
      const t = new bootstrap.Toast(document.getElementById('toast'));
      t.show();
    }