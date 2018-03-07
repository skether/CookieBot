skether = {};

skether.upgradeInterval = -1;
skether.upgradeIntervalIsRunning = false;
skether.buildingInterval = -1;
skether.buildingIntervalIsRunning = false;
skether.checkAscensionInterval = -1;
skether.prodID = 0;
skether.upgradeSlot = 8;

skether.buyBuildings = function(){
	if(!skether.buildingIntervalIsRunning){
		skether.prodID = 0;
		skether.buildingIntervalIsRunning = true;
		Game.storeBulkButton(2);
		skether.buildingInterval = setInterval(function(){
			if(skether.prodID == -1){
					setTimeout(function(){skether.buildingIntervalIsRunning = false;}, 100);
					clearInterval(skether.buildingInterval);
			}
			
			if(document.getElementById("productPrice" + skether.prodID).style.color == "rgb(0, 255, 0)"){
				if(document.getElementById("product" + skether.prodID).className == "product unlocked enabled"){
					Game.ClickProduct(skether.prodID);
				}
				else{
					skether.prodID = -1;
					setTimeout(function(){skether.buildingIntervalIsRunning = false;}, 100);
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
	if(!skether.upgradeIntervalIsRunning){
		skether.upgradeIntervalIsRunning = true;
		if(document.getElementById("techUpgrades").getElementsByClassName("crate upgrade").length != 0)
		{
			skether.upgradeSlot = document.getElementById("techUpgrades").getElementsByClassName("crate upgrade")[0].id.substr(7);
		}
		else if(document.getElementById("upgrades").getElementsByClassName("crate upgrade").length != 0)
		{
			skether.upgradeSlot = document.getElementById("upgrades").getElementsByClassName("crate upgrade")[0].id.substr(7);
		}
		else
		{
			setTimeout(skether.buyBuildings, 5000);
			return;
		}
		
		skether.upgradeInterval = setInterval(function(){
			if(document.getElementById("upgrade" + skether.upgradeSlot).style.backgroundPosition == "-192px -432px"){ skether.upgradeSlot++;}
			
			upgradeButton = document.getElementById("upgrade" + skether.upgradeSlot);
			if(upgradeButton != null && upgradeButton.className == "crate upgrade enabled" && upgradeButton.getElementsByClassName("CMBackBlue").length == 1){
				upgradeButton.click();
			}
			else if(upgradeButton != null && upgradeButton.className == "crate upgrade" && upgradeButton.getElementsByClassName("CMBackBlue").length == 1)
			{
				setTimeout(function(){skether.upgradeIntervalIsRunning = false;}, 100);
				clearInterval(skether.upgradeInterval);
			}
			else{
				setTimeout(skether.buyBuildings, 5000);
				setTimeout(function(){skether.upgradeIntervalIsRunning = false;}, 100);
				clearInterval(skether.upgradeInterval);
			}
		
		}, 50);
	}
};

//MAIN STUFF
Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
skether.checkAscensionInterval = setInterval(skether.buyUpgrades, 60000);