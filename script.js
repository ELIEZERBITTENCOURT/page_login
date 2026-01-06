// Armazenamento de usuários (simulando banco de dados)
let users = {
    'admin': { password: 'admin123', name: 'Administrador', email: 'admin@exemplo.com' },
    'usuario': { password: '123456', name: 'Usuário Teste', email: 'usuario@exemplo.com' }
};

// Elementos do DOM
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Variável para armazenar usuário logado
let currentUser = null;

// Função para mostrar erro
function showMessage(elementId, message, isError = true) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.classList.remove('error-message', 'success-message');
    element.classList.add(isError ? 'error-message' : 'success-message');
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 4000);
}

// Função para alternar entre login e cadastro
showRegisterLink.addEventListener('click', function () {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

showLoginLink.addEventListener('click', function () {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Validação de senha em tempo real
const registerPassword = document.getElementById('registerPassword');
const reqLength = document.getElementById('reqLength');
const reqNumber = document.getElementById('reqNumber');

registerPassword.addEventListener('input', function () {
    const password = this.value;

    if (password.length >= 6) {
        reqLength.classList.add('met');
    } else {
        reqLength.classList.remove('met');
    }

    if (/\d/.test(password)) {
        reqNumber.classList.add('met');
    } else {
        reqNumber.classList.remove('met');
    }
});

// Função para validar cadastro
function validateRegistration(username, email, password, confirmPassword, name) {
    if (name.trim().length < 3) {
        showMessage('registerErrorMessage', 'Nome deve ter pelo menos 3 caracteres');
        return false;
    }

    if (users[username]) {
        showMessage('registerErrorMessage', 'Este usuário já existe!');
        return false;
    }

    if (username.length < 3) {
        showMessage('registerErrorMessage', 'Usuário deve ter pelo menos 3 caracteres');
        return false;
    }

    if (password.length < 6) {
        showMessage('registerErrorMessage', 'Senha deve ter pelo menos 6 caracteres');
        return false;
    }

    if (!/\d/.test(password)) {
        showMessage('registerErrorMessage', 'Senha deve conter pelo menos 1 número');
        return false;
    }

    if (password !== confirmPassword) {
        showMessage('registerErrorMessage', 'As senhas não coincidem!');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('registerErrorMessage', 'E-mail inválido!');
        return false;
    }

    return true;
}

// Função para registrar novo usuário
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;

    if (validateRegistration(username, email, password, confirmPassword, name)) {
        users[username] = {
            password: password,
            name: name,
            email: email
        };

        showMessage('registerSuccessMessage', 'Cadastro realizado com sucesso! Redirecionando...', false);

        setTimeout(() => {
            registerForm.reset();
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            document.getElementById('loginUsername').value = username;
        }, 2000);
    }
});

// Função para fazer login
function login(username, password) {
    const user = users[username];

    if (!user) {
        showMessage('loginErrorMessage', 'Usuário não encontrado!');
        return false;
    }

    if (user.password !== password) {
        showMessage('loginErrorMessage', 'Senha incorreta!');
        return false;
    }

    currentUser = {
        username: username,
        name: user.name,
        email: user.email
    };

    const rememberMe = document.getElementById('rememberMe');
    if (rememberMe.checked) {
        sessionStorage.setItem('rememberedUser', username);
    }

    return true;
}

// Função para mostrar dashboard
function showDashboard() {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');

    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;

    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('userAvatar').textContent = initial;
}

// Função para fazer logout
function logout() {
    currentUser = null;
    sessionStorage.removeItem('rememberedUser');
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    loginForm.reset();
}

// Event listener para o formulário de login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (login(username, password)) {
        showDashboard();
    }
});

// Event listener para o botão de logout
logoutBtn.addEventListener('click', logout);

// Verificar se há usuário lembrado ao carregar a página
window.addEventListener('load', function () {
    const rememberedUser = sessionStorage.getItem('rememberedUser');
    if (rememberedUser && users[rememberedUser]) {
        document.getElementById('loginUsername').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});