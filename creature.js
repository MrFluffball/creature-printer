const Age = {
    baby: "baby",
    adolescent: "adolescent",
    mature: "mature"
}

class Creature {
    constructor() {
        this.type = null
        this.name = null
        this.age = Age.baby
        this.ageTimer = 3000
        this.lastUpdate = Date.now()

        this.timer = {hp:0,hunger:0,mood:0}

        this.hp = 1
        this.hunger = 1
        this.mood = 1

        this.nextAge = function() {
            switch (this.age) {
                case Age.baby:
                    this.ageTimer = 3000
                    return this.age = Age.adolescent
                case Age.adolescent:
                    this.ageTimer = 3000
                    return this.age = Age.mature
            }
        }

        this.update = function() {
            let msPassed = Date.now() - this.lastUpdate
            this.ageTimer -= msPassed
            // stat timers
            this.timer.hunger += msPassed

            this.lastUpdate = Date.now()

            if (this.ageTimer <= 0 && this.age != Age.mature) {
                this.nextAge()
                console.log("switched age to " + this.age)
            }

            if (this.timer.hunger >= 3000) {
                this.hunger -= 0.1
                this.timer.hunger = 0
            }
        }
    }
}