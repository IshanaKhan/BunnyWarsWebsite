package BunnyWarGame;

import java.util.Scanner;

public class BunnyWarGame 
{
    public static void main(String[] args) 
    {
        Scanner input = new Scanner(System.in);

        // Initialize player
        Player player = new Player();

        // Game introduction
        Game.introduction();

        // Main game 
        while (true) 
        {
            int option = Game.menu(input);

            if (option == 1) 
            { // Fight
                Dungeon.fightMenu(input, player);
            } else if (option == 2) 
            { // Shop
                Shop.shopMenu(input, player);
            } else if (option == 3) 
            { // Exit
                System.out.println("Thank you for playing! Goodbye!");
                break;
            }
        }

        input.close(); 
    }
}
