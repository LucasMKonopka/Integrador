
function salvarAnimal() {
    // Obtenha os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var especie = document.getElementById('especie').value;
    var idade = document.getElementById('idade').value;
    var raca = document.getElementById('raça').value;
    var porte = document.getElementById('porte').value;
    var datanasc = document.getElementById('datanasc').value;
    var sexo = document.getElementById('sexo').value;

    // Valide os campos (adapte conforme necessário)
    if (nome === '' || especie === '' || idade === '' || raca === '' || porte === '' || datanasc === '' || sexo === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Crie um objeto animal com os dados
    var animal = {
        nome: nome,
        especie: especie,
        idade: idade,
        raca: raca,
        porte: porte,
        datanasc: datanasc,
        sexo: sexo
    };

    console.log('Animal cadastrado: ', animal);
    listaAnimais.push(animal);

    limparFormulario();

    window.location.href = "inicial.html";
}

// Função para pesquisar animais
function pesquisarAnimal() {
    var termoPesquisa = document.getElementById('pesquisaAnimal').value.toLowerCase();

    // Filtra a lista de animais com base no termo de pesquisa
    var animaisFiltrados = listaAnimais.filter(function(animal) {
        return animal.nome.toLowerCase().includes(termoPesquisa);
    });

    // Exiba a lista de animais filtrados no console
    console.log(animaisFiltrados);

    // Verifique se algum animal foi encontrado
    if (animaisFiltrados.length > 0) {
        // Animal encontrado, você pode adicionar lógica adicional aqui
        console.log('Animal encontrado:', animaisFiltrados[0]);
    } else {
        // Nenhum animal encontrado, exiba uma mensagem
        console.log('Animal não encontrado. Crie um novo cadastro ou verifique o nome inserido.');
        // Ou exiba uma mensagem na página para o usuário
        document.getElementById('mensagemCadastro').innerText = 'Animal não encontrado. Crie um novo cadastro ou verifique o nome inserido.';
    }
}


// Função para limpar o formulário após cadastrar um animal
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('raça').value = '';
    document.getElementById('porte').value = '';
    document.getElementById('datanasc').value = '';
    document.getElementById('sexo').value = '';
}

// Função para pesquisar animais
function pesquisarAnimal() {
    var termoPesquisa = document.getElementById('pesquisaAnimal').value.toLowerCase();

    // Filtra a lista de animais com base no termo de pesquisa
    var animaisFiltrados = listaAnimais.filter(function(animal) {
        return animal.nome.toLowerCase().includes(termoPesquisa);
    });

    // Exiba a lista de animais filtrados no console
    console.log(animaisFiltrados);
}


    

function novaficha(){
    window.location.href = "novaficha.html";
}
function botaoHome() {
    window.location.href = "inicial.html";
}
function cadastraranimal(){
    window.location.href = "index.html";
}

function cancelarCadastro() {
    var confirmacao = confirm("Tem certeza que deseja cancelar o cadastro? Ao cancelar esse cadastro, todas as pendências relacionadas a ela serão excluídas e não será possível desfazer o processo.");

    if (confirmacao) {
        window.location.href = "inicial.html";
    } 
}
function salvarFicha(){
    window.location.href = "inicial.html";
}
function cancelarFicha() {
    var confirmacao = confirm("Tem certeza que deseja cancelar a criação da nova ficha? Ao excluir a ficha, todas as pendências relacionadas a ela serão excluídas e não será possível desfazer o processo.");

    if (confirmacao) {
        window.location.href = "inicial.html";
    } 
}
function buscarficha(){
    window.location.href = "buscarficha.html";
}



function seCadastrar(){
    window.location.href = "cadastro.html";
}

function VoltarLogin(){
    window.location.href = "Login.html";
}
function voltarLogin(){
    window.location.href = "Login.html";
}


function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Usuário autenticado com sucesso:", userCredential.user);
            window.location.href = "./inicial.html"; 
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-login-credentials') {
                alert("Credenciais de login inválidas. Por favor, verifique seu e-mail e senha.");
            } else {
                alert("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
            }
        });
}


function RedefinirSenha(){
    const email = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('E-mail enviado com sucesso para redefinição de senha.');
            window.location.href = "Login.html";
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                alert('Não existe uma conta associada a este e-mail. Por favor, verifique o e-mail fornecido.');
            } else {
                alert('Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.');
            }
        });
}

//TELA DE CADASTRO - REQUISIÇÕES

// Adicione um evento de envio do formulário
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    // Chama a função de validação do formulário
    validateForm();
});

function validateForm() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("ConfirmarPassword").value;
    var passwordLengthMessage = document.getElementById("password-length-message");
    var passwordMessage = document.getElementById("password-message");

    if (password.length < 6) {
        passwordLengthMessage.textContent = "A senha deve ter pelo menos 6 caracteres.";
        return;
    } else {
        passwordLengthMessage.textContent = "";
    }

    if (password !== confirmPassword) {
        passwordMessage.textContent = "As senhas não coincidem.";
        return; 
    } else {
        passwordMessage.textContent = "";
    }
    register();
}

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        window.location.href = "login.html"; // Redireciona para a página de login após o registro bem-sucedido
    }).catch(error => {
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}



