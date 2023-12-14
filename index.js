// Time traveller is trapped in feudal Japan (Edo Jidai). He has lost his Language Tome that helps him communicate, and his time crystal. He must retrieve them.
// Base HP will be 1000

class Entity {
    constructor(name, description, location, friendly, dialogue) {
        this._name = name 
        this._description = description
        this._location = location
        this._friendly = friendly
        this._dialogue = dialogue
    }
    describe() {
        return  `That's a ${this._name},  ${this._description}.`
    }
    talk() {
        return `${this._dialogue}`
    }
}

class Enemy extends Entity {
    constructor (name, description, location, friendly, dialogue, attackDamage,) {
        super(name, description, location, friendly)
        this._dialogue = dialogue
        this._attackDamage = attackDamage
       
    }
 

    describe() {
        return  `That's a ${this._name}, ${this._description}. They appear to be ${this._location}. They are ${this._friendly ? 'friendly' : 'not friendly'}!`
    }
    damagereading() {
        return `If the ${this._name} strikes me I'll lose ${this._attackDamage} HP.`
    }
    attack() {
        return `You attack the ${this._name}!`
    }

}

const Samurai = new Enemy ('Samurai', 'a powerful armoured warrior', 'guarding the castle gate', false, '"止まれ！誰だ？"','200', )

console.log(Samurai.talk())
console.log(Samurai.describe())
console.log(Samurai.damagereading())
console.log(Samurai.attack())



class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    /**
     * a method to produce friendly room description
     * 
     * @returns {string} description of the room
     * @author Neil Bizzell
     * @version 1.0
     */
    describe() {
      return "Looking around the " + this._name + " you can see " + this._description;
    }
  
    /**
    * a method to add rooms to link rooms to this one
    * it does this by adding them to _linkedRooms
    * 
    * @param {string} direction the direction the other rooom is from this one
    * @param {object} roomToLink the room that is in that direction
    * @author Neil Bizzell
    * @version 1.0
    */
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    /**
     * a method to produce friendly description of linked rooms
     * 
     * @returns {array} descriptions of what rooms are in which direction
     * @author Neil Bizzell
     * @version 1.0
     */
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is to the " + direction;
        details.push(text);
      }
      return details;
    }
  
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        alert(this._name)
        return this;
      }
    }
  }
  

class Item {
    constructor(name) {
      this._name = name,
        this._description = ""
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._name = value;
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
    describe() {
        return "The " + this._name + " is " + this._description;
      }
}


