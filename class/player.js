const { Food } = require('./food');
const { Room } = require('./room');
const { Item } = require('./item')

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
          console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from the current room into the player's inventory
    // Your code here
    item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    let index = this.currentRoom.items.indexOf(item);
    this.currentRoom.items.splice(index,1)
  }

  dropItem(itemName) {
    // Drops an item the player is holding into their current room
    // Your code here
    item = this.getItemByName(itemName);
    this.currentRoom.items.push(item);
    let index = this.items.indexOf(item);
    this.items.splice(index,1)
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items
    // Your code here
    // if (itemName === Food.name) ;
    let index = this.items.indexOf(itemName);
    if (itemName instanceof Food) {
      this.items.splice(index, 1);
    }
    return this.items;
  }

  getItemByName(name) {
    // Retrieves an item from a player's inventory by item name
    // Your code here
    return this.items.find(item => {
      if (item.name === name) {
       return item;
      }
    });
  }
}

let item = new Item("rock", "just a simple rock");
let room = new Room("Test Room", "A test room");
let player = new Player("player", room);
console.log(item,'---------------');

module.exports = {
  Player
};
