package BunnyWarGame;

import java.util.Scanner;

public class Shop {
    public static void shopMenu(Scanner input, Player player) 
    {
        while (true) 
        {
            System.out.println("\n       (\\__/) ");
            System.out.println("  Bunny Shop Menu");
            System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            System.out.println("| 1) Buy Weapons           |");
            System.out.println("|                          |");
            System.out.println("| 2) Buy Shields           |");
            System.out.println("|                          |");
            System.out.println("| 3) Exit Shop             |");
            System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            System.out.print("Please enter your choice: ");
            
            int choice = input.nextInt();
            if (choice == 3) 
            {
                System.out.println("\nThank you for visiting the Bunny Shop! Come back soon!");
                break;
            }

            switch (choice) 
            {
                case 1 -> buyWeapon(input, player);
                case 2 -> buyShield(input, player);
                default -> System.out.println("Oops! That wasn't a valid choice. Please try again!");
            }
        }
    }

    private static void buyWeapon(Scanner input, Player player) 
    {
        System.out.println("\n       (\\__/) ");
        System.out.println("   Choose Your Weapon");
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println("| 1) Carved Bun Katana - 100 coins (+10 damage) |");
        System.out.println("| 2) Carrot Slicer - 200 coins (+20 damage)     |");
        System.out.println("| 3) Teeth Splitter - 300 coins (+30 damage)    |");
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.print("Which weapon will you choose? ");

        int choice = input.nextInt();
        int cost = 0;
        int damageIncrease = 0;

        switch (choice) 
        {
            case 1 -> { cost = 100; damageIncrease = 10; }
            case 2 -> { cost = 200; damageIncrease = 20; }
            case 3 -> { cost = 300; damageIncrease = 30; }
            default -> System.out.println("Sorry, that weapon is not available. Please choose again!");
        }

        if (player.getBudget() >= cost) 
        {
            player.setBudget(player.getBudget() - cost);
            player.setWeaponDamage(player.getWeaponDamage() + damageIncrease);
            System.out.println("\nYou purchased a new weapon! Go fight with bravery!");
        } else 
        {
            System.out.println("Oops! You don't have enough coins! Maybe try saving up!");
        }
    }

    private static void buyShield(Scanner input, Player player) 
    {
        System.out.println("\n       (\\__/) ");
        System.out.println("   Choose Your Shield");
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println("| 1) Baneful Bun - 100 coins (+10 protection)     |");
        System.out.println("| 2) Wall of Carrots - 200 coins (+20 protection) |");
        System.out.println("| 3) Eternal Rabbit - 300 coins (+30 protection)  |");
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.print("Which shield will protect you? ");

        int choice = input.nextInt();
        int cost = 0;
        int protectionIncrease = 0;

        switch (choice) 
        {
            case 1 -> { cost = 100; protectionIncrease = 10; }
            case 2 -> { cost = 200; protectionIncrease = 20; }
            case 3 -> { cost = 300; protectionIncrease = 30; }
            default -> System.out.println("Oops, that shield isn't available! Try again!");
        }

        if (player.getBudget() >= cost) 
        {
            player.setBudget(player.getBudget() - cost);
            player.setShieldProtection(player.getShieldProtection() + protectionIncrease);
            System.out.println("\nYou now have a powerful shield to protect you!");
        } else 
        {
            System.out.println("Not enough coins! Maybe next time!");
        }
    }
}

