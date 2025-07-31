package BunnyWarGame;

import java.util.Scanner;

public class Dungeon {

    private static boolean hasEnteredDungeon = false;  // Flag to track if the entrance screen has been shown

    public static void fightMenu(Scanner input, Player player) 
    {
        if (!hasEnteredDungeon) 
        {
            showDungeonEntrance();
            hasEnteredDungeon = true;
        }
        System.out.println("Dungeon Levels:");
        System.out.println("1) Level 1: Addition & Subtraction");
        if (player.getLevelsCompleted() >= 1) 
        {
            System.out.println("2) Level 2: Multiplication");
        }
        if (player.getLevelsCompleted() >= 2) 
        {
            System.out.println("3) Level 3: Exponents");
        }
        if (player.getLevelsCompleted() >= 3) 
        {
            System.out.println("4) Boss Battle");
        }
        System.out.println("5) Exit Dungeon\n");
        System.out.print("Choose a level: ");

        int choice = input.nextInt();
        if (choice == 5) return;

        switch (choice) 
        {
            case 1 -> levelOne(input, player);
            case 2 -> {
                if (player.getLevelsCompleted() >= 1) 
                {
                    levelTwo(input, player);
                } else {
                    System.out.println("You need to complete Level 1 first!");
                }
            }
            case 3 -> {
                if (player.getLevelsCompleted() >= 2) 
                {
                    levelThree(input, player);
                } else {
                    System.out.println("You need to complete Level 2 first!");
                }
            }
            case 4 -> {
                if (player.getLevelsCompleted() >= 3) 
                {
                    bossBattle(input, player);
                } else {
                    System.out.println("You need to complete Level 3 first!");
                }
            }
            default -> System.out.println("Invalid choice.");
        }
    }

    private static void showDungeonEntrance() 
    {
        System.out.println("===================================================");
        System.out.println("        WELCOME TO THE DUNGEON OF CHALLENGES       ");
        System.out.println("  Only the brave can conquer the monsters within!  ");
        System.out.println("===================================================");
        System.out.println("Each level will test your math skills and bravery.");
        System.out.println("Get ready for a battle of wits and survival!\n");
    }

    private static void showLevelScreen(int levelNumber, String levelName) 
    {
        System.out.println("\n---------------------------------------------------");
        System.out.println("                LEVEL " + levelNumber + ": " + levelName);
        System.out.println("---------------------------------------------------");
        System.out.println("Prepare yourself for the next challenge!");
    }

    private static void replenishHealth(Player player) 
    {
        System.out.println("\n>> Your health has been fully replenished for this level!");
        player.setHealthBar(player.getMaxHealthBar());
    }

    private static void levelOne(Scanner input, Player player) 
    {
        showLevelScreen(1, "Addition & Subtraction");
        replenishHealth(player);
        fightLevel(input, player, 50, "level1");
        if (player.getLevelsCompleted() == 1){
            player.incrementLevelsCompleted();
        }
    }

    private static void levelTwo(Scanner input, Player player) 
    {
        showLevelScreen(2, "Multiplication");
        replenishHealth(player);
        fightLevel(input, player, 100, "level2");
        if (player.getLevelsCompleted() == 2){
            player.incrementLevelsCompleted();
        }
    }

    private static void levelThree(Scanner input, Player player) 
    {
        showLevelScreen(3, "Exponents");
        replenishHealth(player);
        fightLevel(input, player, 150, "level3");
        if (player.getLevelsCompleted() == 3){
            player.incrementLevelsCompleted();
        }
    }

    private static void bossBattle(Scanner input, Player player) 
    {
        showLevelScreen(4, "Boss Battle");
        replenishHealth(player);

        float bossHealth = 300;
        ScreenVisuals.fightScreenBoss(); 

        while (player.getHealthBar() > 0 && bossHealth > 0) 
        {
            String question = generateQuestion("boss");
            System.out.println("Question: " + question);

            int playerAnswer = -1;
            while (true) 
            {
                try {
                    System.out.print("Enter answer: ");
                    playerAnswer = input.nextInt();
                    break;
                } catch (java.util.InputMismatchException e) 
                {
                    System.out.println("Invalid input! Please enter an integer.");
                    input.nextLine(); // Clear the invalid input
                }
            }

            int correctAnswer = -1;
            try {
                correctAnswer = evaluateQuestion(question);
            } catch (ArithmeticException e) 
            {
                System.out.println("Error in question evaluation: " + e.getMessage());
                break;
            }

            if (playerAnswer == correctAnswer) 
            {
                System.out.println("Correct! You dealt " + player.getWeaponDamage() + " damage!");
                ScreenVisuals.doesDamageBoss(); 
                bossHealth -= player.getWeaponDamage();
            } else 
            {
                System.out.println("Wrong! You took damage.");
                ScreenVisuals.takeDamageBoss(); 
                int damageTaken = calculateDamage("boss", player.getShieldProtection());
                player.setHealthBar(player.getHealthBar() - damageTaken);
            }

            System.out.println("\n-- Battle Status --");
            System.out.println("Player HP: " + player.getHealthBar());
            System.out.println("Boss HP: " + bossHealth);
            System.out.println("-------------------");
        }

        if (player.getHealthBar() > 0) 
        {
            System.out.println("Congratulations! You defeated the Boss Bunny!");
            player.incrementLevelsCompleted();
            player.setBudget(player.getBudget() + 200); 
            ScreenVisuals.winBossBattleScreen(); 

            // End the game
            System.out.println("\n===============================================");
            System.out.println("        THANK YOU FOR PLAYING BUNNY WAR!       ");
            System.out.println("     The land is now safe, thanks to you!      ");
            System.out.println("===============================================");
            System.exit(0); // Exit the game
        } else 
        {
            System.out.println("You were defeated by the Boss Bunny...");
            player.setBudget(player.getBudget() - 50); 
            ScreenVisuals.trainAndComeBackScreen(); 
        }

        System.out.println("Your current budget: " + player.getBudget());
    }


    private static void fightLevel(Scanner input, Player player, float monsterHealth, String level) 
    {
        level = level.trim().toLowerCase();

        switch (level) 
        {
            case "level1" -> ScreenVisuals.fightScreen1();
            case "level2" -> ScreenVisuals.fightScreen2();
            case "level3" -> ScreenVisuals.fightScreen3();
            case "boss" -> ScreenVisuals.fightScreenBoss();
            default -> throw new IllegalArgumentException("Invalid level: " + level);
        }

        while (player.getHealthBar() > 0 && monsterHealth > 0) 
        {
            String question = generateQuestion(level);
            System.out.println("Question: " + question);

            int playerAnswer = -1;
            while (true) 
            {
                try {
                    System.out.print("Enter answer: ");
                    playerAnswer = input.nextInt();
                    break;
                } catch (java.util.InputMismatchException e) 
                {
                    System.out.println("Invalid input! Please enter an integer.");
                    input.nextLine(); // Clear the invalid input
                }
            }

            int correctAnswer = -1;
            try {
                correctAnswer = evaluateQuestion(question);
            } catch (ArithmeticException e) 
            {
                System.out.println("Error in question evaluation: " + e.getMessage());
                break;
            }

            if (playerAnswer == correctAnswer) 
            {
                System.out.println("Correct! You dealt " + player.getWeaponDamage() + " damage!");
                switch (level) 
                {
                case "level1" -> ScreenVisuals.doesDamage1();
                case "level2" -> ScreenVisuals.doesDamage2();
                case "level3" -> ScreenVisuals.doesDamage3();
                case "boss" -> ScreenVisuals.doesDamageBoss();
                default -> throw new IllegalArgumentException("Invalid level: " + level);
                }
                monsterHealth -= player.getWeaponDamage();
            } else 
            {
                System.out.println("Wrong! You took damage.");
                switch (level) {
                case "level1" -> ScreenVisuals.takeDamage1();
                case "level2" -> ScreenVisuals.takeDamage2();
                case "level3" -> ScreenVisuals.takeDamage3();
                case "boss" -> ScreenVisuals.takeDamageBoss();
                default -> throw new IllegalArgumentException("Invalid level: " + level);
                }
                int damageTaken = calculateDamage(level, player.getShieldProtection());
                player.setHealthBar(player.getHealthBar() - damageTaken);
            }

            System.out.println("\n-- Battle Status --");
            System.out.println("Player HP: " + player.getHealthBar());
            System.out.println("Monster HP: " + monsterHealth);
            System.out.println("-------------------");
        }

        if (player.getHealthBar() > 0) 
        {
            System.out.println("You defeated the monster!");
            player.setBudget(player.getBudget() + 50);
        } else 
        {
            System.out.println("You were defeated...");
            player.setBudget(player.getBudget() - 20);
        }

        System.out.println("Your current budget: " + player.getBudget());
    }


    private static String generateQuestion(String level) 
    {
        int a = Game.getRandomNumber1to9();
        int b = Game.getRandomNumber1to9();
        int c = Game.getRandomNumber1to3();

        switch (level) 
        {
            case "level1" -> {
                int choice = Game.getRandomNumber1to5();
                return switch (choice) 
                {
                    case 1 -> a + " + " + b;
                    case 2 -> a + " - " + b;
                    case 3 -> a + " - " + b + " - " + c;
                    case 4 -> a + " - " + b + " + " + c;
                    default -> a + " + " + b + " + " + c;
                };
            }
            case "level2" -> {
                int choice = Game.getRandomNumber1to2();
                return switch (choice) 
                {
                    case 1 -> a + " * " + b;
                    case 2 -> a + " * " + b + " * " + c;
                    default -> throw new IllegalArgumentException("Invalid operation in Level 2");
                };
            }
            case "level3" -> {
                int exponent = Game.getRandomNumber1to3();
                return a + "^" + exponent;
            }
            case "boss" -> {
                int choice = Game.getRandomNumber1to3();
                // Ensure that the first number is always greater than the second number for subtraction cases
                if (choice == 1) 
                {
                    if (a < b) 
                    {
                        int temp = a;
                        a = b;
                        b = temp;
                    }
                    return "(" + a + " + " + b + ") ^ " + c;
                } else if (choice == 2) 
                {
                    if (a < b) 
                    {
                        int temp = a;
                        a = b;
                        b = temp;
                    }
                    return "(" + a + " * " + b + ") - " + c + " + " + a;
                } else 
                {
                    if (a < b) 
                    {
                        int temp = a;
                        a = b;
                        b = temp;
                    }
                    return "(" + a + " - " + b + ") ^ " + c;
                }
            }
            default -> throw new IllegalArgumentException("Invalid level: " + level);
        }
    }


    private static int evaluateQuestion(String question) 
    {
        question = question.replaceAll("\\s+", "");
        if (question.contains("(")) 
        {
            while (question.contains("(")) 
            {
                int startIdx = question.lastIndexOf("(");
                int endIdx = question.indexOf(")", startIdx);
                String subExpression = question.substring(startIdx + 1, endIdx);
                int subResult = evaluateSubExpression(subExpression);
                question = question.substring(0, startIdx) + subResult + question.substring(endIdx + 1);
            }
        }
        return evaluateSubExpression(question);
    }

    private static int evaluateSubExpression(String expression) 
    {
        String[] parts = expression.split("(?=[-+*/^])|(?<=[-+*/^])");
        int result = Integer.parseInt(parts[0]);
        for (int i = 1; i < parts.length; i += 2) 
        {
            String operator = parts[i];
            int nextTerm = Integer.parseInt(parts[i + 1]);
            switch (operator) 
            {
                case "+" -> result += nextTerm;
                case "-" -> result -= nextTerm;
                case "^" -> result = (int) Math.pow(result, nextTerm);
                default -> throw new IllegalArgumentException("Invalid operator: " + operator);
            }
        }
        return result;
    }

    private static int calculateDamage(String level, int shieldProtection) 
    {
        int baseDamage = switch (level) 
        {
            case "level1", "level2", "level3" -> 30;
            case "boss" -> 50;
            default -> throw new IllegalArgumentException("Invalid level for damage calculation: " + level);
        };
        return Math.max(baseDamage - shieldProtection, 0);
    }
}
