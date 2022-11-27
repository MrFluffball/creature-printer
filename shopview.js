// TODO: gray out shit
// need an UPDATE FUNCTION
// very useful
// pls
class ShopView {
    constructor() {
        this.items = []
        this.upgrades = []

        // html counterparts
        this.upgradeObjects = []

        this.newTooltip = function(upgrade,target) {
            let rect = target.getBoundingClientRect()

            let tool = document.createElement('div')
            tool.id = "upgradetool"
            tool.style.position = "absolute"
            tool.style.right = window.innerWidth/2 + "px"
            tool.style.top = rect.y + "px"
            tool.style.zIndex = "999"

            tool.innerHTML += "<h3>"+upgrade.name+"</h3>"
            tool.innerHTML += upgrade.desc + "<br>"
            if (upgrade.timed) tool.innerHTML += "<br><i>This upgrade is timed. After it's used, you have to wait <b>"+convertMs(upgrade.timer)+"</b> to use it again</i><br>"
            tool.innerHTML += "<br> $" + upgrade.price
            tool.innerHTML += "<p style='font-size: 12px; text-align: center; color: gray;'>Click to buy</p>"

            document.body.appendChild(tool)
        }

        this.buy = function(upgrade) {
            // if (upgrade.unbuyable) return

            if (game.money >= upgrade.price) {
                if (!upgrade.timed) {
                    let index = this.upgrades.indexOf(upgrade)
                    // this.upgrades.splice(index,1)
                    // console.log("bought " + this.upgrades[index].name)

                    document.getElementById('upgrade-'+index).remove()
                }

                game.upgrades.push(upgrade)
                game.money -= upgrade.price

                parseUpgrade(upgrade)

                // if (upgrade.timed) upgrade.unbuyable = true
            }
            // rebuild
            // this.destroy()
            // this.build()
        }


        this.build = function() {
            let shopcontainer = document.createElement('div')
            shopcontainer.id = "shopcontainer"

            let sideleft = document.createElement('div')
            sideleft.id = "sideleft"
            sideleft.style.width = "50%"

            let sideright = document.createElement('div')
            sideright.id = "sideright"

            // headers
            let shopheader = document.createElement('h2')
            shopheader.innerText = "Shop"
            sideleft.appendChild(shopheader)

            let upgradeheader = document.createElement('h2')
            upgradeheader.innerText = "Upgrades"
            sideright.appendChild(upgradeheader)

            // main grids
            let itemgrid = document.createElement('div')
            itemgrid.className = "column"
            let upgradegrid = document.createElement('ul')
            upgradegrid.className = "flexgrid"
            upgradegrid.id = "upgradegrid"

            this.items.forEach(item => {
                let object = document.createElement('div')
                addSprite(object,item.img,item.w,item.h)
                object.className = "shopelm"

                itemgrid.appendChild(object)
            })
            this.upgrades.forEach((upgrade,i) => {
                let object = document.createElement('div')
                addSprite(object,upgrade.img,upgrade.w,upgrade.h)
                object.className = "upgradeelm"
                object.id = "upgrade-"+i

                // opacity mask
                let mask = document.createElement('div')
                mask.className = "upgrademask"
                mask.style.display = "none"
                object.appendChild(mask)


                let that = this // save state
                // open tooltip
                object.onmouseenter = function() {
                    that.newTooltip(upgrade,object)
                }
                // close tooltip
                object.onmouseleave = function() {
                    document.getElementById('upgradetool').remove()
                }
                // buy
                object.onclick = function() {
                    that.buy(upgrade)
                }


                upgradegrid.appendChild(object)
                this.upgradeObjects.push(object)
            })

            sideleft.appendChild(itemgrid)
            sideright.appendChild(upgradegrid)
            shopcontainer.appendChild(sideleft)
            shopcontainer.appendChild(sideright)
            document.body.appendChild(shopcontainer)
        }

        this.destroy = function() {
            document.getElementById('shopcontainer').remove()
        }

        this.update = function() {
            let upgrades = document.getElementsByClassName('upgradeelm')

            for (var i=0; i<upgrades.length; i++) {
                if (this.upgrades[i].unlocked) {
                    upgrades[i].style.display = "block"
                } else {
                    upgrades[i].style.display = "none"
                }

                if (this.upgrades[i].price > game.money) {
                    upgrades[i].children[1].style.display = "inline-block"
                }
                if (upgrades[i].timed) {

                }
            }
        }
    }
}
let shopView = new ShopView()

// TODO: fuck i forgot about currency

class Item {
    constructor(name,foodval,desc,price,img,w,h) {
        this.name = name
        this.foodval = foodval
        this.desc = desc
        this.price = price
        this.img = img
        this.w = w
        this.h = h

        // this.unlocked = false
        shopView.items.push(this)
    }
}

class Upgrade {
    constructor(name,desc,price,unlocked,img,w,h) {
        this.name = name
        this.desc = desc
        this.price = price
        this.unlocked = unlocked

        this.img = img
        this.w = w
        this.h = h

        shopView.upgrades.push(this)

        this.setTimedUpgrade = function(timer) {
            this.timed = true
            this.timer = timer
            this.lastupdate = Date.now()
        }
    }
}


// define new items here

let steak = new Item("Steak",0.3,"really good food.",100,"assets/test.png",125,125)

// define new upgrades here

let gamingpc = new Upgrade("Gaming PC",`Truly the computer of all time. Enables godmode.<br><i>\"Inspirational quote\" - me</i>`,0,false,"assets/pc.png",75,75)
let autofeeder = new Upgrade("Autofeeder","Allows you to use the \"Feed All\" button.",100,false,"assets/test.png",75,75)
let autopetter = new Upgrade("Autopetter","Allows you to use the \"Pet All\" button.",100,false,"assets/test.png",75,75)
let eggboost = new Upgrade("Incubator","Egg hatch times are sped up by 2x for <b>24 hours</b>.",100,true,"assets/eggupgrade.png",75,75)
let boost = new Upgrade("Superfood","Fully restores all stats on a creature.",100,true,"assets/boost.png",75,75)


eggboost.setTimedUpgrade(86400000)

function parseUpgrade(upgrade) {
    switch (upgrade) {
        case gamingpc:
            console.log("gamig")
            break
        case autofeeder:

            break
        case autopetter:

            break
        case eggboost:

            break
        case boost:

            break
    }
}
