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




/* TESTE  */
// Reference to the Firestore database
const db = firebase.firestore();

// Reference to the form
const formCadastroAnimal = document.getElementById('formCadastroAnimal');

// Event listener for the save button


function salvarAnimal() {
    // Gather form data
    const nome = formCadastroAnimal.nome.value.trim();
    const datanasc = formCadastroAnimal.datanasc.value.trim();
    const especie = formCadastroAnimal.especie.value.trim();
    const idade = formCadastroAnimal.idade.value.trim();
    const sexo = formCadastroAnimal.sexo.value.trim();
    const raca = formCadastroAnimal.raça.value.trim();
    const porte = formCadastroAnimal.porte.value.trim();
    const observacoes = formCadastroAnimal.observacoes.value.trim();
  
    // Check if any field is empty
    if (!nome || !datanasc || !especie || !idade || !sexo || !raca || !porte || !observacoes) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    // Add the data to Firestore
    const animalData = {
      nome: nome,
      datanasc: datanasc,
      especie: especie,
      idade: idade,
      sexo: sexo,
      raca: raca,
      porte: porte,
      observacoes: observacoes,
      userId: firebase.auth().currentUser.uid // Include the current user's ID
    };
  
    db.collection('animais').add(animalData)
      .then(function(docRef) {
        console.log("Animal cadastrado com ID: ", docRef.id);
        // Clear form
        formCadastroAnimal.reset();
        // Display success message
        document.getElementById('mensagemCadastro').textContent = "Animal cadastrado com sucesso!";
        // Redirect to initial page
        setTimeout(() => {
          window.location.href = "inicial.html";
        }, 1000); // Redirect after 1 second
      })
      .catch(function(error) {
        console.error("Erro ao cadastrar animal: ", error);
        // Display error message
        document.getElementById('mensagemCadastro').textContent = "Erro ao cadastrar animal. Por favor, tente novamente.";
      });
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
/*
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
*/

    

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
/* ----------------------------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já está autenticado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Usuário já autenticado:", user);
            // Se o usuário já estiver autenticado, redirecione-o para a página inicial
            if(window.location.href.includes('login.html')){
                window.location.href = "./inicial.html";
            }
            // Verifica se a página atual possui o campo de seleção de animais
            if (window.location.href.includes('novaficha.html')) {
                carregarAnimais(); // Chama a função para carregar os animais apenas se estiver na página 'novaficha.html'
            }
        } else {
            console.log("Usuário não autenticado.");
        }
    });
});
// Preenche dinamicamente o campo de seleção com os animais disponíveis
function carregarAnimais() {
    const selectAnimal = document.getElementById('animal');
    
    if(!selectAnimal){
        console.error("Elemento 'animal' não encontrado na página. Esta pagina não requer o carregamento de animais.");
        return;
    }
    // Limpa quaisquer opções existentes
    selectAnimal.innerHTML = "";

    // Adiciona uma opção em branco
    const optionEmBranco = document.createElement('option');
    optionEmBranco.value = "";
    optionEmBranco.textContent = "Selecione um animal";
    selectAnimal.appendChild(optionEmBranco);

    // Busca os animais na coleção 'animais' pertencentes ao usuário atualmente autenticado
    const userId = firebase.auth().currentUser.uid;
    db.collection('animais').where('userId', '==', userId).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // Adiciona cada animal como uma opção no campo de seleção
                const optionAnimal = document.createElement('option');
                optionAnimal.value = doc.id; // Use o ID do documento como valor
                optionAnimal.textContent = doc.data().nome; // Nome do animal
                selectAnimal.appendChild(optionAnimal);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar animais:", error);
        });
}

// Chama a função para carregar os animais quando a página é carregada


/*----------------------------------------------------------------------------------------------------------------------- */

function salvarFicha() {
    const animalId = document.getElementById('animal').value;
    const nomeVeterinario = document.getElementById('nomeveterinario').value;
    const dataAtendimento = document.getElementById('dataAtendimento').value;
    const procedimento = document.getElementById('atendimento').value;

    // Verificar se todos os campos estão preenchidos
    if (!animalId || !nomeVeterinario || !dataAtendimento || !procedimento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const fichaAtendimentoData = {
        userId: firebase.auth().currentUser.uid,
        animalId: animalId,
        nomeVeterinario: nomeVeterinario,
        dataAtendimento: dataAtendimento,
        procedimento: procedimento
    };

    // Salvar a ficha de atendimento
    db.collection('fichas').add(fichaAtendimentoData)
        .then(function(docRef) {
            console.log("Ficha de atendimento cadastrada com ID: ", docRef.id);
            // Limpar formulário
            document.getElementById('formNovaFicha').reset();
            // Exibir mensagem de sucesso
            var mensagemFicha = document.getElementById('mensagemFicha');
            if (mensagemFicha) {
                mensagemFicha.textContent = "Ficha de atendimento cadastrada com sucesso!";
            }
            // Redirecionar para a página inicial após 1 segundo
            setTimeout(() => {
                window.location.href = "inicial.html";
            }, 1000);
        })
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



// Função para buscar animais do usuário atual
function buscarAnimaisDoUsuario() {
    // Obter o ID do usuário atual
    const userId = firebase.auth().currentUser.uid;

    // Referência para a coleção de animais do usuário atual
    const animaisRef = firebase.firestore().collection('animais').where('userId', '==', userId);

    // Realizar a consulta
    animaisRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() é um objeto que contém os dados do animal
            const animal = doc.data();
            // Faça o que você precisa com os dados do animal
            console.log('Animal encontrado:', animal);
        });
    }).catch((error) => {
        console.error('Erro ao buscar animais:', error);
    });
}

// Função para exibir os animais do usuário conectado
function exibirAnimaisDoUsuario() {
    // Verificar se há um usuário autenticado
    const user = firebase.auth().currentUser;
    if (user) {
        // Obter o ID do usuário atual
        const userId = user.uid;

        // Referência para a coleção de animais do usuário atual
        const animaisRef = firebase.firestore().collection('animais').where('userId', '==', userId);

        // Limpar o conteúdo anterior
        document.getElementById('animais').innerHTML = '';

        // Realizar a consulta
        animaisRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // Obter os dados do animal
                const animal = doc.data();
                
                // Criar um botão para o animal
                const button = document.createElement('button');
                button.classList.add('animal-button');
                button.textContent = `${animal.nome} - ${animal.raca} - ${animal.especie} - ${animal.idade}`;
                
                // Adicionar um evento de clique para exibir detalhes do animal (opcional)
                button.addEventListener('click', () => {
                    alert(`Detalhes do animal:\nNome: ${animal.nome}\nRaça: ${animal.raca}\nEspécie: ${animal.especie}\nIdade: ${animal.idade}`);
                });
                
                // Adicionar o botão ao contêiner de animais
                document.getElementById('animais').appendChild(button);
            });
        }).catch((error) => {
            console.error('Erro ao buscar animais:', error);
        });
    } else {
        console.log('Nenhum usuário autenticado.');
    }
}

// Adicionar um listener para o evento "DOMContentLoaded" para garantir que o código seja executado após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Chamar a função para exibir os animais do usuário
    exibirAnimaisDoUsuario();
    
    // Restante do seu código...
});











document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já está autenticado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Usuário já autenticado:", user);
            // Se o usuário já estiver autenticado, redirecione-o para a página inicial
            if (window.location.href.includes('login.html')) {
                window.location.href = "./inicial.html";
            }
            // Verifica se a página atual possui o campo de seleção de animais
            if (window.location.href.includes('buscarficha.html')) {
                // Chama a função para carregar os animais apenas se estiver na página 'buscarficha.html'
                carregarAnimaisBuscar();
            }
        } else {
            console.log("Usuário não autenticado.");
        }
    });
});
// Preenche dinamicamente a barra de pesquisa com os animais do usuário conectado
function carregarAnimaisBuscar() {
    // Busca os animais na coleção 'animais' pertencentes ao usuário atualmente autenticado
    const userId = firebase.auth().currentUser.uid;
    const selectAnimal = document.getElementById('selectAnimalBuscar');
    selectAnimal.innerHTML = ""; // Limpa quaisquer opções existentes

    // Adiciona uma opção em branco
    const optionEmBranco = document.createElement('option');
    optionEmBranco.value = "";
    optionEmBranco.textContent = "Selecione um animal";
    selectAnimal.appendChild(optionEmBranco);

    // Consulta os animais pertencentes ao usuário
    db.collection('animais').where('userId', '==', userId).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // Adiciona cada animal como uma opção na barra de pesquisa
                const optionAnimal = document.createElement('option');
                optionAnimal.value = doc.id; // Use o ID do documento como valor
                optionAnimal.textContent = doc.data().nome; // Nome do animal
                selectAnimal.appendChild(optionAnimal);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar animais:", error);
        });
}
// Função para buscar fichas de atendimento para o animal selecionado
function buscarFichasDoAnimal() {
    // Obtém o ID do animal selecionado
    const animalId = document.getElementById('selectAnimalBuscar').value;

    // Verifica se um animal foi selecionado
    if (!animalId) {
        console.error("Nenhum animal selecionado.");
        return;
    }

    // Referência à lista de fichas de atendimento na página HTML
    const fichasDeAtendimentoList = document.getElementById('fichasDeAtendimento');
    
    // Limpa quaisquer fichas de atendimento exibidas anteriormente
    fichasDeAtendimentoList.innerHTML = "";

    // Consulta as fichas de atendimento para o animal selecionado na coleção 'fichas'
    db.collection('fichas').where('animalId', '==', animalId).get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                // Se não houver fichas de atendimento para o animal selecionado, exibe uma mensagem
                const noFichasMessage = document.createElement('tr');
                const noFichasDataCell = document.createElement('td');
                noFichasDataCell.colSpan = 4; // Colspan para ocupar todas as colunas
                noFichasDataCell.textContent = "Nenhuma ficha de atendimento encontrada para este animal.";
                noFichasMessage.appendChild(noFichasDataCell);
                fichasDeAtendimentoList.appendChild(noFichasMessage);
            } else {
                // Para cada ficha de atendimento encontrada, exibe a data, o nome do animal, veterinário e procedimento
                querySnapshot.forEach(async doc => {
                    const ficha = doc.data();
                    // Obter o nome do animal associado ao ID do animal na ficha de atendimento
                    const nomeAnimal = await obterNomeAnimal(ficha.animalId);
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${ficha.dataAtendimento}</td>
                        <td>${nomeAnimal}</td>
                        <td>${ficha.nomeVeterinario}</td>
                        <td>${ficha.procedimento}</td>
                    `;
                    fichasDeAtendimentoList.appendChild(newRow);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar fichas de atendimento:", error);
        });
}

// Função para obter o nome do animal associado ao ID do animal
async function obterNomeAnimal(animalId) {
    try {
        const animalDoc = await db.collection('animais').doc(animalId).get();
        if (animalDoc.exists) {
            return animalDoc.data().nome;
        } else {
            console.error("Documento do animal não encontrado.");
            return "Animal não encontrado";
        }
    } catch (error) {
        console.error("Erro ao obter nome do animal:", error);
        return "Erro ao obter nome do animal";
    }
}



function editaranimal(){
    window.location.href = "editarAnimal.html";
}



// Preenche dinamicamente o campo de seleção com os animais do usuário conectado
function carregarAnimaisSelecionar() {
    const selectAnimal = document.getElementById('nomeSelecionar');

    // Verifica se há um usuário autenticado antes de prosseguir
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("Nenhum usuário autenticado.");
        return;
    }

    // Limpa quaisquer opções existentes
    selectAnimal.innerHTML = "";

    // Adiciona uma opção em branco
    const optionEmBranco = document.createElement('option');
    optionEmBranco.value = "";
    optionEmBranco.textContent = "Selecione um animal";
    selectAnimal.appendChild(optionEmBranco);

    // Obtém o ID do usuário atualmente autenticado
    const userId = user.uid;

    // Consulta os animais na coleção 'animais' no Firebase Firestore filtrando pelo ID do usuário
    db.collection('animais').where('userId', '==', userId).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // Adiciona cada animal do usuário como uma opção no campo de seleção
                const optionAnimal = document.createElement('option');
                optionAnimal.value = doc.id; // Use o ID do documento como valor
                optionAnimal.textContent = doc.data().nome; // Nome do animal
                selectAnimal.appendChild(optionAnimal);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar animais:", error);
        });

    // Adiciona um listener de evento para mudanças na seleção do animal
    selectAnimal.addEventListener('change', function() {
        const animalId = selectAnimal.value;

        if (animalId) {
            // Se um animal foi selecionado, preenche os campos com seus atributos
            db.collection('animais').doc(animalId).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('novoNome').value = data.nome || '';
                        document.getElementById('datanasc').value = data.datanasc || '';
                        document.getElementById('especie').value = data.especie || '';
                        document.getElementById('idade').value = data.idade || '';
                        document.getElementById('sexo').value = data.sexo || '';
                        document.getElementById('raca').value = data.raca || '';
                        document.getElementById('porte').value = data.porte || '';
                        document.getElementById('observacoes').value = data.observacoes || '';
                    } else {
                        console.error("Nenhum documento encontrado para o animal selecionado.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar animal:", error);
                });
        } else {
            // Se nenhum animal foi selecionado, limpa os campos
            document.getElementById('nome').value = '';
            document.getElementById('datanasc').value = '';
            document.getElementById('especie').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('sexo').value = '';
            document.getElementById('raca').value = '';
            document.getElementById('porte').value = '';
            document.getElementById('observacoes').value = '';
        }
    });
}

// Chama a função para carregar os animais apenas quando a página é carregada e é a página de edição de animais
document.addEventListener('DOMContentLoaded', function() {
    
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            console.log("Usuario ja autenticado:", user);
            if (window.location.pathname.includes('login.html')) {
                window.location.href = "./inicial.html";
            }
            if (window.location.pathname.includes('editarAnimal.html')) {
            
                carregarAnimaisSelecionar();
            }
        } else {
                    
            console.log("Nenhum usuário autenticado.");
                    
        }
    });
    
});



// Função para cancelar as alterações e redirecionar para a página inicial
function cancelarEdicao() {
    if (confirm("Tem certeza de que deseja cancelar as alterações?")) {
        window.location.href = "inicial.html";
    }
}

// Função para excluir o animal selecionado
function apagarAnimal() {
    const selectAnimal = document.getElementById('nomeSelecionar');
    const animalId = selectAnimal.value;

    if (!animalId) {
        alert("Por favor, selecione um animal para excluir.");
        return;
    }

    if (confirm("Tem certeza de que deseja excluir este animal?")) {
        // Excluir o animal do banco de dados
        db.collection('animais').doc(animalId).delete()
            .then(() => {
                alert("Animal excluído com sucesso.");
                // Atualizar o campo de seleção após a exclusão
                carregarAnimaisSelecionar();
            })
            .catch(error => {
                console.error("Erro ao excluir animal:", error);
                alert("Erro ao excluir o animal. Por favor, tente novamente mais tarde.");
            });
    }
    limparCampos();
}

// Função para salvar as alterações no animal selecionado
function salvarEdicao() {
    const selectAnimal = document.getElementById('nomeSelecionar');
    const animalId = selectAnimal.value;

    if (!animalId) {
        alert("Por favor, selecione um animal para salvar as alterações.");
        return;
    }

    const novoNome = document.getElementById('novoNome').value; // Novo campo para o nome do animal

    const datanasc = document.getElementById('datanasc').value;
    const especie = document.getElementById('especie').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const raca = document.getElementById('raca').value;
    const porte = document.getElementById('porte').value;
    const observacoes = document.getElementById('observacoes').value;

    // Atualizar os dados do animal no banco de dados, incluindo o novo nome
    db.collection('animais').doc(animalId).update({
        nome: novoNome, // Atualizando o nome do animal
        datanasc: datanasc,
        especie: especie,
        idade: idade,
        sexo: sexo,
        raca: raca,
        porte: porte,
        observacoes: observacoes
    })
    .then(() => {
        alert("Alterações salvas com sucesso.");
        // Limpar os campos após salvar as alterações
        limparCampos();
        // Atualizar o campo de seleção após salvar as alterações
        carregarAnimaisSelecionar();
    })
    .catch(error => {
        console.error("Erro ao salvar as alterações:", error);
        alert("Erro ao salvar as alterações. Por favor, tente novamente mais tarde.");
    });
}
function limparCampos() {
    document.getElementById('nomeSelecionar').value = '';
    document.getElementById('novoNome').value = '';
    document.getElementById('datanasc').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('raca').value = '';
    document.getElementById('porte').value = '';
    document.getElementById('observacoes').value = '';
}