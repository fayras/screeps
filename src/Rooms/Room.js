const Population = require('Creeps.Population');

Room.prototype.getPopulation = function() {
  return new Population(this);
}
