
const firebaseConfig = {
    apiKey: "AIzaSyBPlhIlvJV45Q0MYEPeD39w7Yfumor2aas",
    authDomain: "integrador-34f24.firebaseapp.com",
    projectId: "integrador-34f24",
    storageBucket: "integrador-34f24.appspot.com",
    messagingSenderId: "172090242497",
    appId: "1:172090242497:web:f8a358455abec8f2c36b40"
};

firebase.initializeApp(firebaseConfig);

// Configurar a persistência de autenticação
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        // Autenticação persistente ativada
        console.log("Autenticação persistente ativada.");
    })
    .catch((error) => {
        console.error("Erro ao configurar a persistência de autenticação:", error);
    });

// Adicionar um listener para o evento "DOMContentLoaded" para garantir que o código seja executado após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já está autenticado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Usuário já autenticado:", user);
            // Se o usuário já estiver autenticado, redirecione-o para a página inicial
            if(window.location.href.includes('login.html')){
                window.location.href = "./inicial.html";
            }
        } else {
            console.log("Usuário não autenticado.");
        }
    });
});

// Função para autenticar o usuário
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





/*// Verificação de estado de autenticação
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // O usuário está autenticado
        console.log("Usuário autenticado:", user);
        window.location.href = "./inicial.html"; // Redireciona para a página inicial
    } else {
        // O usuário não está autenticado
        console.log("Usuário não autenticado");
    }
});


/*firebase.auth().onAuthStateChanged(user => {
    if (user!= undefined) {
        window.location.href = "inicial.html";
    }
})*/

function Sair() {
    
    firebase.auth().signOut()
        .then(() => {
            console.log("Usuário deslogado com sucesso.");
            localStorage.removeItem('user'); // Remova as credenciais do usuário do localStorage
            window.location.href = "login.html"; // Redirecione para a página de login
        })
        .catch((error) => {
            console.error('Erro ao fazer logout:', error);
        });
}

/*import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}); */


/* TESTE  */
// Reference to the Firestore database
const db = firebase.firestore();

// Reference to the form
const formCadastroAnimal = document.getElementById('formCadastroAnimal');

// Event listener for the save button


function salvarAnimal() {
  // Gather form data
  const animalData = {
    nome: formCadastroAnimal.nome.value,
    datanasc: formCadastroAnimal.datanasc.value,
    especie: formCadastroAnimal.especie.value,
    idade: formCadastroAnimal.idade.value,
    sexo: formCadastroAnimal.sexo.value,
    raca: formCadastroAnimal.raça.value,
    porte: formCadastroAnimal.porte.value,
    observacoes: formCadastroAnimal.observacoes.value,
    userId: firebase.auth().currentUser.uid // Include the current user's ID
  };

  // Add the data to Firestore
  db.collection('animais').add(animalData)
    .then(function(docRef) {
      console.log("Animal cadastrado com ID: ", docRef.id);
      // Clear form
      formCadastroAnimal.reset();
      // Display success message
      document.getElementById('mensagemCadastro').textContent = "Animal cadastrado com sucesso!";
    })
    .catch(function(error) {
      console.error("Erro ao cadastrar animal: ", error);
      // Display error message
      document.getElementById('mensagemCadastro').textContent = "Erro ao cadastrar animal. Por favor, tente novamente.";
    });
}
/* FIM TESTE */
/*
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
*/
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
function irParaHome(){
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
//document.getElementById('register-form').addEventListener('submit', function(event) {
    //event.preventDefault(); // Previne o envio padrão do formulário
    
    // Chama a função de validação do formulário
    //validateForm();
//});

var registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        
        // Chama a função de validação do formulário
        validateForm();
    });
} else {
    console.error("Elemento 'register-form' não encontrado.");
}

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




