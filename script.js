var nameTerr = ["John","Jack","Andrew","Arnold","Micle","Tom","Jeremi","Bob","Sebastian","Mick"];
var nameRus = ["Вася","Ваня","Петя","Борис","Сергей","Слава","Яша","Коля","Толя","Саня"];

var rangsTerr = ["soldier","capral","leutenant","colonel","general"];
var rangsRus = ["рядовой","сержант","лейтенант","полковник","генерал"];


function GetSoldier(name, rang) {
	var soldier = {
	name: name,
	rang: rang,
	hp: 100,
	damage: 12,
	kills: 0,
	isAlive: true
	};
	return soldier;
}

var Terr = [];
for(var i = 0; i < 10; i++) {
	USA = GetSoldier(nameTerr[i],rangsTerr[0]);
}
var Rus = [];
for(var j = 0; j < 10; j++) {
	Rus = GetSoldier(nameRus[i],rangsRus[0]);
}