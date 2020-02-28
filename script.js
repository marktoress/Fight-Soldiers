var nameTerr = ["John","Jack","Andrew","Arnold","Micle","Tom","Jeremi","Bob","Sebastian","Mick"];
var nameRus = ["Вася","Ваня","Петя","Борис","Сергей","Слава","Яша","Коля","Толя","Саня"];

var rangsTerr = ["soldier","capral","leutenant","colonel","general"];
var rangsRus = ["рядовой","сержант","лейтенант","полковник","генерал"];


function GetSoldier(n, r) {
	var soldier = {
	name: n,
	rang: r,
	hp: 100,
	damage: 12, // урон 
	kills: 0,   // счетчик убийств
	isAlive: true  // статус : живой - мертвый
	};
	return soldier;     
}

var Terr = [];
for(var i = 0; i < 10; i++) {
	Terr[i] = GetSoldier(nameTerr[i],rangsTerr[0]);
}


var Rus = [];
for(var j = 0; j < 10; j++) {
	Rus[j] = GetSoldier(nameRus[j],rangsRus[0]);
}

// ------------------------------------------

for(var i = 0; i < 10; i++) {
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerText = Terr[i].name;
	tr.appendChild(td1);

	var td2 = document.createElement('td');
	td2.innerText = Terr[i].rang;
	tr.appendChild(td2);	


	var td3 = document.createElement('td');
	td3.innerText = Terr[i].hp;
	tr.appendChild(td3);

	var td4 = document.createElement('td');
	td4.innerText = Terr[i].damage;
	tr.appendChild(td4);


	var td5 = document.createElement('td');
	td5.innerText = Terr[i].kills;
	tr.appendChild(td5);

	var td6 = document.createElement('td');
	if(Terr[i].isAlive) {
		td6.style.backgroundColor = "black";
		td6.style.color = "orange";
	}
	else {
		td6.style.backgroundColor = "black";
		td6.style.color = "red";	
	}
	td6.innerText = GetStatus(Terr[i].isAlive);
	tr.appendChild(td6);

	document.getElementById('first').appendChild(tr);

// :::::::::::::::::::::::::::::::::::::::::::::::::::::

	var tr1 = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerText = Rus[i].name;
	tr1.appendChild(td1);

	var td2 = document.createElement('td');
	td2.innerText = Rus[i].rang;
	tr1.appendChild(td2);	


	var td3 = document.createElement('td');
	td3.innerText = Rus[i].hp;
	tr1.appendChild(td3);

	var td4 = document.createElement('td');
	td4.innerText = Rus[i].damage;
	tr1.appendChild(td4);


	var td5 = document.createElement('td');
	td5.innerText = Rus[i].kills;
	tr1.appendChild(td5);

	var td6 = document.createElement('td');
	if(Rus[i].isAlive) {
		td6.style.backgroundColor = "black";
		td6.style.color = "orange";
	}
	else {
		td6.style.backgroundColor = "black";
		td6.style.color = "red";	
	}
	td6.innerText = GetStatus(Rus[i].isAlive);
	tr1.appendChild(td6);

	document.getElementById('second').appendChild(tr1);
}

function GetStatus(status) {
	if(status) {
		return "Живой";
	}
	else {
		return "Убит";
	}
} 

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

function Fight(terr, rus) {
	while(terr.isAlive && rus.isAlive) {
		var terrDmg = terr.damage + Math.floor(Math.random()*21);
		var rusDmg = rus.damage + Math.floor(Math.random()*21);
		terr.hp -= rusDmg;
		rus.hp -= terrDmg;

		var p = document.createElement("p");
		p.innerText = `${terr.name} нанес ${terrDmg} урона. ${rus.name} нанес ${rusDmg} урона.`;
		document.querySelector(".main").appendChild(p);
		if(terr.hp <= 0) {
			terr.isAlive = false;
		}
		if(rus.hp <= 0) {
			rus.isAlive = false;
		}
	}
	if(terr.isAlive) {
		console.log("Русский солдат убит");
	}
	else {
		console.log("Террорист убит");
	}
}

//--------------------------------------------------------------//
//Написать сам сценарий боя