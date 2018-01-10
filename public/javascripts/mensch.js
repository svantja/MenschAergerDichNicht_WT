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
var playingFieldTop = [230,230,230,230,230];

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
    }else{
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
    console.log("test");
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            player = result.player[0];
            console.log(player);
        }
    });

}

function setPosition(counter, position, id) {
    pos = getPosition(counter, position, id);
    document.getElementById(id).style.left = pos[0]*100/660 + "%";
    document.getElementById(id).style.top = pos[1]*100/660 + "%";

    console.log(id, ": ", pos)
}

function updatePage(data) {
    var json = JSON.parse(data)
    for(i=0; i < json.player.length; i++){
        for(j=0; j < json.player[i].token.length; j++){
            setPosition(json.player[i].token[j].count, json.player[i].token[j].position, json.player[i].token[j].tokenId);
        }
    }
    console.log("new positions set")
    //location.reload()
    //location.href = "/"
}

function connectWebSocket() {
        console.log("Connecting to Websocket");
        var websocket = new WebSocket("ws://localhost:9000/websocket");

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
    console.log( "Document is ready, filling grid" );
    loadJson();
    connectWebSocket()
});