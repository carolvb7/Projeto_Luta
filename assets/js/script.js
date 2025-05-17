let log = new Log(document.querySelector(".log"));

let char;

// Read the 'personagem' query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const personagemEscolhido = urlParams.get('personagem');


switch (personagemEscolhido) {
  case 'Mago':
    char = new Sorcerer("Mago");
    break;
  case 'Arqueiro':
    char = new Arrow("Arqueiro"); 
    break;
  case 'Cavaleiro':
  default: 
    char = new Knight("Cavaleiro");
    break;
}

let Monster = new LittleMonster();

const stage = new Stage(
  char,
  Monster,
  document.querySelector("#char"),
  document.querySelector("#monster"),
  log
);

stage.start();