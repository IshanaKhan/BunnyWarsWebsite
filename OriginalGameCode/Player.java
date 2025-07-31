package BunnyWarGame;

public class Player 
{
    private float healthBar;
    private float maxHealthBar; // Maximum health
    private float budget;
    private int weaponDamage;
    private int shieldProtection;
    private int levelsCompleted;

    public Player() 
    {
        this.maxHealthBar = 100; // Default maximum health
        this.healthBar = maxHealthBar; // Initialize current health to maximum
        this.budget = 0;
        this.weaponDamage = 15; // Default weapon damage
        this.shieldProtection = 0; // Default shield protection
        this.levelsCompleted = 0;
    }

    public float getHealthBar() 
    {
        return healthBar;
    }

    public void setHealthBar(float healthBar) 
    {
        this.healthBar = healthBar;
    }

    public float getMaxHealthBar() {
        return maxHealthBar;
    }

    public void setMaxHealthBar(float maxHealthBar) 
    {
        this.maxHealthBar = maxHealthBar;
    }

    public float getBudget() 
    {
        return budget;
    }

    public void setBudget(float budget) 
    {
        this.budget = budget;
    }

    public int getWeaponDamage() {
        return weaponDamage;
    }

    public void setWeaponDamage(int weaponDamage) 
    {
        this.weaponDamage = weaponDamage;
    }

    public int getShieldProtection() 
    {
        return shieldProtection;
    }

    public void setShieldProtection(int shieldProtection) 
    {
        this.shieldProtection = shieldProtection;
    }

    public int getLevelsCompleted() 
    {
        return levelsCompleted;
    }

    public void incrementLevelsCompleted() 
    {
        this.levelsCompleted++;
    }
}
