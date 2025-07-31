class Dungeon {
    static hasEnteredDungeon = false;

    static async fightMenu(player) {
        if (!Dungeon.hasEnteredDungeon) {
            Dungeon.showDungeonEntrance();
            Dungeon.hasEnteredDungeon = true;
        }
        const dungeonMenuBox = document.getElementById('dungeonMenuBox');
        dungeonMenuBox.style.display = 'block';

        const levelCompleted = player.getLevelsCompleted();

        const level1Btn = document.getElementById("level1Btn");
        const level2Btn = document.getElementById("level2Btn");
        const level3Btn = document.getElementById("level3Btn");
        const bossBtn = document.getElementById("bossBtn");

        // lock levels
        level1Btn.disabled = false;
        level2Btn.disabled = levelCompleted < 1;
        level3Btn.disabled = levelCompleted < 2;
        bossBtn.disabled = levelCompleted < 3;

        level2Btn.innerText = levelCompleted < 1 ? "Level 2 🔒" : "Level 2";
        level3Btn.innerText = levelCompleted < 2 ? "Level 3 🔒" : "Level 3";
        bossBtn.innerText = levelCompleted < 3 ? "Boss Battle 🔒" : "Boss Battle";

        const choice = await new Promise(resolve => {
            level1Btn.onclick = () => resolve('1');
            level2Btn.onclick = () => level2Btn.disabled ? null : resolve('2');
            level3Btn.onclick = () => level3Btn.disabled ? null : resolve('3');
            bossBtn.onclick = () => bossBtn.disabled ? null : resolve('4');
            document.getElementById("exitDungeonBtn").onclick = () => resolve('5');
        });

        dungeonMenuBox.style.display = 'none';
        switch (choice) {
            case '1': await Dungeon.levelOne(player); break;
            case '2': await Dungeon.levelTwo(player); break;
            case '3': await Dungeon.levelThree(player); break;
            case '4': await Dungeon.bossBattle(player); break;
            case '5': return;
            default: displayMessage("Invalid choice.");
        }
        // display none for the hp display
        document.getElementById('hpDisplayContainer').style.display = 'none';
        // After completing a level, show the dungeon menu again
        await Dungeon.fightMenu(player);
    }

    static showDungeonEntrance() {
        typeMessage(`
            WELCOME TO THE DUNGEON OF CHALLENGES
            Only the brave can conquer the monsters within!

            Each level will test your math skills and bravery.
            Get ready for a battle of wits and survival!
        `);
    }

    static async showLevelScreen(levelNumber, levelName) {
        displayMessage(`
            --------------------------------------

            --------------------------------------
            `);
        await typeMessage(`

            LEVEL ${levelNumber}: ${levelName}
            `, 50, 50, 28, 5);
        const message = [`
            
            
            
            A strange tension fills the forest...
        `,
        `
            
            
            
            The air crackles with rising energy... Something powerful approaches.
        `,
    `
            
            
            
            Shadows twist around you... The dungeon whispers your name.
        `,
    `
            
            
            
            👑 All goes silent... The Evil Bunny Lord awaits your challenge.
        `];
        await typeMessage(message[levelNumber - 1], 50, 50, 28, 10);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const ctx = GraphicsManager.bgCtx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground("bg_lv" + levelNumber);
        displayMessage(`
            --------------------------------------
            LEVEL ${levelNumber}: ${levelName}
            --------------------------------------
        `);
        if (levelNumber == 1){
            ScreenVisuals.fightScreen1();
        }
        else if (levelNumber == 2){
            ScreenVisuals.fightScreen2();
        }
        else if (levelNumber == 3){
            ScreenVisuals.fightScreen3();
        }
        else if (levelNumber == 4){
            ScreenVisuals.fightScreenBoss();
        }
    }
    static replenishHealth(player) {
        player.setHealthBar(player.getMaxHealthBar());
    }

    static async levelOne(player) {
        Dungeon.replenishHealth(player);
        await GraphicsManager.loadSprite("bg_lv1", "./assets/bg_lv1.png");
        await GraphicsManager.loadSprite("monster_lv1", "./assets/monster_lv1.png");
        await GraphicsManager.drawBackground("bg_lv1");
        await Dungeon.showLevelScreen("1", "Addition & Subtraction");   
        await Dungeon.fightLevel(player, 50, "level1");
    }

    static async levelTwo(player) {
        Dungeon.replenishHealth(player);
        await GraphicsManager.loadSprite("bg_lv2", "./assets/bg_lv2.png");
        await GraphicsManager.loadSprite("monster_lv2", "./assets/monster_lv2.png");
        await GraphicsManager.drawBackground("bg_lv2");
        await Dungeon.showLevelScreen(2, "Multiplication");
        await Dungeon.fightLevel(player, 100, "level2");
    }

    static async levelThree(player) {
        Dungeon.replenishHealth(player);
        await GraphicsManager.loadSprite("bg_lv3", "./assets/bg_lv3.png");
        await GraphicsManager.loadSprite("monster_lv3", "./assets/monster_lv3.png");
        await GraphicsManager.drawBackground("bg_lv3");
        await Dungeon.showLevelScreen(3, "Exponents");
        await Dungeon.fightLevel(player, 150, "level3");
        
    }

    static async bossBattle(player) {
        Dungeon.replenishHealth(player);
        await GraphicsManager.loadSprite("bg_lv4", "./assets/bg_lv4.png");
        await GraphicsManager.loadSprite("monster_lv4", "./assets/monster_lv4.png");
        await GraphicsManager.drawBackground("bg_lv4");
        await Dungeon.showLevelScreen(4, "Boss Battle");
        await Dungeon.fightLevel(player, 250, "boss");
    }

    static async fightLevel(player, monsterHealth, level) {
        level = level.trim().toLowerCase();

        switch (level) {
            case "level1": ScreenVisuals.fightScreen1(); break;
            case "level2": ScreenVisuals.fightScreen2(); break;
            case "level3": ScreenVisuals.fightScreen3(); break;
            case "boss": ScreenVisuals.fightScreenBoss(); break;
        }
        
        document.getElementById('hpDisplayContainer').style.display = 'flex';
        const playerHP = document.getElementById('playerHPText');
        playerHP.innerText = player.getMaxHealthBar();
        const enemyHP = document.getElementById('enemyHPText');
        enemyHP.innerText = monsterHealth;
        while (player.getHealthBar() > 0 && monsterHealth > 0) {
            const question = Game.generateQuestion(level);
            const raw = await getPlayerInputWithTimeout(
                `Question: ${question}`, 
                10000  // 10sec limit
            );
            
            if (raw === null) {
                switch (level) {
                    case "level1": ScreenVisuals.takeDamage1(); break;
                    case "level2": ScreenVisuals.takeDamage2(); break;
                    case "level3": ScreenVisuals.takeDamage3(); break;
                    case "boss":  ScreenVisuals.takeDamageBoss();  break;
                }
                const damage = Game.calculateDamage(level, player.getShieldProtection());
                const prev = player.getHealthBar();
                player.setHealthBar(prev - damage);
                if (player.getHealthBar() < 0) {
                    player.setHealthBar(0);
                }
                animateHPDecrease('player', prev, player.getHealthBar());
            } 
            else {
                const playerAnswer = parseInt(raw, 10); 
                const correctAnswer = Game.evaluateQuestion(question);
                if (playerAnswer === correctAnswer) {
                    switch (level) {
                        case 'level1': ScreenVisuals.doesDamage1(); break;
                        case 'level2': ScreenVisuals.doesDamage2(); break;
                        case 'level3': ScreenVisuals.doesDamage3(); break;
                        case 'boss':  ScreenVisuals.doesDamageBoss();  break;
                    }
                    const prev = monsterHealth;
                    monsterHealth -= player.getWeaponDamage();
                    if (monsterHealth < 0) {
                        monsterHealth = 0;
                    }
                    animateHPDecrease('enemy', prev, monsterHealth);
                } else {
                    switch (level) {
                        case 'level1': ScreenVisuals.takeDamage1(); break;
                        case 'level2': ScreenVisuals.takeDamage2(); break;
                        case 'level3': ScreenVisuals.takeDamage3(); break;
                        case 'boss':  ScreenVisuals.takeDamageBoss();  break;
                    }
                    const damage = Game.calculateDamage(level, player.getShieldProtection());
                    const prev = player.getHealthBar();
                    player.setHealthBar(prev - damage);
                    if (player.getHealthBar() < 0) {
                        player.setHealthBar(0);
                    }
                    animateHPDecrease('player', prev, player.getHealthBar());
                }
            }
        }
        document.getElementById('game-input').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('timer-container').style.display = 'none';
        let unlock = false;
        if (player.getHealthBar() > 0 && monsterHealth <= 0) {
            if(parseInt(level.charAt(level.length - 1),10) - 1 == player.getLevelsCompleted()){
                player.incrementLevelsCompleted();
                unlock = true;
            }
            console.log(player.getLevelsCompleted())
            player.setBudget(player.getBudget() + 50);
            await typeMessage(`
                You have defeated the monster!

                You have completed ${level.charAt(level.length - 1) == "boss" ? "Boss Dungeon" : level}!
                Your current budget: ${player.getBudget()}
            `, 50, 50, 28, 5);
            if (unlock) {
                typeMessage(`You unlocked the next level!`, 600, 150, 28, 5);
            }
        } 
        else {
            player.setBudget(player.getBudget() - 20);
            if (player.getBudget() < 0) {
                player.setBudget(0);
            }
            await typeMessage(`
                Game Over!

                You have been defeated by the monster!

                Select a level to try again.
            `, 50, 50, 28, 5);
        }
    }
}