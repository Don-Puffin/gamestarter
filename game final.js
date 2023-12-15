let currentInventory = [];

// Room class definition
class Room {
  constructor(name, requiredItem = null) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._isLocked = false;
    this._linkedWeapon = "";
    this._entryCount = 0;
    this._item = "";
    this._roomImage = null;
    this._requiredItem = requiredItem;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  set roomImage(value) {
    this._roomImage = value;
  }

  get roomImage() {
    return this._roomImage;
  }

  get character() {
    return this._character;
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
    if (!(direction in this._linkedRooms)) {
        this._linkedRooms[direction] = roomToLink;
    } else {
        console.error(`The direction ${direction} is already linked in ${this._name}`);
    }
  }
  

getReverseDirection(direction) {
    const reverseDirections = {
        north: "south",
        south: "north",
        east: "west",
        west: "east",
    };
    return reverseDirections[direction] || null;
}
  




getDetails() {
  const entries = Object.entries(this._linkedRooms);
  let details = [];

  for (const [direction, room] of entries) {
    let text = " The " + room._name + " is " + direction;
    details.push(text);
  }

  // If the user has the Language Tome and the current room is the "castle gate",
  // and the "north" direction is not already linked, add the "north" direction to the details
  if (hasLanguageTome() && this._name === "castle gate" && !this._linkedRooms["north"]) {
    details.push(" you can now go north and enter the castle.");
    this.linkRoom("north", Hall); // Link "Gate" to "Hall" going north
  }

  // Check if the player has the Sword and the current room is the "Hall"
  if (hasSword() && this._name === "Hall") {
    currentRoom.deleteLinkToSamuraiDeath();
    currentRoom.linkRoom("upstairs", Hallway);
  }


  return details;
}

  // ... (existing code)
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way",);
      alert(this._name)
      return this;
    }
  }

 
    action(interaction) {
      if (interaction in this._linkedRooms) { // Fix the naming conflict here
        return this._linkedRooms[interaction];
      } else {
        alert("Why don't you take the item?");
        return this;
      }
    }
  }

// IMAGES


class Image {
  constructor(src) {
    this._imgElement = new window.Image();
    this._imgElement.src = src;
  }

  get imgElement() {
    return this._imgElement;
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

class Item {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return this._name + ": " + this._description;
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
    return "You have met " + this._name + this._description;
  }

  advice() {
    return "You should " + this._advice 
  }

  converse() {
    return '<br/> They say, ' + '"' + this._conversation + '"';
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

const Samurai = new Character ('some samurai', ', a powerful armoured warrior!', 'guarding the castle gate', false, '"止まれ！誰だ？"' )
Samurai.description = ', powerful armoured warriors'
Samurai.conversation = '止まれ！誰だ？'
Samurai.advice = "You can't understand him. Maybe the time machine has something useful?"
const Concubine = new Character ('a concubine', 'an indentured female servant', "awaiting her master's return", true, "*whisper* I'm not allowed to speak to guests" )
Concubine.conversation = "Guests shouldn't be in here. Tono-sama, my master, is upstairs."
const Daimyo = new Enemy ('The Daimyo' , ' a powerful feudal lord with a dedicated army', false,  )
const Samurai2 = new Enemy ('Samurai', 'a powerful armoured warrior', 'guarding the castle gate', false, '"Who are you?"' )
const Sword = new Item('Sword', "All of the weapons are chained down, but there's one <b>sword</b> on the table.");
const LanguageTome = new Item('Language Tome', 'A device that translates every language directly to your neuralink');
const TeaPot = new Item('tea pot', 'A heavy iron tea pot, that could be useful!');
// const Speak_to_samurai = new Item ('speak')
// Speak_to_samurai.description = 
// let garden_time_machine = document.getElementById("time-machine-image");
// garden_time_machine.setAttribute("src", "timemachine1.jpg");
// const GardenTimeMachine = new Image (garden_time_machine)

// let samurai_gate = document.getElementById("samurai-gate");
// samurai_gate.setAttribute("src", "samurai_gate.jpg")
// const SamuraiGate = new Image (samurai_gate)
const roomImageContainer = document.getElementById("roomImageContainer");
const timeMachineImage = new Image('timemachine1.jpg');
const SamuraiGate = new Image ('samurai_gate.jpg')
const teienImage = new Image ('teien.jpg')
const bathroomImage = new Image ('daimyocrystal.png')
const tearoomImage = new Image ('tearoom.jpg') 
const throneroomImage = new Image ('throneroom.jpg')
const armouryImage = new Image ('katana.png')
const hallImage = new Image ('hall.jpg')
const bedroomImage = new Image ('bedroom.png')
const deathImage  = new Image ('samuraideath.png')
const blockImage = new Image ('block2.png')
const swordImage = new Image ('daimyodeath.png')
const winImage = new Image ('win3.png')
const introImage = new Image ('introimage.png')

//create the indiviual room objects and add their descriptions
const Intro = new Room ('intro')
Intro.description = "You are a time traveller, but you've zip-zapped about too much and overheated your time machine.<br/> The resulting explosion ejected your time crystal and now you're trapped in Edo period Japan. </br><b> It's the year 1620</b>. </br> The time crystal was captured by a Daimyo who believes it will bring him power. <br/> Scans suggest the time crystal is inside a nearby castle. You must <b>retrieve the crystal</b> to get home! <br/><br/> <b> Controls:</b> </br> <b>Move:</b> 'north', 'south', 'east', 'west', 'upstairs'<br/><b>Items:</b> 'Take/Use (item)'<br/><br/>Enter <b>START</b> to begin"
Intro.roomImage = introImage
const Teien= new Room("garden");
Teien.description = "You see a wide and beautiful garden with a white stone path leading to the castle gate.</br> The crystal may be inside!";
Teien.roomImage = teienImage;
const Gate = new Room("castle gate", "Language Tome");
Gate.description = "You arrive at a large wooden gate that it is guarded by samurai.";
Gate.character = Samurai;
Gate.roomImage = SamuraiGate;
// Gate.item = Speak_to_samurai
const Gate2 = new Room("castle gate");
Gate2.description = "that it is heavily guarded.";
Gate2.character = Samurai2
const TimeMachine = new Room("time machine");
TimeMachine.description = "Ah, your time machine! Full of gadgets and gizmos...<br/> It's an incredibly sophisticated ship that's smaller on the inside. <br/> You might want to <b>take</b> something with you ";
TimeMachine.roomImage = timeMachineImage
TimeMachine.item = LanguageTome
const Bedroom = new Room("bedroom");
Bedroom.description = "You enter a luxurious tatami room with a large futon and cushions in the middle";
Bedroom.character = Concubine 
Bedroom.roomImage = bedroomImage
const Hall = new Room("hall", "Language Tome");
Hall.description = "You enter a large room with wooden beams and paper lamps with many doorways. <br/> <b>The door is closed behind you.</b>";
Hall.roomImage = hallImage
const Hallway = new Room("throne room");
Hallway.description = "a Samurai lunges towards you, but you block his attack and defeat him. <br/> Lucky you picked up that sword!";
const TeaRoom = new Room("tea room", "tea pot");
TeaRoom.description = "You see smaller room with a <b>tea pot</b> and chabako that contains tea leaves";
TeaRoom.roomImage = tearoomImage;
TeaRoom.item = TeaPot
const Bathroom = new Room("bathroom");
Bathroom.description = "The bathroom is a small room with a wooden framed hole in the floor. <br/> You see the Daimyo taking a dump, it smells bad! <br/> But wait, there's the time crystal! <br/> Use one of your items to defeat the Daimyo!";
Bathroom.roomImage = bathroomImage
const ThroneRoom = new Room("throne room");
ThroneRoom.description = "You've entered the throne room, a gorgeous room with painted walls, gold trimming and joints. <br/>There's an elevated tatami mat in the centre. <br/> The Daimyo must be around here somewhere!";
ThroneRoom.roomImage = throneroomImage
const SamuraiDeath = new Room("throne room");
SamuraiDeath.description = "<b> GAME OVER </b> <br/> When you arrive upstairs a samurai, protecting his lord, lunges towards you! </br> With one swift motion he draws his sword and simultaneously beheads you! <br/> Without a weapon you couldn't defend yourself... <br/> You have died. <br/> Enter <b>Restart</b> to try again.";
SamuraiDeath.roomImage = deathImage
const Armoury = new Room("armoury", "sword");
Armoury.description = "Ooh, this dark room filled with armour and weaponry must be the armoury!",
Armoury.item = Sword
Armoury.roomImage = armouryImage;
const Teien2 = new Room("teien");
Teien2.description = "a wide garden with a white stone path leading to the castle.";
Teien2.linkRoom("south", TimeMachine);
Teien2.linkRoom("north", Gate2);

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

Bedroom.linkRoom("south", Hall);
Hall.linkRoom("upstairs", SamuraiDeath);
//    cannot go downstairs once upstairs
Hallway.linkRoom("north", ThroneRoom);
ThroneRoom.linkRoom("west", Bathroom)

// Teien2.linkRoom("south", TimeMachine);
// Teien2.linkRoom("north", Gate2);
// Gate2.linkRoom("north", Hall)

// Armoury._linkedWeapon(hasSword = true);





function hasLanguageTome() {
  return currentInventory.includes(LanguageTome);
}

function hasSword() {
  return currentInventory.includes(Sword);
}

// alfie - another array underneath called 'valid items', array of objects that has a sring for item name and another string that says where the item is located. If it's not N/S/E/W we do another chekck, start with word 'tale' split into two, 


function hasItem(item) {
  return currentInventory.includes(item);
}

// Usage
if (hasItem(LanguageTome) && room.name === "castle gate" && !Room._linkedRooms["north"]) {
  linkRoomToHall(room);
}

function displayRoomInfo(room) {
  let occupantMsg = "";
  // Reset ItemDescription to an empty string
  document.getElementById("interaction").innerHTML = "";

  if (room.character === "") {
    occupantMsg = "";
  } else {
    occupantMsg = room.character.describe() + ". " + room.character.converse();
  }

  if (room._item instanceof Item) {
    ItemDescription = room._item.describe();
    document.getElementById("interaction").innerHTML = ItemDescription;
  } else if (room === TimeMachine && currentInventory.includes(LanguageTome)) {
    ItemDescription = LanguageTome.describe();
    document.getElementById("interaction").innerHTML = ItemDescription;
  }


  let imageTag = "";
  if (room.roomImage) {
    // Set a fixed size for the image
    const imageSize = "width: 576px; height: auto;"; // Adjust the values as needed
  
    imageTag = `<img src='${room.roomImage.imgElement.src}' alt='Room Image' style='${imageSize} margin: 0 auto' >`;
  }

  if (roomImageContainer) {
    roomImageContainer.innerHTML = imageTag;
  } else {
    console.error("roomImageContainer not found in the HTML");
  } if (room.name === "hallway" && !hasSword)  {
    linkRoomToHall 
  }

  

  roomImageContainer.innerHTML = imageTag;
  textContent =
    "<p>" +
    room.description +
    "</p>" +
    "<p>" +
    occupantMsg +
    "</p>" +
    "<p>" +
    room.getDetails() +
    "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

function linkRoomToHall(room) {
  if (room.name === "castle gate" && !room._linkedRooms["north"]) {
    room.linkRoom("north", Hall);
    alert("You can now move north to the Hall from the Gate!");
  }
}

  

 




function handleInteraction(command, room) {
  const parts = command.split(" ");
  const action = parts[0].toLowerCase();
  const itemName = parts.slice(1).join(" ").toLowerCase();

  if (action === "take") {
    const item = room._item;
  
    if (item && item.name.toLowerCase() === itemName.toLowerCase()) {
      // Check if the required item matches and set it in the inventory
      if (
        (room.name === "time machine" && itemName === "language tome") ||
        (room.name === "armoury" && itemName === "sword") ||
        (room.name === "tea room" && itemName === "tea pot")
      ) {
        currentInventory.push(item);
        alert(`You took the ${item.name}!`);
        room._item = null;

        if (room.name === "armoury" && itemName === "sword") {
          // Update the description of SamuraiDeath when the player takes the Sword
          SamuraiDeath.description = " When you arrive upstairs a samurai, protecting his lord, lunges towards you! <br/> You manage to block his attack and defeat him! <br/> Lucky you found that <b>sword</b>! ";
          SamuraiDeath.roomImage = blockImage;
          
          // Link SamuraiDeath to Throneroom
          SamuraiDeath.linkRoom("south", ThroneRoom);
        }
        if (room.name === "time machine" && itemName === "language tome") {
          // Update the description of SamuraiDeath when the player takes the Sword
          Samurai.conversation = "You must be the monk we've been expecting...Your clothes are strange, though...";
        }
      if (itemName === "tea pot") {
        room.description =
          "Surprisingly, the tea pot was cold. <br/> You stuff it in  your bag.";
      }

     if (itemName === "sword") {
      room.description =
        "You lift the sword, it's a katana! <br/> You've never used one before, <br/> but attach it to your belt.";
     }
        if (itemName === "language tome") {
          // Update the room description first
          room.description =
            "Ah, your time machine! Full of gadgets and gizmos...<br/> It's an incredibly sophisticated ship that's smaller on the inside. <br/> You took the Language Tome, <b>now you can speak Japanese!</b>";
        }
          if (room === TimeMachine) {
            // Call the function to update room links for the current room
            linkRoomToHall(room);
          }
        
        
         

        displayRoomInfo(room);
      } else {
        alert(`There is no ${itemName} in this room.`);
      }
    } else {
      alert(`You don't see a ${itemName} in this room.`);
    }
  } else if (action === "talk" && room.character) {
    alert(`You talk to ${room.character.name}: ${room.character.converse()}`);
  } else if (action === "use" && room.name.toLowerCase() === "bathroom") {
    switch (itemName) {
      case "sword":
        Bathroom.description = "<b> GAME OVER </b> <br/>You rush the pooing Daimyo with your sword!<br/> He is faster than you, and thrusts his sword through your chest! <br/> You have died! <br/> Enter <b>Restart</b> to try again! ";
        Bathroom.roomImage = swordImage;
        break;
      case "language tome":
        Bathroom.description = "<b> GAME OVER </b> <br/>You fumble with your language tome<br/> The Daimyo hears you, and thrusts his sword through your chest! <br/> You have died! <br/> Enter <b>Restart</b> to try again! ";
        Bathroom.roomImage = swordImage;
        break;
      case "tea pot":
        Bathroom.description = " You thwack the pooing Daimyo over the head with the tea pot! <br/> He didn't see that one coming! <br/> You grab the time crystal!<br/> <b>YOU WIN!</b> <br/> Enter <b>Restart</b> to play again!";
        Bathroom.roomImage = winImage;
        break;
      default:
        alert(`You can't use ${itemName} in this room.`);
        break;
    }
  } else {
    alert(`You ${action} ${itemName}.`);
  }
  displayRoomInfo(room);
}



function startGame() {
  // set and display start room
  currentRoom = Intro;
  displayRoomInfo(currentRoom);

  // handle commands
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value.toLowerCase().trim();

      if (command === "restart") {
        // Reload the page to start the game fresh
        location.reload();
      } else if (command === "start") {
        // Reset the game state
        currentInventory = [];
        currentRoom = Teien;
        displayRoomInfo(currentRoom);
        // Clear the text box
        document.getElementById("usertext").value = "";
      } else {
        const directions = ["north", "south", "east", "west", "upstairs"];
        const interaction = ["talk to", "take sword", "take language tome", "pickpocket crystal", "take tea pot", "use tea pot", "use language tome", "use sword"];

        if (directions.includes(command)) {
          currentRoom = currentRoom.move(command);
          displayRoomInfo(currentRoom);
          // Clear the text box
          document.getElementById("usertext").value = "";
        } else {
          document.getElementById("usertext").value = "";

          let validCommandFound = false;

          // Check for interactions
          interaction.forEach(interactionCommand => {
            const normalizedInteraction = interactionCommand.toLowerCase().trim();
            if (command.startsWith(normalizedInteraction)) {
              handleInteraction(command, currentRoom);
              validCommandFound = true;
            }
          });

          if (!validCommandFound) {
            // Check for other conditions like needing the Language Tome
            if (currentRoom === Gate && command === "take language tome") {
              handleInteraction(command, currentRoom);
            } else {
              alert("That is not a valid command. Please try again.");
            }
          }
        }
      }
    }
  });
}

startGame();