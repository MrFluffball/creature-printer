const perfectFrameTime = 1000 / 60;
let lastTimestamp = Date.now(); 

function update(timestamp) {
    var timestamp = Date.now()

    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;

    // game update stuff goes here
    game.creatures.forEach(creature => {
        creature.update(deltaTime)
    })

    if (game.state == State.CREATURE_MENU) {
        creatureView.update()
    }
    if (game.state == State.SHOP_MENU) {
        shopView.update()
    }
}


game.switchState(State.CREATURE_MENU)

setInterval(update,1000/60)
