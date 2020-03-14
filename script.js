
	var nameTerr = ["John","Jack","Andrew","Arnold","Micle","Tom","Jeremi","Bob","Sebastian","Mick"];
	var nameRus = ["Вася","Ваня","Петя","Борис","Сергей","Слава","Яша","Коля","Толя","Саня"];

	var rangsTerr = ["Soldier","Capral","Sergeant","Master-Sergeant","Sergeant-Major","Leutenant","Colonel","General"];
	var rangsRus = ["Рядовой","Сержант","Лейтенант","Капитан","Майор","Подполковник","Полковник","Генерал"];

	var result = document.getElementById('result');

	function GetSoldier(n, r) {
		var soldier = {
		name: n,
		rang: r,
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
			return "Погиб";
		}
	} 

	var fighter1Dmg, fighter2Dmg;

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


	function ChangeProperty(id, fighter, squad) {
			
			var index = GetIndexSoldier(squad, fighter.name);

			var changeDmg = document.querySelector(id).childNodes[index + 2].children[3];
			changeDmg.innerText = fighter.damage;
			var changeHp = document.querySelector(id).childNodes[index + 2].children[2];
			changeHp.innerText = fighter.hp;
			var statusCell = document.querySelector(id).childNodes[index + 2].children[5];
			if(fighter.isAlive == false) {
				statusCell.parentNode.style.backgroundColor = "red";
				statusCell.style.color = "black";
				statusCell.style.fontWeight = "bold";	
				statusCell.innerText = GetStatus(fighter.isAlive);
			}	
			statusCell.innerText = GetStatus(fighter.isAlive);	
			var changeKills = document.querySelector(id).childNodes[index + 2].children[4];
			if(fighter.kills > 0) {
				changeKills.style.backgroundColor = "orange";
				changeKills.style.color = "black";
				changeKills.style.fontWeight = "bold";
				changeKills.innerText = fighter.kills;

				var changeRang = document.querySelector(id).childNodes[index + 2].children[1];
				changeRang.style.backgroundColor = "lightpink";
				changeRang.style.color = "black";
				changeRang.style.fontWeight = "bold";
				changeRang.innerText = fighter.rang;
			}
			
	}


	function Fight(terr, rusSold) {


		// кидаем жребий, кто первый наносит удар

		var fate = Math.floor(Math.random()*101);
		var fighter1, fighter2;

		if(fate <= 50) {
			fighter1 = terr;
			fighter2 = rusSold;
		}
		else {
			fighter1 = rusSold;
			fighter2 = terr;
		}


		var paragraphs = document.getElementsByTagName('p');
		for(var i = 0;  i < paragraphs.length; i++) {
			document.querySelector(".main").removeChild(paragraphs[i]);
		}

		Duel(fighter1, fighter2);

		function Duel(fighter1, fighter2) {
			if(fighter1.isAlive && fighter2.isAlive) {

					fighter1Dmg = fighter1.damage + Math.floor(Math.random()*21);
					fighter2.hp -= fighter1Dmg;
				
					if(fighter2.hp <= 0) {
						console.log(" 1 Внутри проверки");
						fighter2.isAlive = false;
						fighter1.hp += 50;
						fighter1.kills += 1;
						fighter1.damage += 5;
						fighter1.rang = GetRang(nameTerr, nameRus, fighter1);
						ChangeProperty('#first', terr, nameTerr);	
						ChangeProperty('#second', rusSold, nameRus);
						return;
					}

					fighter2Dmg = fighter2.damage + Math.floor(Math.random()*21);
					fighter1.hp -= fighter2Dmg;

					if(fighter1.hp <= 0) {
						console.log(" 2 Внутри проверки");
						fighter1.isAlive = false;
						fighter2.hp += 50;
						fighter2.damage += 5;
						fighter2.kills += 1;
						fighter2.rang = GetRang(nameTerr, nameRus, fighter2);
						ChangeProperty('#first', terr, nameTerr);	
						ChangeProperty('#second', rusSold, nameRus);
						return;
					}

					ChangeProperty('#first', terr, nameTerr);	
					ChangeProperty('#second', rusSold, nameRus);

					var p = document.createElement("p");
					p.innerText = `${fighter1.name}(${fighter1.hp}) нанес ${fighter1Dmg} урона. ${fighter2.name}(${fighter2.hp}) нанес ${fighter2Dmg} урона.`;
					var h = document.getElementById("result"); 
					document.querySelector(".main").insertBefore(p,h);

					fighter1Dmg = fighter2Dmg = 0;
					setTimeout(function() {Duel(fighter1, fighter2)}, 2000);
			}
			else {
				return;
			}	
		}
		
		// ChangeProperty('#first', terr, nameTerr);
		// ChangeProperty('#second', rusSold, nameRus);

		if(terr.isAlive) {
			document.querySelector('#result').innerText = `Террорист ${terr.name} убил солдата.`;
		}
		else {
			document.querySelector('#result').innerText = `Солдат ${rusSold.name} убил террориста.`;
		}	
	}	

	//--------------------------------------------------------------//

	function StayAlive(team) {
		for(var i = 0; i < 10; i++) {
			if(team[i].isAlive) {
				return true;
			}
		}
		return false;
	}	

	var coin1, coin2;


	function War() {

		while(true) { // поиск живого бойца из терров
			coin1 = Math.floor(Math.random()*10);
			if(Terr[coin1].isAlive == true) { // если этот боец живой, то поиск прекращается 
				break;
			}	
		}
		
		while(true) {
			coin2 = Math.floor(Math.random()*10);
			if(Rus[coin2].isAlive == true) {
				break;
			}
		}

		Fight(Terr[coin1], Rus[coin2]);

		if(StayAlive(Terr) == false || StayAlive(Rus) == false) {
			clearInterval(stopWar);
			console.log("Война окончена");
		}

	} 

	var stopWar = setInterval(War, 4500);


function GetIndexSoldier(names, name) {
	for(var i = 0; i < names.length; i++) {
		if(name == names[i]) {
			return i;
		}
	}
}

function GetRang(namesT, namesR, unit) {
	for (var i = 0; i < namesT.length; i++) {
		if (unit.name == namesT[i]) {
			return rangsTerr[unit.kills];
		}
		if (unit.name == namesR[i]) {
			return rangsRus[unit.kills];
		}
	}
}




