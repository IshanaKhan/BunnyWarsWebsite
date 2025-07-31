class Player {
    constructor() {
        this.maxHealthBar = 100;
        this.healthBar = this.maxHealthBar;
        this.budget = 0;
        this.weaponDamage = 15;
        this.shieldProtection = 0;
        this.levelsCompleted = 0;
    }

    getHealthBar() {
        return this.healthBar;
    }

    setHealthBar(healthBar) {
        this.healthBar = healthBar;
    }

    getMaxHealthBar() {
        return this.maxHealthBar;
    }

    setMaxHealthBar(maxHealthBar) {
        this.maxHealthBar = maxHealthBar;
    }

    getBudget() {
        return this.budget;
    }

    setBudget(budget) {
        this.budget = budget;
    }

    getWeaponDamage() {
        return this.weaponDamage;
    }

    setWeaponDamage(weaponDamage) {
        this.weaponDamage = weaponDamage;
    }

    getShieldProtection() {
        return this.shieldProtection;
    }

    setShieldProtection(shieldProtection) {
        this.shieldProtection = shieldProtection;
    }

    getLevelsCompleted() {
        return this.levelsCompleted;
    }

    incrementLevelsCompleted() {
        this.levelsCompleted++;
    }
}
