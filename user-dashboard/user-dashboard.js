// Verificar autenticação
window.addEventListener('load', function () {
    const currentUserData = sessionStorage.getItem('currentUser');

    if (!currentUserData) {
        window.location.href = './index.html';
        return;
    }

    const currentUser = JSON.parse(currentUserData);

    // Atualizar informações do usuário
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('navUserName').textContent = currentUser.name.split(' ')[0];
    document.getElementById('userEmail').textContent = currentUser.email;

    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userAvatar').textContent = initial;
    document.getElementById('navUserAvatar').textContent = initial;

    // Formatar data do último acesso
    const loginTime = new Date(currentUser.loginTime);
    document.getElementById('lastAccess').textContent = loginTime.toLocaleString('pt-BR');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});