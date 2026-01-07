// Verificar autenticação e permissões
let currentUser = null;

window.addEventListener('load', function() {
    const currentUserData = sessionStorage.getItem('currentUser');
    
    if (!currentUserData) {
        window.location.href = '../index.html';
        return;
    }
    
    currentUser = JSON.parse(currentUserData);
    
    // Verificar se é admin
    const users = getUsers();
    const userData = users[currentUser.username];
    
    if (!userData || userData.role !== 'admin') {
        alert('Acesso negado! Você não tem permissão para acessar esta área.');
        window.location.href = '../user-dashboard/user-dashboard.html';
        return;
    }
    
    // Atualizar interface
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('navUserName').textContent = currentUser.name.split(' ')[0];
    document.getElementById('navUserAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    loadDashboard();
});

// Funções de gerenciamento de usuários
function getUsers() {
    const usersData = localStorage.getItem('users');
    if (!usersData) {
        const defaultUsers = {
            'admin': { password: 'admin123', name: 'Administrador', email: 'admin@exemplo.com', role: 'admin', createdAt: new Date().toISOString() },
            'usuario': { password: '123456', name: 'Usuário Teste', email: 'usuario@exemplo.com', role: 'user', createdAt: new Date().toISOString() }
        };
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(usersData);
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function addActivity(message, type = 'info') {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.unshift({
        message: message,
        type: type,
        timestamp: new Date().toISOString(),
        user: currentUser.name
    });
    
    if (activities.length > 10) activities.pop();
    
    localStorage.setItem('activities', JSON.stringify(activities));
    loadActivities();
}

function loadDashboard() {
    const users = getUsers();
    const userArray = Object.entries(users);
    
    // Atualizar estatísticas
    document.getElementById('totalUsers').textContent = userArray.length;
    document.getElementById('activeUsers').textContent = userArray.length;
    document.getElementById('adminUsers').textContent = userArray.filter(([_, u]) => u.role === 'admin').length;
    
    const today = new Date().toDateString();
    const newToday = userArray.filter(([_, u]) => {
        if (!u.createdAt) return false;
        return new Date(u.createdAt).toDateString() === today;
    }).length;
    document.getElementById('newUsersToday').textContent = newToday;
    
    loadUsersTable();
    loadActivities();
}

function loadUsersTable() {
    const users = getUsers();
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    Object.entries(users).forEach(([username, user]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${username}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}">${user.role === 'admin' ? 'Admin' : 'Usuário'}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${username}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadActivities() {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const activityList = document.getElementById('activityList');
    
    if (activities.length === 0) {
        activityList.innerHTML = '<p style="text-align: center; color: #999;">Nenhuma atividade recente</p>';
        return;
    }
    
    activityList.innerHTML = activities.map(activity => {
        const icon = activity.type === 'success' ? '✓' : activity.type === 'warning' ? '⚠' : 'ℹ';
        const time = new Date(activity.timestamp).toLocaleString('pt-BR');
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">${icon}</div>
                <div class="activity-content">
                    <h4>${activity.message}</h4>
                    <p>${activity.user} • ${time}</p>
                </div>
            </div>
        `;
    }).join('');
}

function deleteUser(username) {
    if (username === currentUser.username) {
        alert('Você não pode excluir sua própria conta!');
        return;
    }
    
    if (!confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
        return;
    }
    
    const users = getUsers();
    delete users[username];
    saveUsers(users);
    
    addActivity(`Usuário "${username}" foi excluído`, 'warning');
    loadDashboard();
}

// Modal de adicionar usuário
const modal = document.getElementById('userModal');
const addUserBtn = document.getElementById('addUserBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userForm = document.getElementById('userForm');

addUserBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    userForm.reset();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        userForm.reset();
    }
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const username = document.getElementById('modalUsername').value;
    const password = document.getElementById('modalPassword').value;
    const role = document.getElementById('modalRole').value;
    
    const users = getUsers();
    
    if (users[username]) {
        alert('Este usuário já existe!');
        return;
    }
    
    users[username] = {
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    saveUsers(users);
    addActivity(`Novo usuário "${username}" foi criado`, 'success');
    
    modal.classList.remove('show');
    userForm.reset();
    loadDashboard();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});