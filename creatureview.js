// this is a contained dumpster fire
// dont use canvas and dom together
// it works though

class CreatureView {
    constructor() {
        // need to store the values for easing
        this.hp = 0
        this.hunger = 0
        this.mood = 0


        this.drawBar = function(x,y,w,h,padding,progress,color) {
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(x,y,w,h)

            this.ctx.fillStyle = color
            let fillProgress = (w-padding*2)*progress
            if (fillProgress <= 0) fillProgress = 0

            this.ctx.fillRect(x + padding, y + padding, fillProgress,h-padding*2)
        }

        this.update = function() {
            if (this.selected == undefined) return

            this.ctx.clearRect(0,0,this.c.width,this.c.height)

            this.hp -= (this.hp - this.selected.hp)*0.2
            this.hunger -= (this.hunger - this.selected.hunger)*0.2
            this.mood -= (this.mood - this.selected.mood)*0.2

            this.drawBar(this.c.width*0.1, this.c.height*0.3 - 25, this.c.width - this.c.width*0.25, 25, 5, this.hp, "lime")
            this.drawBar(this.c.width*0.1, this.c.height*0.6 - 25, this.c.width - this.c.width*0.25, 25, 5, this.hunger, "orange")
            this.drawBar(this.c.width*0.1, this.c.height*0.9 - 25, this.c.width - this.c.width*0.25, 25, 5, this.mood, "red")
        }


        this.build = function() {
            // main container
            let grid = document.createElement('ul')
            grid.className = "flexgrid"
            grid.id = "creaturegrid"

            // on hover tooltip
            let tooltip = document.createElement('div')
            tooltip.className = "creaturetool"
            tooltip.style.display = "none"
            tooltip.style.overflow = "hidden"
            tooltip.innerHTML += "<canvas id='tooltipcanvas'></canvas>"
            document.body.appendChild(tooltip)

            // canvas setup
            this.c=document.getElementById('tooltipcanvas')
            this.ctx=this.c.getContext('2d')
            this.c.height = 200
            this.c.width = 300
            
            // creature objects
            game.creatures.forEach((creature,index) => {
                // add the creature
                let object = document.createElement('li')
                object.className = "creature"
                addSprite(object,"assets/test.png",125,125)

                let that = this // save state

                // hide / show tooltip
                object.onmouseenter = function() {
                    var rect = object.getBoundingClientRect();
                    var offset = getComputedStyle(object,null).getPropertyValue('border-left-width').substring(0,1) // ew

                    tooltip.style.display = "block"
                    tooltip.style.left = rect.left + "px"
                    tooltip.style.top = rect.top - offset + rect.height + window.scrollY + "px"

                    that.selected = creature
                }
                // hide it
                object.onmouseleave = function() {
                    tooltip.style.display = "none"
                }


                grid.appendChild(object)
            })

            document.body.appendChild(grid)
        }

        this.destroy = function() {
            document.getElementById('creaturegrid').remove()
            document.getElementById('tooltipcanvas').remove()
        }
    }
}

let creatureView = new CreatureView()