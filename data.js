// name, weight (out of 1000)
const Rarity = {
    common: 400,
    uncommon: 300,
    rare: 200,
    veryrare: 50,
    epic: 30,
    legendary: 15,
    mythic: 5
}

// TODO: way to influence the roll
function roll() {
    let weights = []
    let rarities = Object.keys(Rarity)

    rarities.forEach((rarity,index) => {
        let value = Object.values(Rarity)[index]
        for (var i=0; i<value; i++) {
            weights.push(rarity)
        }
    })
    
    return weights[Math.floor(Math.random() * weights.length)]
}

// console.log(roll())