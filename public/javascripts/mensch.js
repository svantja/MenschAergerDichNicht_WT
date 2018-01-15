var playingField = [[30, 230], [80, 230], [130, 230],[180, 230], [230, 230], // 1.Reihe
    [230, 180], [230, 130], [230, 80], //2.Reihe
    [230, 30 ], [280, 30 ], [330, 30 ],
    [330, 80 ], [330, 130], [330, 180], [330, 230],
    [380, 230], [430, 230], [480, 230],
    [530, 230], [530, 280], [530, 330], //6.
    [480, 330], [430, 330], [380, 330], [330, 330], //7.
    [330, 380], [330, 430], [330, 480], [330, 530],
    [280, 530], [230, 530], // 9.Reihe
    [230, 480], [230, 430], [230, 380], [230, 330],
    [180, 330], [130, 330], [80, 330], [30, 330], [30, 280]];


var FINISH_ONE =   [[80, 280 ], [130, 280], [180, 280], [230, 280]];
var FINISH_TWO =   [[280, 80 ], [280, 130], [280,180 ], [280,230 ]];
var FINISH_THREE = [[480, 280], [430, 280], [380, 280], [330, 280]];
var FINISH_FOUR =  [[280, 480], [280, 430], [280, 380], [280, 330]];

var HOMEFIELDPLAYERONE = [[30, 30], [80, 30], [30, 80], [80, 80]];
var HOMEFIELDPLAYERTWO = [[480, 30], [530, 30], [530, 80], [480, 80]];
var HOMEFIELDPLAYERTHREE = [[480, 480], [530, 480], [530, 530], [480, 530]];
var HOMEFIELDPLAYERFOUR = [[30, 480], [80, 480], [30, 530], [80, 530]];

function getField(index){
    pos = playingField[index];
    return pos;
}

function getHome(index, id) {
    if(id <= 4){
        pos = HOMEFIELDPLAYERONE[index];
    }else if(id > 4 && id <= 8){
        pos = HOMEFIELDPLAYERTWO[index];
    } else if(id > 8 && id <= 12){
        pos = HOMEFIELDPLAYERTHREE[index];
    }else if(id > 12 && id <= 16){
        pos = HOMEFIELDPLAYERFOUR[index];
    }
    return pos;
}

function getFinish(index, id) {
    if(id <= 4){
        pos = FINISH_ONE[index];
    }else if(id > 4 && id <= 8){
        pos = FINISH_TWO[index];
    } else if(id > 8 && id <= 12){
        pos = FINISH_THREE[index];
    }else{
        pos = FINISH_FOUR[index];
    }
    return pos;
}

function drawPlayingField(){
    for(i = 0; i < playingField.length; i++){
        pos = getField(i);
        var div = document.createElement("div");
        div.setAttribute("id", "playingfiel");
        div.className = "circle";
        if(i === 0){
            div.style.background = "indianred";
        } else if(i === 10){
            div.style.background = "cadetblue"
        }else if(i === 20){
            div.style.background = "darkolivegreen";
        }else if(i === 30){
            div.style.background = "orange"
        }
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div);
        console.log("jaay")
    }
}

function drawHouseOne(){
    for(i = 0; i < HOMEFIELDPLAYERONE.length; i++){
        pos = getHome(i, 1);
        var div = document.createElement("div");
        div.setAttribute("id", "red");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
    for(i = 0; i < FINISH_ONE.length; i++){
        pos = getFinish(i, 1);
        var div = document.createElement("div");
        div.setAttribute("id", "red");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
}

function drawHouseTwo(){
    for(i = 0; i < HOMEFIELDPLAYERTWO.length; i++){
        pos = getHome(i, 5);
        var div = document.createElement("div");
        div.setAttribute("id", "blue");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
    for(i = 0; i < FINISH_TWO.length; i++){
        pos = getFinish(i, 5);
        var div = document.createElement("div");
        div.setAttribute("id", "blue");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
}

function drawHouseThree(){
    for(i = 0; i < HOMEFIELDPLAYERTHREE.length; i++){
        pos = getHome(i, 9);
        var div = document.createElement("div");
        div.setAttribute("id", "green");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
    for(i = 0; i < FINISH_THREE.length; i++){
        pos = getFinish(i, 9);
        var div = document.createElement("div");
        div.setAttribute("id", "green");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
}

function drawHouseFour(){
    for(i = 0; i < HOMEFIELDPLAYERFOUR.length; i++){
        pos = getHome(i, 13);
        var div = document.createElement("div");
        div.setAttribute("id", "yellow");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
    }
    for(i = 0; i < FINISH_FOUR.length; i++){
        pos = getFinish(i, 13);
        var div = document.createElement("div");
        div.setAttribute("id", "yellow");
        div.className = "circle";
        div.style.left =  Math.trunc(pos[0]*100/660)  + "%";
        div.style.top =  Math.trunc(pos[1]*100/660) + "%";
        document.getElementById("back").appendChild(div)
        console.log("home :(")
    }
}

function drawHouses(){
    drawPlayingField();
    drawHouseOne();
    drawHouseTwo();
    drawHouseThree();
    drawHouseFour();
}


function getPosition(counter, position, id){
    if(counter > 0 && counter < 41){
        pos = getField(position)

    }else if(counter === 0){
        pos = getHome(position, id);

    }else if(counter >= 41){
        pos = getFinish(position, id);
    }
    return pos;
}

function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            player = result.players[0];
            console.log(player);
        }
    });
}


function setPosition(counter, position, id) {
    pos = getPosition(counter, position, id);
    document.getElementById(id).style.left = pos[0]*100/660 + "%";
    document.getElementById(id).style.top = pos[1]*100/660 + "%";
    document.getElementById(id).style.visibility = "visible"
}

function updatePage(data) {
    var json = JSON.parse(data);
    for(i=0; i < json.players.length; i++){
        for(j=0; j < json.players[i].token.length; j++){
            setPosition(json.players[i].token[j].count, json.players[i].token[j].position, json.players[i].token[j].tokenId);
            console.log("token id: ", json.players[i].token[j].tokenId, "position: ", json.players[i].token[j].position);
        }
    }
    if(json.state.toString() === "NONE" || json.state.toString() === "PREPARE"){
        console.log("preparing")
        document.getElementById("prepare").style.visibility = "visible"
        document.getElementById("dicing").style.visibility = "hidden"
    }
    if(json.state.toString() === "ONGOING"){
        document.getElementById("prepare").style.visibility = "hidden"
        console.log("ongoing")
        document.getElementById("dicing").style.visibility = "visible"
        if(json.current === 0){
            document.getElementById("dicing").className = "btn btn-danger btn-lg btn-block"
        }else if(json.current === 1){
            document.getElementById("dicing").className = "btn btn-primary btn-lg btn-block"
        }else if(json.current === 2){
            document.getElementById("dicing").className = "btn btn-success btn-lg btn-block"
        }else{
            document.getElementById("dicing").className = "btn btn-warning btn-lg btn-block"
        }
        document.getElementById("dicing").innerHTML = "Würfeln"
    }
    if(json.state.toString() === "DICED"){
        document.getElementById("prepare").style.visibility = "hidden"
        console.log("diced")
        document.getElementById("dicing").style.visibility = "visible"
        if(json.current === 0){
            document.getElementById("dicing").style.background = "darkred"
            document.getElementById("dicing").style.visibility = "visible"
            count = 0
            for(i = 0; i < json.players[0].token.length; i++){
                if(json.players[0].token[i].count > 0){
                    count = json.players[0].token[i].count
                }
            }
            if(count > 0){
                document.getElementById("dicing").innerHTML = "Ziehe " + json.players[0].diced + " Felder";
            }else{
                document.getElementById("dicing").innerHTML = "Ziehe zum Start";
            }

        }else if(json.current === 1){
            document.getElementById("dicing").className = "btn btn-primary btn-lg btn-block"
            count = 0
            for(i = 0; i < json.players[1].token.length; i++){
                if(json.players[1].token[i].count > 0){
                    count = json.players[1].token[i].count
                }
            }
            if(count > 0){
                document.getElementById("dicing").innerHTML = "Ziehe " + json.players[1].diced + " Felder";
            }else{
                document.getElementById("dicing").innerHTML = "Ziehe zum Start";
            }

        }else if(json.current === 2){
            document.getElementById("dicing").className = "btn btn-success btn-lg btn-block"
            count = 0
            for(i = 0; i < json.players[2].token.length; i++){
                if(json.players[2].token[i].count > 0){
                    count = json.players[2].token[i].count
                }
            }

            if(count > 0){
                document.getElementById("dicing").innerHTML = "Ziehe " + json.players[2].diced + " Felder";
            }else{
                document.getElementById("dicing").innerHTML = "Ziehe zum Start";
            }

        }else{
            document.getElementById("dicing").className = "btn btn-warning btn-lg btn-block"
            count = 0
            for(i = 0; i < json.players[3].token.length; i++){
                if(json.players[3].token[i].count > 0){
                    count = json.players[3].token[i].count
                }
            }
            if(count > 0){
                document.getElementById("dicing").innerHTML = "Ziehe " + json.players[3].diced + " Felder";
            }else{
                document.getElementById("dicing").innerHTML = "Ziehe zum Start";
            }

        }
    }
    console.log("new positions set")

}

function connectWebSocket() {
    console.log("Connecting to Websocket");

    var loc = window.location;
    var ws_uri = "ws:";
    if(loc.protocol === "https:") {
        ws_uri = "wss:";
    }

    ws_uri += "//" + loc.host + "/websocket";

    var websocket = new WebSocket(ws_uri);

    console.log("Connected to Websocket");

    websocket.onopen = function(event) {
        console.log("Trying to connect to Server");
        websocket.send("Trying to connect to Server");
    };

    websocket.onclose = function () {
        setTimeout(connectWebSocket, 1000);
        console.log('Connection Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            console.log('String message received: ' + e.data);
            updatePage(e.data)
            //updatePage()
        }
    };
}

$( document ).ready(function() {
    console.log( "Document is ready, position Tokens" );
    $('html, body').animate({ scrollTop: ($(document.getElementById("game")).offset().top)}, 'slow');
    drawHouses();
    loadJson();
    connectWebSocket()
});


