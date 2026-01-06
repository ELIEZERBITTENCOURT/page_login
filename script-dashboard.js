// Verificar se usuário está logado
window.addEventListener('load', function () {
    const currentUserData = sessionStorage.getItem('currentUser');

    if (!currentUserData) {
        // Se não estiver logado, redireciona para login
        window.location.href = 'index.html';
        return;
    }

    const currentUser = JSON.parse(currentUserData);

    // Atualizar informações do usuário
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;

    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userAvatar').textContent = initial;
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    window.location.href = 'index.html';
});