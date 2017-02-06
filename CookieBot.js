skether = {};

skether.buyBuildings = function(){
	Game.storeBulkButton(3);
	for(i = 13; i>=0; i--){
		Game.ClickProduct(i);
	}
};