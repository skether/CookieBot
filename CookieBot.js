skether = {};

skether.buyBuildings = function(){
	Game.storeBulkButton(3);
	for(i = 13; i>=0; i--){
		Game.ClickProduct(i);
	}
};

skether.buyUpgrades = function(){
	upgradeButton = document.getElementById("upgrade8");
	do{
		upgradeButton.click();
		upgradeButton = document.getElementById("upgrade8");
	}while(upgradeButton != null && upgradeButton.className == "crate upgrade enabled");
};