package BunnyWarGame;
import java.util.Scanner;
import java.util.Random;

public class Game 
{
    public static int getRandomNumber1to9() 
    {
        Random random = new Random();
        return random.nextInt(9) + 1;
    }
    
    public static int getRandomNumber1to5() 
    {
        Random random = new Random();
        return random.nextInt(5) + 1;
    }
    
    public static int getRandomNumber1to2() 
    {
        Random random = new Random();
        return random.nextInt(2) + 1;
    }
    
    public static int getRandomNumber1to3() 
    {
        Random random = new Random();
        return random.nextInt(3) + 1;
    }

    public static void introduction() 
    {
    	System.out.println("\t\t\t\t\t\t\t\t\t\tWelcome to Bunny Wars! \n\n");
        System.out.println("\t\t\t\t\t\t\t\t\t\t       (\\__/) ");
    	System.out.println("\t\t\t\t\t\t\t\t\t\t      (. ,, .)");
    	System.out.println("\t\t\t\t\t\t\t\t\t\t     (0      0)");
    	System.out.println("\t\t\t\t\t\t\t\t\t\t      O------O \n");
        System.out.println("You are on an adventure as the solo Bunny Hero! Solve six challenging math levels to defeat the Evil Bunny Master's minions and face off against the ultimate EVIL BUNNY BOSS to save the world!");
        System.out.println("NOTICE: You may purchase new unique weapons and gear from the shop to increase offensive and defensive stats. \n\n");
    }

    public static int menu(Scanner input) 
    {
        System.out.println("\n       (\\__/) ");
    	System.out.println("   Main Menu Options");
    	System.out.println("------------------------");
        System.out.println("| 1) Fight             |");
        System.out.println("|                      |");
        System.out.println("| 2) Shop              |");
        System.out.println("|                      |");
        System.out.println("| 3) Exit Game         |");
        System.out.println("------------------------ \n");
        System.out.print("Please enter your choice: ");
        return input.nextInt();
    }
}