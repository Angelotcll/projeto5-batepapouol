let idInterval;
const postar = "https://mock-api.driven.com.br/api/v6/uol/participants";
const pegar = "https://mock-api.driven.com.br/api/v6/uol/messages";
const chat = document.querySelector("main");
const input = document.querySelector(".input-message");

let user ={
    name:""
};

let envio ={
    from: user.name,
    to: 'Todos',
    text: 'texto prenchido',
    type: 'message'};

function erro(mensagem){
    alert(mensagem);
    nome = null;
}

//função para fazer Login
function login(){
    do{
        user.name = prompt("Informe seu nome");

        if(!isNaN(user.name)){
            erro("Nome inválido, informe um nome");
            continue;
        }

    } while(!user.name);

    enviaUsuarioServidor();

}

function enviaUsuarioServidor(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user).then(usuarioValido).catch(usuarioInvalido);
}

function usuarioValido(){
    envio.from = user.name;
    console.log("tudo certo");
    consultarServidor();
}

function usuarioInvalido(){
    console.log("Não deu certo");
    login();
}

// Enviar dados para o servidor
function enviarServidor(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',envio)
    .then(envioOk).catch(erroEnvio);
}

function envioOk(resultado){
    
}

function erroEnvio(){
    console.log("Erro ao enviar");
}

// consultar o servidor e carregar as mensagens
function consultarServidor(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then(buscarMensagens).catch(erroMensagens);
}

function buscarMensagens(dados){

    dados.data.forEach(element => {

        if(element.type === "status"){

            chat.innerHTML += `<div class="status">           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> ${element.text}         
            </div>`

        } else if(element.type === "message"){
            chat.innerHTML += `<div>           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> para <strong>${element.to}:</strong> ${element.text}         
            </div>` 

        } else if(element.type === "private_message"){
            chat.innerHTML += `<div class="private">           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> reservadamente para <strong>${element.to}:</strong> ${element.text}         
            </div>`
        }
        
        chat.querySelector("div:last-child").scrollIntoView();
    });

}

function erroMensagens(){
    console.log("erro ao buscar mensagens");
}

function enviar(){
    envio.text = input.value;
    console.log(envio);
    enviarServidor();
    consultarServidor();
}

function clicouInput(){
    input.value = '';
}

function statusUsuario(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',user).then(usuarioOn).catch(usuarioOff);
}

function usuarioOn(){
    console.log(user);
}

function usuarioOff(){
    console.log(user);
}

login();

idInterval = setInterval(statusUsuario,5000);




