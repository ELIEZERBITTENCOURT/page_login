// Verificar autenticação
let currentUser = null;

window.addEventListener('load', function() {
    const currentUserData = sessionStorage.getItem('currentUser');
    
    if (!currentUserData) {
        // Redirecionar para index.html na raiz (voltar uma pasta)
        window.location.href = '../index.html';
        return;
    }
    
    currentUser = JSON.parse(currentUserData);
    
    // Verificar se é usuário comum (não admin)
    const users = getUsers();
    const userData = users[currentUser.username];
    
    if (userData && userData.role === 'admin') {
        // Se for admin, redireciona para o dashboard admin
        window.location.href = '../admin-dashboard/admin-dashboard.html';
        return;
    }
    
    // Atualizar informações do usuário na interface
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('navUserName').textContent = currentUser.name.split(' ')[0];
    document.getElementById('userEmail').textContent = currentUser.email;
    
    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userAvatar').textContent = initial;
    document.getElementById('navUserAvatar').textContent = initial;
    
    // Formatar data do último acesso
    if (currentUser.loginTime) {
        const loginTime = new Date(currentUser.loginTime);
        document.getElementById('lastAccess').textContent = loginTime.toLocaleString('pt-BR');
    }
});

// Função para obter usuários do localStorage
function getUsers() {
    const usersData = localStorage.getItem('users');
    if (!usersData) {
        return {};
    }
    return JSON.parse(usersData);
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('currentUser');
    // Redirecionar para index.html na raiz (voltar uma pasta)
    window.location.href = '../index.html';
});