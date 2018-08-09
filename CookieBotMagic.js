skether = {};

skether.checkMagicInterval = -1;
skether.magicRef = -1;

skether.checkMagic = function() {
	if(skether.magicRef.magic == skether.magicRef.magicM)
	{
		Math.seedrandom(Game.seed+'/'+skether.magicRef.spellsCastTotal)
		var isNoFail = (Math.random() < 0.85);
		Math.seedrandom();
		if(isNoFail)
		{
			skether.magicRef.castSpell(skether.magicRef.spells["conjure baked goods"]);
		}
		else
		{
			skether.magicRef.castSpell(skether.magicRef.spells["haggler's charm"]);
		}
	}
};

//MAIN Stuff
skether.magicRef = Game.Objects['Wizard tower'].minigame;
skether.checkMagicInterval = setInterval(skether.checkMagic, 10000);