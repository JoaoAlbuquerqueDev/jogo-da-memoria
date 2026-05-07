  // Atribui a classe "memory-card" dentro da constante: "cards" 
  const cards = document.querySelectorAll('.card-memoria'); 

  var deckmarvel // Criando uma variavel pra fazer uso dela dentro do vetor
  fetch("./json/deckmarvel.json") // Caminho do nosso diretório de imagens 
  .then(response => response.json())
  .then(data => { deckmarvel = data
  })
  
  var deckdc
  fetch("./json/deckdc.json") 
  .then(response => response.json())
  .then(data => { deckdc = data
  })

  /* LET = Variavel local. só funciona dentro do Bloco*/
  let temCartaVirada = false; 
  let travarJogo = false; // Inicia em "False" para liberar as cartas
  let primeiroCard, segundoCard;

  function viraCard() { // Função para mudança das cartas 
    if (travarJogo) return; // Bloquear a virada da 3° cartão
   if (this === primeiroCard) return; 

    this.classList.add('virada');

    if (!temCartaVirada) {
      temCartaVirada = true;
      primeiroCard = this;
      return;
    }

    segundoCard = this;
    verificaCombinacao();
    pontos();
  }

  // Função para checagem de duas cartas (firstCard, secondCard) se retornar verdadeiro ou false
  function verificaCombinacao() {
    let combina = primeiroCard.dataset.framework === segundoCard.dataset.framework;
// Pergunta, se for "True" habilita a Função de manter as duas cartas viradas, caso "false" habilita a função de virar as cartas;
    combina ? disabilitaCard() : desviraCard(); 
  }

  function disabilitaCard() { // Desabilita as Funções da 1° e 2° carta;
    primeiroCard.removeEventListener('click', viraCard);
    segundoCard.removeEventListener('click', viraCard);

   resetaJogo();
  }

  // Desabilita a função flip caso as imagens seja diferentes
  function desviraCard() {
    travarJogo = true;

  // Desabilita a função flip caso as imagens seja diferentes
    setTimeout(() => {
      primeiroCard.classList.remove('virada');
      segundoCard.classList.remove('virada');

     resetaJogo();
    }, 1500);
  }
  
  // Limpa, atribui "false" e "null" as variaveis após executar as funções
 function resetaJogo() { 
   [temCartaVirada, travarJogo] = [false, false];
   [primeiroCard, segundoCard] = [null, null];
 }

// Altera a posição de cada card
  (function embaralhar() {
   cards.forEach(card => { 
     let ramdom = Math.floor(Math.random() * 12); // Cada card vai receber um numero randomico
     card.style.order = ramdom;
   });
 })();

  cards.forEach(card => card.addEventListener('click', viraCard));
  
  const cartas = document.getElementsByClassName("cartas")
  const cartas2 = document.getElementsByClassName("cartas2")


function trocaTemaMarvel(){

/* ---------------- Troca cartas - Jogo DC ------------------------*/

  for(let i = 0; i < cartas.length; i++){
    cartas[i].src = deckdc.cartas[i];
    cartas2[i].src = deckdc.cartas2[0];
  }

}

function trocaTemaDc(){

/* ------------------- Troca cartas - Jogo Marvel --------------------------*/

  for(let i = 0; i < cartas.length; i++){
    cartas[i].src = deckmarvel.cartas[i];
    cartas2[i].src = deckmarvel.cartas2[0];
  }
    
}
  
  var tentativas = 0;
  var text = "Tentativas : ";

  function pontos(){
    if('virada'){
      tentativas++;
    }
    let cont = document.getElementById("contador");
    cont.innerHTML = text + tentativas;
  }
  

