class Egg {
    constructor() {
        this.timeleft = Math.floor(Math.random() * 360000000)
    }
}

class EggView {
    constructor() {
        this.build = function() {
            let grid = document.createElement('ul')
            grid.className = "flexgrid"
            grid.id = "egggrid"

            game.eggs.forEach(egg => {
                let container = document.createElement("ul")
                container.className = "col"

                let object = document.createElement('div')
                addSprite(object,"assets/egg.png",125,125)
                object.className = "creature"

                let text = document.createElement('a')
                text.innerText = convertMs(egg.timeleft)

                container.appendChild(object)
                container.appendChild(text)
                grid.appendChild(container)
            })

            document.body.appendChild(grid)
        }

        this.destroy = function() {
            document.getElementById('egggrid').remove()
        }
    }
}

let eggView = new EggView()