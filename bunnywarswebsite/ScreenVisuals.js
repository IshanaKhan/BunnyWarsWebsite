class ScreenVisuals {
    static fightScreen1() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv1", 1000, 400, 100, 100);
    }

    static doesDamage1() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv1"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv1", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamage1() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv1"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv1", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static fightScreen2() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv2", 1000, 400, 100, 100);
    }

    static doesDamage2() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv2"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv2", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamage2() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv2"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv2", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static fightScreen3() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv3", 1000, 400, 100, 100);
    }

    static doesDamage3() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv3"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv3", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamage3() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv3"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv3", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static fightScreenBoss() {
        drawSprite("bunny_default", 200, 400, 100, 100);
        drawSprite("monster_lv4", 1000, 400, 100, 100);
    }

    static doesDamageBoss() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv4"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv4", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static takeDamageBoss() {
        clearCanvas(); // Clear the canvas before drawing
        drawBackground("bg_lv4"); // Draw the background again
        drawSprite("bunny_default", 200, 400, 100, 100); // Draw the bunny sprite again
        drawSprite("monster_lv4", 1000, 400, 100, 100); // Draw the monster sprite again
    }

    static winBossBattleScreen() {
        typeMessage(`You have defeated the Boss Bunny!`);
    }

    static trainAndComeBackScreen() {
        displayMessage(`
            |-----------------------------------------------------------------------------------|
            |                                                                                   |
            |                        The Boss Bunny was too strong...                           |
            |                     Time to train and try again!                                  |
            |                                                                                   |
            |   (\\__/)                                                           (\\__(\\         |
            |  (- ,, -) |              "I’ll be back!"                          | (X ,, X)      |
            | (0      )0                                                    +0   (O    O)       |
            |  O------O                                                      O    O------O      |
            |^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
            |-----------------------------------------------------------------------------------|
        `);
    }
}