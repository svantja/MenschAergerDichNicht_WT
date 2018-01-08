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

function getLeft(index){
    left = playingField[index][0] * 100 / 660;
    return left;
}

function getRight(index){
    right = playingField[index][2] * 100 / 660;
    return right;
}

function getPosition(counter, position){
    var div = document.getElementById("background");
    var image = document.createElement("IMG");
    image.setAttribute("src",url("/images/tokens/red1.png"));
    image.setAttribute("position", "absolute");
    image.setAttribute("width", "6%");
    image.setAttribute("height", "6%");

    if(counter > 0 && counter < 41){
        left = getLeft(position);
        right = getRight(position);
        image.setAttribute("left", left);
        image.setAttribute("top", right);
        div.appendChild(image)

    }
    console.log("get position")

}

function loadJson() {
    console.log("test");
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            player = result.player;
            console.log(player);
        }
    });

}

function updatePage() {
    location.reload()
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
                        //updatePage()
                    }

            };
    }

$( document ).ready(function() {
    console.log( "Document is ready, filling grid" );
    loadJson();
    connectWebSocket()
});