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

})
