class Room {
    constructor(name, hasSword = false) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._isLocked = false;
      this._linkedWeapon = "";
      this._entryCount = 0
      this._item = ""
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

    set item(value) {
        this._item = value;
      
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
  
 
    describe() {
      return "Looking around the " + this._name + " you can see " + this._description;
    }
  

    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  

    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is " + direction;
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
    action (interaction) {
      if (Item in this._linkedItem) {
        return this._linkedItem[interaction]
      } else {
        alert("why don't you take the item?")
        alert(this._Item)
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
      return this._name + this._description;
    }
  }
  
  class Character {
    constructor(name, friendly) {
      this._name = name,
        this._description = ""
      this._conversation = ""
      this._friendly = friendly
      this._advice = ""


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
      this._description = value;
    }
    set advice(value) {
      if (value.length < 4) {
        alert("Advice is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        alert("conversation is too short.");
        return;
      }
      this._conversation = value;
    }
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
    get advice() {
      return this._advice;
    }
  
    get conversation() {
      return this._conversation;
    }
 
    describe() {
      return "You have met " + this._name + ", " + this._description;
    }

    advice() {
      return "You should " + this._advice 
    }

    converse() {
      return " They say " + "'" + this._conversation + "'";
    }
  }
class Enemy extends Character {
    constructor (name, description, conversation, friendly) {
        super(name, description, conversation, friendly)
        
    }
    describe() {
        return  `That's a ${this._name}, ${this._description}. They appear to be ${this._location}. They are ${this._friendly ? 'friendly' : 'not friendly'}`
    }
    attack() {
        return `You attack the ${this._name}!`
    }
}

const Samurai = new Character ('a samurai', 'a powerful armoured warrior', 'guarding the castle gate', false, '"止まれ！誰だ？"' )
Samurai.description = 'a powerful armoured warrior'
Samurai.conversation = '止まれ！誰だ？'
Samurai.advice = "You can't understand him. Maybe the time machine has something useful?"
const Concubine = new Character ('a concubine', 'an indentured female servant', "awaiting her master's return", true, "*whisper* I'm not allowed to speak to guests" )
const Daimyo = new Enemy ('The Daimyo' , ' a powerful feudal lord with a dedicated army', false,  )
const Samurai2 = new Enemy ('Samurai', 'a powerful armoured warrior', 'guarding the castle gate', false, '"Who are you?"' )
const Sword = new Item ('sword')
Sword.description = "All of the weapons are chained down, but there's one <b>sword</b> on the table. You take it."
const LanguageTome = new Item ('Language Tome')
LanguageTome.name = "Language Tome"
LanguageTome.description = "A device that translates every language directly to your neuralink"
// const Speak_to_samurai = new Item ('speak')
// Speak_to_samurai.description = 


  //create the indiviual room objects and add their descriptions
  const Teien= new Room("teien");
  Teien.description = "a wide garden with a white stone path leading to the castle.";
  const Gate = new Room("castle gate");
  Gate.description = "that it is guarded by a samurai.";
  Gate.character = Samurai
  // Gate.item = Speak_to_samurai
  const Gate2 = new Room("castle gate");
  Gate2.description = "that it is heavily guarded.";
  Gate2.character = Samurai2
  const TimeMachine = new Room("time machine");
  TimeMachine.description = "lots of gadgets and gizmos. It's an incredibly sophisticated ship that's smaller on the inside";
  TimeMachine.item = LanguageTome
  const Bedroom = new Room("bedroom");
  Bedroom.description = "a luxurious tatami room with a large futon and cushions in the middle";
  const Hall = new Room("hall");
  Hall.description = "a large room with wooden beams and paper lamps with many doorways. The door is closed behind you.";
  const TeaRoom = new Room("tea room");
  TeaRoom.description = "a smaller room with a tea pot and chabako that contains tea";
  const Bathroom = new Room("bathroom");
  Bathroom.description = "a small room with a wooden framed hole in the floor. It smells bad!";
  const ThroneRoom = new Room("throne room");
  ThroneRoom.description = "a gorgeous room with painted walls, gold trimming and joints. There's an elevated tatami mat in the centre";
  const Armoury = new Room("armoury");
  Armoury.description = "a dark room filled with armour and weaponry", true;
  Armoury.item = Sword
  
  //link the rooms together
  Teien.linkRoom("south", TimeMachine);
  Teien.linkRoom("north", Gate);
  TimeMachine.linkRoom("north", Teien);
  Gate.linkRoom("south", Teien);
  
//   not able to return here after entering the castle
  Hall.linkRoom("north", Bedroom);
  Hall.linkRoom("west", TeaRoom);
  Hall.linkRoom("east", Armoury);
  TeaRoom.linkRoom("east", Hall);
  Armoury.linkRoom("west", Hall);
  
  Bedroom.linkRoom("north", Hall);
  Hall.linkRoom("upstairs", ThroneRoom);
//    cannot go downstairs once upstairs
  ThroneRoom.linkRoom("north", Bathroom);
  Bathroom.linkRoom("south", ThroneRoom);
  
  // Armoury._linkedWeapon(hasSword = true);

  let hasSword = false 
  
   function displayRoomInfo(room) {
    let occupantMsg = ""
    let ItemDescription = ""
    if (room.character === "") {
      occupantMsg = ""
    } else {
      // if (character.name === "Samurai") {
      //   hasSword = true
      // }
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    } 
    if (room._item === "") {
      ItemDescription = ""
    } else {
      ItemDescription = room._item.describe()
      document.getElementById("interaction").innerHTML = ItemDescription
    }
   
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }
  
  

  function startGame() {
    //set and display start room
    currentRoom = Armoury;
    console.log (currentRoom)
    displayRoomInfo(currentRoom);
    const container =  document.getElementById(container)
    container.classList.add('bg-gray-200')
    container.classList.add('bg-auto')

    //
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west", "go upstairs"]
        const interaction = [ "talk to ", "take sword", "take language tome", "pickpocket crystal", "take tea pot", "take tea pot"]
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          document.getElementById("usertext").value = ""
          displayRoomInfo(currentRoom);
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
         
      }
    });
  }
  startGame();
  
  