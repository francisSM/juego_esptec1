class Character {
    constructor(name, health, damage, healthBarId) {
      this.name = name;
      this.health = health;
      this.maxhealth = health;
      this.damage = damage;
      this.healthBarId = healthBarId;
    }
  
    isAlive() {
      return this.health > 0;
    }
  
    attack(target) {
      console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
      target.health -= this.damage;
      target.updateHealthBar();
      if (!target.isAlive()) {
        document.getElementById(`${target.healthBarId.split('-')[0]}-attack-button`).disabled = true;
        console.log(`${target.name} ha muerto!`);
      }
    }
  
    updateHealthBar() {
      const healthBar = document.getElementById(this.healthBarId);
      const healthPercentage = (this.health / this.maxhealth) * 100;
      healthBar.style.width = healthPercentage + '%';
      healthBar.textContent = Math.max(0, healthPercentage.toFixed(0)) + '%';
    }
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hero = new Character("Heroe", getRandomValue(80, 120), getRandomValue(15, 25), "hero-health-bar");
const enemy = new Character("Limo", getRandomValue(80, 120), getRandomValue(10, 20), "enemy-health-bar");

  // Funciones para manejar los ataques
  function heroAttack() {
    hero.attack(enemy);
    if (!enemy.isAlive()) {
      document.getElementById('enemy-attack-button').disabled = true;
    }
  }
  
  function enemyAttack() {
    enemy.attack(hero);
    if (!hero.isAlive()) {
      document.getElementById('hero-attack-button').disabled = true;
    }
  }
  
  console.log("Empieza el combate!");
  console.log(hero.status());
  console.log(enemy.status());
  