skether = {};

skether.buyInterval = -1;
skether.buyIntervalIsRunning = false;
skether.buildingInterval = -1;
skether.buildingIntervalIsRunning = false;
skether.buildingTimeout = -1;
skether.checkAscensionInterval = -1;
skether.canAscend = true;
skether.santaIndex = 0;
skether.santaInterval = -1;
skether.fast = true;
skether.prodID = 0;
skether.upgradeSlot = 8;
skether.buyFast = false;

skether.buyBuildings = function(){
	if(!skether.buildingIntervalIsRunning){
		skether.prodID = 0;
		skether.buildingIntervalIsRunning = true;
		Game.storeBulkButton(2);
		skether.buildingTimeout = setTimeout(function(){if(skether.buildingIntervalIsRunning){Game.storeBulkButton(3);}}, 15000);
		skether.buildingInterval = setInterval(function(){
			if(skether.prodID == -1){
					setTimeout(function(){skether.buildingIntervalIsRunning = false;}, 100);
					clearTimeout(skether.buildingTimeout);
					clearInterval(skether.buildingInterval);
			}
			if(document.getElementById("productPrice" + skether.prodID).style.color == "rgb(0, 255, 0)"){
				if(document.getElementById("product" + skether.prodID).className == "product unlocked enabled"){
					Game.ClickProduct(skether.prodID);
				}
				else{
					skether.prodID = -1;
					setTimeout(function(){skether.buildingIntervalIsRunning = false;}, 100);
					clearTimeout(skether.buildingTimeout);
					clearInterval(skether.buildingInterval);
				}
			}
			else{
				skether.prodID = skether.prodID + 1;
				if(skether.prodID > 13){
					skether.prodID = 0;
				}
			}
		}, 1);
	}
};

skether.buyUpgrades = function(){
	if(!skether.buyIntervalIsRunning){
		skether.buyIntervalIsRunning = true;
		skether.upgradeSlot = 8;
		skether.buyInterval = setInterval(function(){
			if(skether.upgradeSlot == 8 && document.getElementById("upgrade8").style.backgroundPosition == "-192px -432px"){ skether.upgradeSlot = 9;}
			
			upgradeButton = document.getElementById("upgrade" + skether.upgradeSlot);
			if(upgradeButton != null && upgradeButton.className == "crate upgrade enabled"){
				upgradeButton.click();
			}
			else{
				setTimeout(function(){skether.buyIntervalIsRunning = false;}, 100);
				clearInterval(skether.buyInterval);
			}
		
		}, 50);
	}
	setTimeout(skether.buyBuildings, 1000);
};

skether.santa = function(){
	skether.santaIndex = 0;
	skether.santaInterval = setInterval(function(){if(skether.santaIndex < 14){Game.UpgradeSanta(); skether.santaIndex++;}else{clearInterval(skether.santaInterval);}}, 100);
}

skether.afterAscending = function(){
	Game.Reincarnate(1);
	setTimeout(function(){document.getElementById("upgrade2").click(); skether.checkAscensionInterval = setInterval(skether.checkAscension, 10000);}, 3000);
	setTimeout(function(){skether.canAscend = true;}, 30000);
	setTimeout(function(){document.getElementById("upgrade0").click(); setTimeout(function(){skether.santa();}, 2500);}, 60000);
}

skether.checkAscension = function(){
	if(Game.ascendNumber.style.display == "block" && skether.canAscend && (Game.ascendMeterPercent > 0.93 || skether.fast)){
		skether.fast = !skether.fast;
		clearInterval(skether.buyInterval);
		clearInterval(skether.buildingInterval);
		skether.buildingIntervalIsRunning = false;
		skether.buildingIntervalIsRunning = false;
		Game.Ascend(1);
		skether.canAscend = false;
		setTimeout(skether.afterAscending, 7000);
		clearInterval(skether.checkAscensionInterval);
	}
	else{
		skether.buyUpgrades();
	}
}

//MAIN STUFF
Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
skether.checkAscensionInterval = setInterval(skether.checkAscension, 10000);