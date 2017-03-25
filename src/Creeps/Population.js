const CreepFactory = require('Creeps.Factory');

class Population {
  constructor(room) {
    this.room = room;
    this.factory = new CreepFactory(room);
    this.creeps = _.filter(Game.creeps, creep => creep.room.name === room.name);
    this.farmers = _.filter(this.creeps, creep => creep.memory.role === 'farmer');
    this.soldiers = _.filter(this.creeps, creep => creep.memory.role === 'soldier');
    this.merchants = _.filter(this.creeps, creep => creep.memory.role === 'merchant');
    this.fill();
  }

  fill() {
    // prioritize farmers -> soldiers -> merchants
    if(this.farmers.length < Population.ideal.farmers) {
      this.factory.create('farmer');
    } else if(this.soldiers.length < Population.ideal.soldiers) {
      this.factory.create('soldier');
    } else if(this.merchants.length < Population.ideal.merchants) {
      this.factory.create('merchant');
    }
  }
}

Population.ideal = {
  farmers: 6,
  soldiers: 3,
  merchant: 1
}

module.exports = Population
