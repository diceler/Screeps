'use strict';

ConstructionSite.prototype.loop = function () {
  // If nothing has happened to the constructionSite for 500 ticks or more, delete it.
  const tooLongWithoutInteraction = (Game.time - this.created) > NO_INTERACTION_TICK_LIMIT || this.ticksSinceProgress > NO_INTERACTION_TICK_LIMIT;

  if (tooLongWithoutInteraction) {
    if (this.remove() === OK) {
      return;
    }

    console.log('ERR', `Attempted to delete ${this.structureType}|${this.id} in ${this.room.name} but it belongs to ${this.owner}`);
  }
};

ConstructionSite.prototype.updateProgressTime = function () {
  this.memory.lastProgressTime = Game.time;
};
