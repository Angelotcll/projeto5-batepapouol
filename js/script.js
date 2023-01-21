let nome, idInterval;
const postar = "https://mock-api.driven.com.br/api/v6/uol/participants";
const pegar = "https://mock-api.driven.com.br/api/v6/uol/messages";

const mensagens = document.querySelector("main");

/*function erro(mensagem){
    alert(mensagem);
    nome = null;
}

do{
    nome = prompt("Informe seu nome");

    if(!isNaN(nome)){
        erro("Nome inválido, informe um nome");
        continue;
    }

} while(!nome);

*/

function consultarServidor(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages').then(buscarMensagens);
}

function buscarMensagens(dados){

    dados.data.forEach(element => {

        if(element.type === "status"){

            mensagens.innerHTML += `<div class="status">           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> ${element.text}         
            </div>`

        } else if(element.type === "message"){
            mensagens.innerHTML += `<div>           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> para <strong>${element.to}:</strong> ${element.text}         
            </div>` 

        } else if(element.type === "private_message"){
            mensagens.innerHTML += `<div class="private">           
            <time datetime="09:34:23">(${element.time})</time>
            <strong>${element.from}</strong> reservadamente para <strong>${element.to}:</strong> ${element.text}         
            </div>`
        }
        
        mensagens.querySelector("div:last-child").scrollIntoView();
    });

}

consultarServidor();

idInterval = setInterval(consultarServidor,30000);