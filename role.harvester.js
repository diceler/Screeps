/**
 * Harvester
 */
module.exports = {
  tick: function (creep) {
    if (creep.isFull) {
      deliver(creep);
    } else {
      harvest(creep);
    }
  }
};

function harvest(creep) {
  let linkedSource = _.find(creep.links, {type: LINK.HARVESTER});

  if (linkedSource) {
    const source = Game.getObjectById(linkedSource.id);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    console.log(`${creep.name} has no Source target. Something went wrong.`);
    creep.suicide();
  }
}

function deliver(creep) {
  let storage;
  let linkedStorage = _.find(creep.links, {type: LINK.STORAGE});

  if (linkedStorage) {
    storage = Game.getObjectById(linkedStorage.id);
    const actionResult = creep.transfer(storage, RESOURCE_ENERGY);

    switch (actionResult) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(storage);
        break;
      case ERR_FULL:
      case OK:
        creep.unlink(storage);
        delete creep.memory.ticksOnHold;
        break;
    }
  } else {
    if (!creep.memory.ticksOnHold || creep.memory.ticksOnHold === 0) {
      const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => !structure.isFull && !structure.isWithdrawOnly});

      if (_.size(deposits)) {
        storage = _.first(deposits);

        if (creep.linkTo(storage, LINK.STORAGE) === OK) {
          if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
          }
        }
      } else {
        creep.memory.ticksOnHold = 5;
      }
    } else {
      --creep.memory.ticksOnHold;
    }
  }
}
