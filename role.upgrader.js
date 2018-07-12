/**
 * Upgrader
 */
module.exports = {
  tick: function (creep) {
    if (creep.memory.upgrading && creep.isEmpty) {
      creep.memory.upgrading = false;
    }

    if (!creep.memory.upgrading && creep.isFull) {
      creep.memory.upgrading = true;
    }

    if (creep.memory.upgrading) {
      upgrade(creep);
    } else {
      recharge(creep);
    }
  }
};

function recharge(creep) {
  // let storage;
  // let linkedStorage = _.find(creep.links, {type: LINK.STORAGE});
  //
  // if (linkedStorage) {
  //   storage = Game.getObjectById(linkedStorage.id);
  //   const actionResult = creep.withdraw(storage, RESOURCE_ENERGY);
  //
  //   switch (actionResult) {
  //     case ERR_NOT_IN_RANGE:
  //       creep.moveTo(storage);
  //       break;
  //     case ERR_NOT_ENOUGH_ENERGY:
  //     case OK:
  //       creep.unlink(storage);
  //       break;
  //   }
  // } else {
  //   const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => structure.storesEnergy && !structure.isEmpty});
  //
  //   if (_.size(deposits)) {
  //     storage = _.first(deposits);
  //
  //     if (creep.linkTo(storage, LINK.STORAGE) === OK) {
  //       if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
  //         creep.moveTo(storage);
  //       }
  //     }
  //   }
  // }

  let linkedSource = _.find(creep.links, {type: LINK.HARVESTER});

  if (linkedSource) {
    const source = Game.getObjectById(linkedSource.id);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    let source;

    _.some(creep.room.sources, sourceId => {
      source = Game.getObjectById(sourceId);
      return !source.isAtFullCapacity;
    });

    if (source) {
      if (creep.linkTo(source, LINK.HARVESTER) === OK) {
        if (creep.harvest === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    } else {
      console.log(`${creep.name} can't recharge. All sources are at full capacity!`);
    }
  }
}

function upgrade(creep) {
  if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }
}
