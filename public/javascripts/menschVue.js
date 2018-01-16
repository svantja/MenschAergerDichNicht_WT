let Field = [[30, 230], [80, 230], [130, 230],[180, 230], [230, 230], // 1.Reihe
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

let HOME_1 = [[30, 30], [80, 30], [30, 80], [80, 80]];
let HOME_2 = [[480, 30], [530, 30], [530, 80], [480, 80]];
let HOME_3 = [[480, 480], [530, 480], [530, 530], [480, 530]];
let HOME_4 = [[30, 480], [80, 480], [30, 530], [80, 530]];

let FIN_1 =   [[80, 280 ], [130, 280], [180, 280], [230, 280]];
let FIN_2 =   [[280, 80 ], [280, 130], [280,180 ], [280,230 ]];
let FIN_3 = [[480, 280], [430, 280], [380, 280], [330, 280]];
let FIN_4 = [[280, 480], [280, 430], [280, 380], [280, 330]];

$(document).ready(function () {
    let menschgame = new Vue({
        el:'#mensch-game',
        data: {
            message: "Würfeln",
            messagetwo: "Spieler hinzufügen",
            messagethree: "Spiel starten"
        }
    });

    let menschbutton = new Vue({
        el:'#mensch-button'
    });

    let preparebutton = new Vue({
        el:'#prepare'
    })

});

Vue.component('playing-field', {
    template:`
            <div>
               <span v-for="field in fields"> 
                    <div v-if="field[0] === 30 && field[1] === 230">
                        <div class="circle" id="playingfiel" v-bind:style="{'top': Math.trunc(field[1]*100/660) + '%', 'left': Math.trunc(field[0]*100/660) + '%', 'background':'indianred'}"></div>
                    </div>
                    <div v-else>
                        <div v-if="field[0] === 330 && field[1] === 30">
                            <div class="circle" id="playingfiel"  v-bind:style="{'top': Math.trunc(field[1]*100/660) + '%', 'left': Math.trunc(field[0]*100/660) + '%', 'background': 'cadetblue'}"></div>
                        </div>
                        <div v-else>
                            <div v-if="field[0] === 530 && field[1] === 330">
                                <div class="circle" id="playingfiel"  v-bind:style="{'top': Math.trunc(field[1]*100/660) + '%', 'left': Math.trunc(field[0]*100/660) + '%', 'background': 'darkolivegreen'}"></div>
                            </div>
                            <div v-else>
                                <div v-if="field[0] === 230 && field[1] === 530">
                                    <div class="circle" id="playingfiel"  v-bind:style="{'top': Math.trunc(field[1]*100/660) + '%', 'left': Math.trunc(field[0]*100/660) + '%', 'background': 'orange'}"></div>
                                </div>
                                <div v-else>
                                    <div class="circle" id="playingfiel"  v-bind:style="{'top': Math.trunc(field[1]*100/660) + '%', 'left': Math.trunc(field[0]*100/660) + '%'}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
               </span>
            </div>
    `,
    data: function () {
        return {
            fields: Field
        }
    },
});

Vue.component('home-1',{
   template:`
            <div>
                <span v-for="h in h1">
                    <div class="circle" id="red" v-bind:style="{'top': Math.trunc(h[1]*100/660) + '%', 'left': Math.trunc(h[0]*100/660) + '%'}"></div>
                </span>
                <span v-for="f in f1">
                    <div class="circle" id="red" v-bind:style="{'top': Math.trunc(f[1]*100/660) + '%', 'left': Math.trunc(f[0]*100/660) + '%'}"></div>
                </span>
            </div>
   `,
   data: function () {
       return{
           h1: HOME_1,
           f1: FIN_1
       }
   }
});

Vue.component('home-2',{
    template:`
            <div>
                <span v-for="h in h2">
                    <div class="circle" id="blue" v-bind:style="{'top': Math.trunc(h[1]*100/660) + '%', 'left': Math.trunc(h[0]*100/660) + '%'}"></div>
                </span>
                <span v-for="f in f2">
                    <div class="circle" id="blue" v-bind:style="{'top': Math.trunc(f[1]*100/660) + '%', 'left': Math.trunc(f[0]*100/660) + '%'}"></div>
                </span>
            </div>
   `,
    data: function () {
        return{
            h2: HOME_2,
            f2: FIN_2
        }
    }
});

Vue.component('home-3',{
    template:`
            <div>
                <span v-for="h in h3">
                    <div class="circle" id="green" v-bind:style="{'top': Math.trunc(h[1]*100/660) + '%', 'left': Math.trunc(h[0]*100/660) + '%'}"></div>
                </span>
                <span v-for="f in f3">
                    <div class="circle" id="green" v-bind:style="{'top': Math.trunc(f[1]*100/660) + '%', 'left': Math.trunc(f[0]*100/660) + '%'}"></div>
                </span>
            </div>
   `,
    data: function () {
        return{
            h3: HOME_3,
            f3: FIN_3
        }
    }
});

Vue.component('home-4',{
    template:`
            <div>
                <span v-for="h in h4">
                    <div class="circle" id="yellow" v-bind:style="{'top': Math.trunc(h[1]*100/660) + '%', 'left': Math.trunc(h[0]*100/660) + '%'}"></div>
                </span>
                <span v-for="f in f4">
                    <div class="circle" id="yellow" v-bind:style="{'top': Math.trunc(f[1]*100/660) + '%', 'left': Math.trunc(f[0]*100/660) + '%'}"></div>
                </span>
            </div>
   `,
    data: function () {
        return{
            h4: HOME_4,
            f4: FIN_4
        }
    }
});