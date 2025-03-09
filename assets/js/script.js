let log = new Log(document.querySelector(".log"));

let char = new Knight("Juguerbal");

// console.log('Mago: '+char.name);
// console.log('Sua vida: '+char.life);
// console.log('Sua força é: '+char.attack);

let Monster = new LittleMonster();
// console.log(Monster.name)

const stage = new Stage(
  char,
  Monster,
  document.querySelector("#char"),
  document.querySelector("#monster"),
  log
);

stage.start();

// console.log(Math.floor(Math.random() * 7))