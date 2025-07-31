class BunnyWarGame {
    static async main() {
        const player = new Player();

        await Game.introduction();
        while (true) {
            const option = await Game.menu();
            if (option === 1) {
                await Dungeon.fightMenu(player);
            } else if (option === 2) {
                await Shop.shopMenu(player);
            } else if (option === 3) {
                alert("Thank you for playing! Goodbye!");
                break;
            }
        }
    }
}