class Shop {
    static async shopMenu(player) {
        const shopMenuBox = document.getElementById('shopMenuBox');
        const buyWeaponBtn = document.getElementById('buyWeaponBtn');
        const buyShieldBtn = document.getElementById('buyShieldBtn');
        const exitShopBtn = document.getElementById('exitShopBtn');
        // Update display values
        document.getElementById('currentDamage').textContent = player.getWeaponDamage();
        document.getElementById('currentCoins').textContent = player.getBudget();
        document.getElementById('currentProtection').textContent = player.getShieldProtection();
        
        shopMenuBox.style.display = 'block';
        let choice;
        // wait for button click
        choice = await new Promise(resolve => {
          buyWeaponBtn.onclick = () => resolve('1');
          buyShieldBtn.onclick = () => resolve('2');
          exitShopBtn.onclick = () => resolve('3');
        });
        shopMenuBox.style.display = 'none';
    
        switch (choice) {
            case '1': await Shop.buyWeapon(player); break;
            case '2': await Shop.buyShield(player); break;
            case '3': return;
        }
        // loop back to shop menu until exit
        return Shop.shopMenu(player);
    }


    static async buyWeapon(player) {
        const weaponMenu = document.getElementById('weaponMenu');
        const shopMenuBox = document.getElementById('shopMenuBox');
        weaponMenu.style.display = 'block';
        shopMenuBox.style.display = 'none';
        // Insert weapon images
        document.getElementById('weapon1Img').src = './assets/carved_bun_katana.png';
        document.getElementById('weapon2Img').src = './assets/carrot_slicer.png';
        document.getElementById('weapon3Img').src = './assets/teeth_splitter.png';
        const backBtn = document.getElementById('weaponBackBtn');
        backBtn.onclick = () => {
            weaponMenu.style.display = 'none';
            shopMenuBox.style.display = 'block';
        };

        // Enable/disable buttons based on player's budget
        const budget = player.getBudget();
        const weapon1Btn = document.getElementById('weapon1');
        const weapon2Btn = document.getElementById('weapon2');
        const weapon3Btn = document.getElementById('weapon3');
        
        weapon1Btn.disabled = budget < 100;
        weapon2Btn.disabled = budget < 200;
        weapon3Btn.disabled = budget < 300;
    
        const choice = await new Promise(resolve => {
            if (!weapon1Btn.disabled) weapon1Btn.onclick = () => resolve('1');
            if (!weapon2Btn.disabled) weapon2Btn.onclick = () => resolve('2');
            if (!weapon3Btn.disabled) weapon3Btn.onclick = () => resolve('3');
            if (backBtn) backBtn.onclick = () => resolve('4');
        });
        let cost = 0;
        let damageIncrease = 0;
    
        switch (choice) {
            case '1': cost = 100; damageIncrease = 10; break;
            case '2': cost = 200; damageIncrease = 20; break;
            case '3': cost = 300; damageIncrease = 30; break;
            case '4':
                weaponMenu.style.display = 'none';
                shopMenuBox.style.display = 'block';
                return;
        }
    
        if (player.getBudget() >= cost) {
            player.setBudget(player.getBudget() - cost);
            player.setWeaponDamage(player.getWeaponDamage() + damageIncrease);
            displayMessage("You purchased a new weapon!");
        } else {
            displayMessage("Oops! You don't have enough coins!");
        }
        weaponMenu.style.display = 'none';
        shopMenuBox.style.display = 'block';
    }
    
    static async buyShield(player) {
        const shieldMenu = document.getElementById('shieldMenu');
        const shopMenuBox = document.getElementById('shopMenuBox');
        shieldMenu.style.display = 'block';
        shopMenuBox.style.display = 'none';
    
        const backBtn = document.getElementById('shieldBackBtn');
        backBtn.onclick = () => {
            shieldMenu.style.display = 'none';
            shopMenuBox.style.display = 'block';
        };

        // Enable/disable buttons based on player's budget
        const budget = player.getBudget();
        const shield1Btn = document.getElementById('shield1');
        const shield2Btn = document.getElementById('shield2');
        const shield3Btn = document.getElementById('shield3');
        
        shield1Btn.disabled = budget < 100;
        shield2Btn.disabled = budget < 200;
        shield3Btn.disabled = budget < 300;
    
        const choice = await new Promise(resolve => {
            if (!shield1Btn.disabled) shield1Btn.onclick = () => resolve('1');
            if (!shield2Btn.disabled) shield2Btn.onclick = () => resolve('2');
            if (!shield3Btn.disabled) shield3Btn.onclick = () => resolve('3');
            if (backBtn) backBtn.onclick = () => resolve('4');
        });
    
        let cost = 0;
        let protectionIncrease = 0;
    
        switch (choice) {
            case '1': cost = 100; protectionIncrease = 10; break;
            case '2': cost = 200; protectionIncrease = 20; break;
            case '3': cost = 300; protectionIncrease = 30; break;
            case '4':
                shieldMenu.style.display = 'none';
                shopMenuBox.style.display = 'block';
                return;
        }
    
        if (player.getBudget() >= cost) {
            player.setBudget(player.getBudget() - cost);
            player.setShieldProtection(player.getShieldProtection() + protectionIncrease);
            displayMessage("You purchased a new shield!");
        } else {
            displayMessage("Oops! You don't have enough coins!");
        }
        shieldMenu.style.display = 'none';
        shopMenuBox.style.display = 'block';
    }
}