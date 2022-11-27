class HatchView {
    constructor() {
        this.build = function() {
            // only build if we have anything to show the user
            if (game.hatched.length > 0) {
                console.log("built")
                let popup = document.createElement('div')
                popup.className = "popup"

                let alphamask = document.createElement('div')
                alphamask.className = "mask"

                document.body.appendChild(alphamask)
            }
        }

        // shouldn't be called in the state machine, instead call on close
        this.destroy = function() {

        }
    }
}

let hatchView = new HatchView()