// main state machine

const State = {
    NONE: {
        onEnter() {},
        onExit() {}
    },
    CREATURE_MENU: {
        onEnter() {
            creatureView.build()
        },
        onExit() {
            creatureView.destroy()
        }
    },
    EGG_MENU: {
        onEnter() {
            eggView.build()
        },
        onExit() {
            eggView.destroy()
        }
    },
    SHOP_MENU:{
        onEnter() {
            shopView.build()
        },
        onExit() {
            shopView.destroy()
        }
    }
    // HATCH_POPUP: {
    //     onEnter() {
    //         hatchView.build()
    //     },
    //     onExit() {
    //     }
    // }
}

// TODO: data storage for creatures
// name, sprites, mutations/evolutions or whatever theyre called
// yeah do it


class Game {
    constructor() {
        this.state = State.NONE
        this.oldState = State.NONE

        this.creatures = [new Creature(),new Creature()]
        this.eggs = [new Egg(), new Egg()]
        this.hatched = []
        this.upgrades = []
        this.food = []
        this.money = 100

        this.lastupdate = Date.now()

        // state machine stuff
        this.switchState = function(state) {
            this.state = state
            this.handleState()
        }
        this.handleState = function() {
            this.oldState.onExit()
            this.state.onEnter()

            this.oldState = this.state // prepare for next switch
        }


        this.hasUpgrade = function(upgrade) {
            this.upgrades.forEach(i => {
                if (i == upgrade) return true
            })
            return false
        }
        this.unlock = function(upgrade) {
            let index = shopView.upgrades.indexOf(upgrade)
            shopView.upgrades[index].unlocked = true
        }
    }
}

let game = new Game() 
