skether = {};

skether.buyInterval = -1;
skether.checkAscensionInterval = -1;
skether.canAscend = true;
skether.santa = 0;
skether.santaInterval = -1;
skether.fast = true;

skether.buyBuildings = function(){
	Game.storeBulkButton(3);
	for(i = 13; i>=0; i--){
		Game.ClickProduct(i);
	}
};

skether.buyUpgrades = function(){
	
	skether.buyInterval = setInterval(function(){
		upgradeButton = document.getElementById("upgrade8");
		if(upgradeButton != null && upgradeButton.className == "crate upgrade enabled"){
			upgradeButton.click();
		}
		else{
			clearInterval(skether.buyInterval);
		}
	
	}, 50);
	
	setTimeout(skether.buyBuildings, 1000);
};

skether.santa = function(){
	skether.santa = 0;
	skether.santaInterval = setInterval(function(){if(skether.santa < 14){Game.UpgradeSanta(); skether.santa++;}else{clearInterval(skether.santaInterval);}}, 100);
}

skether.afterAscending = function(){
	Game.Reincarnate(1);
	setTimeout(function(){document.getElementById("upgrade2").click(); skether.checkAscensionInterval = setInterval(skether.checkAscension, 10000);}, 3000);
	setTimeout(function(){skether.canAscend = true;}, 30000);
	setTimeout(function(){document.getElementById("upgrade0").click(); setTimeout(function(){skether.santa();}, 2500);}, 60000);
}

skether.checkAscension = function(){
	if(Game.ascendNumber.style.display == "block" && skether.canAscend && (Game.ascendMeterPercent > 0.95 || skether.fast)){
		skether.fast = !skether.fast;
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
skether.checkAscensionInterval = setInterval(skether.checkAscension, 10000);