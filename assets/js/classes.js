class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }
  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 3;
    this.maxLife = this.life;
  }
}

class LittleMonster extends Character {
  constructor() {
    super("Little Monster");
    this.life = 40;
    this.attack = 4;
    this.defense = 6;
    this.maxLife = this.life;
  }
}

class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.life = 120;
    this.attack = 16;
    this.defense = 6;
    this.maxLife = this.life;
  }
}

class Stage {
  constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.Log = logObject;
  }

  start() {
    this.update();

    this.fighter1El
      .querySelector(".attackButton")
      .addEventListener("click", () =>
        this.doAttack(this.fighter1, this.fighter2)
      );
    this.fighter2El
      .querySelector(".attackButton")
      .addEventListener("click", () =>
        this.doAttack(this.fighter2, this.fighter1)
      );
  }

  update() {
    //f1
    this.fighter1El.querySelector(".name").innerHTML = `${
      this.fighter1.name
    } - ${this.fighter1.life.toFixed(1)} HP`;
    //ta colocando o nome do personagem no HTML.
    let f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector(".bar").style.width = `${f1pct}%`;
    //definindo a quantidade da barra de vida.

    //f2
    this.fighter2El.querySelector(".name").innerHTML = `${
      this.fighter2.name
    } - ${this.fighter2.life.toFixed(1)} HP`;
    let f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector(".bar").style.width = `${f2pct}%`;
  }

  doAttack(attacking, attacked) {
    let actualAttack = 0;
    let actualDefense = 0;
    // console.log(`${attacking.name} está atacando ${attacked.name}`);
    if (attacking.life <= 0 || attacked.life <= 0) {
      this.Log.addMessage(`morto`);
      return;
    }
    let rollDice = this.rollDice(6);
    this.Log.addMessage(`Lado Dado: ${rollDice}`);
    //0 a 2 = dano 0
    //3 a 5 = dano normal
    //6 = dano multiplicado.

    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() * 2).toFixed(2);

    if (rollDice >= 3 && rollDice <= 5) {
      actualAttack = attacking.attack;
    } else if (rollDice == 6) {
      actualAttack = attacking.attack * attackFactor * 6;
    }

    actualDefense = Math.floor(attacked.defense * defenseFactor);
    if (actualAttack > actualDefense) {
      attacked.life -= actualAttack;
      this.Log.addMessage(
        `${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${
          attacked.name
        }`
      );
    } else {
      this.Log.addMessage(`${attacked.name} conseguiu defender`);
    }
    console.log(
      `${attacking.name} esta atacando com uma força de: ${actualAttack}`
    );

    console.log(
      `${attacked.name} esta defendendo com: ${actualDefense} de defesa`
    );

    this.update();
  }

  rollDice(lados) {
    return Math.floor(Math.random() * (lados + 1));
  }
}

class Log {
  list = [];

  constructor(listEl) {
    this.listEl = listEl;
  }

  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";

    for (let i in this.list) {
      if (this.list[i] === "morto") {
        this.listEl.innerHTML += `<li style="color: red;">${this.list[i]}</li>`;
      } else {
        this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
      }
    }
  }
}

//Tentando colocar um dado, para que cada jogada um dado seja jogado, como um RPG.
