/*
Logica  de programação em JavaScript
    - Falar a lingua do computador

Algoritimo
    - Receita do bolo. Os passos na sequencia certa

JavaScript
    - Variaveis -- pedacinho de memória do computador
         que voce pode quardar o que voce quiser
    - Funções
        pedacinho de codigo que funciona quando eu chamado
    - Como se comunica com o HTML
        Manipular a DOM (Document Object Model)
    
    console.log mostra na tela    
        
    [x] Saber quando o botão foi clicado
    [x] Pegar o texto que o usuario digitou
    [x] Mando para o servidor traduzir
    [x] Receber a resposta do servidor (tradução)  
    [ ] Coloco o texto na tela

    // JavaScript - script
    // HTML - document
    // querySelector - procura no HTML
    // value = valor - o texto que o usuario digitou

    padrao = https://api.mymemory.translated.net/get?q=
    traduzir = Hello World!
    idioma = &langpair=en|pt-br

    fetch / ferramento do JavaScript para entrar em contato com um servidor
    await / esperar a resposta do servidor
    async (async & await sempre juntos)
    json (formato mais amigavel para o JavaScript)
*/


// pegando o texto dentro do textarea
let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")

async function traduzir() {

    // endereço do servidor com texto que eu quero traduzir
    let endereco = "https://api.mymemory.translated.net/get?q="
        + inputTexto.value
        + "&langpair=" 
        + document.getElementById("idioma1").value
        + "|"
        + document.getElementById("idioma2").value

    //resposta do servidor
    let resposta = await fetch(endereco)

    // converto a resposta para um formato mais amigavel
    let dados = await resposta.json()

    let traducao = dados.responseData.translatedText

    //coloco o texto na tela
    let outputTexto = document.querySelector(".traducao")
    outputTexto.innerHTML = traducao

}


function ouvirVoz() {

    // ferramenta de transcrição de audio
    let voz = window.webkitSpeechRecognition

    // Deixando ela pronta para uso
    let reconhecimentoVoz = new voz()

    //configurando a ferramenta
    reconhecimentoVoz.lang = document.getElementById("idioma1").value

    //me avise quando ele terminou de transcrever a voz
    reconhecimentoVoz.onresult = (evento) => {

        let textoTrancicao = evento.results[0]  [0].transcript

        inputTexto.value = textoTrancicao

        traduzir()
    }

    reconhecimentoVoz.start()

}

