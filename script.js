var nameTerr = ["John","Jack","Andrew","Arnold","Micle","Tom","Jeremi","Bob","Sebastian","Mick"];
var nameRus = ["Вася","Ваня","Петя","Борис","Сергей","Слава","Яша","Коля","Толя","Саня"];

var rangsTerr = ["soldier","capral","leutenant","colonel","general"];
var rangsRus = ["рядовой","сержант","лейтенант","полковник","генерал"];



function GetSoldier(n, r) {
	var soldier = {
	name: n,
	rang: r,
	// эти параметры не изменятся
	hp: 100,
	damage: 12, // урон 
	kills: 0,   // счетчик убийств
	isAlive: true  // статус : живой - убит 
	};
	return soldier;     
}

// :::::::::::::::::::::::::::::::::::::::::::::::: 
var Terr = [];
var Rus = [];
for(var i = 0; i < 10; i++) {
	Terr[i] = GetSoldier(nameTerr[i],rangsTerr[0]);
	Rus[i] = GetSoldier(nameRus[i],rangsRus[0]);
}


// ------------------------------------------
 
 // добавление в таблицу свойств войнов

 function GetCell(properties, row) {
 	var td = document.createElement("td");
 	td.innerText = properties;
 	row.appendChild(td);
 }

for(var i = 0; i < 10; i++) {
	var tr = document.createElement('tr');

	GetCell(Terr[i].name, tr);
	GetCell(Terr[i].rang, tr);
	GetCell(Terr[i].hp, tr);
	GetCell(Terr[i].damage, tr);
	GetCell(Terr[i].kills, tr);
	GetCell(GetStatus(Terr[i].isAlive), tr);

	document.getElementById('first').appendChild(tr);

	var tr1 = document.createElement("tr");

	GetCell(Rus[i].name, tr1);
	GetCell(Rus[i].rang, tr1);
	GetCell(Rus[i].hp, tr1);
	GetCell(Rus[i].damage, tr1);
	GetCell(Rus[i].kills, tr1);
	GetCell(GetStatus(Rus[i].isAlive), tr1);
	
	document.getElementById('second').appendChild(tr1);
}

function GetStatus(status) {
	if (status) {
		return "Живой";
	}
	else {
		return "Убит";
	}
} 


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

function Fight(terr, rus) {

	var fate = Math.floor(Math.random()*101);
	var fighter1, fighter2;

	if(fate <= 50) {
		fighter1 = terr;
		fighter2 = rus;
	}
	else {
		fighter1 = rus;
		fighter2 = terr;
	}

	while(terr.isAlive && rus.isAlive) {
		var fighter1Dmg = fighter1.damage + Math.floor(Math.random()*21);
		fighter2.hp -= fighter1Dmg;

		if(fighter2.hp <= 0) {
			fighter2.isAlive = false;
			break;
		}

		var fighter2Dmg = fighter2.damage + Math.floor(Math.random()*21);
		fighter1.hp -= fighter2Dmg;


		if(fighter1.hp <= 0) {
			fighter1.isAlive = false;
			break;
		}

		var p = document.createElement("p");
		p.innerText = `${fighter1.name} нанес ${fighter1Dmg} урона. ${fighter2.name} нанес ${fighter2Dmg} урона.`;
		document.querySelector(".main").appendChild(p);

		
	}
	if(terr.isAlive) {
		console.log("Русский солдат убит");
	}
	else {
		console.log("Террорист убит");
	}
	console.log(terr.hp + " " + rus.hp);
}
Fight(Terr[0],Rus[0]);


//--------------------------------------------------------------//
//Написать сам сценарий боя


	
