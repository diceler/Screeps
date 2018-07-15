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
  // LINK.HARVESTER should always exist at this point.
  // If not, something went wrong in the request.
  const linkedSource = Game.getObjectById(_.find(creep.links, {type: LINK.HARVESTER}).id);

  if (creep.harvest(linkedSource) === ERR_NOT_IN_RANGE) {
    creep.moveTo(linkedSource);
  }
}

function deliver(creep) {
  let storage;
  const linkedStorage = _.find(creep.links, {type: LINK.STORAGE});

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
        // delete creep.memory.ticksOnHold;
        break;
    }
  } else {

    const linkedSource = Game.getObjectById(_.find(creep.links, {type: LINK.HARVESTER}).id);
    const linkedSourceStorage = _.find(linkedSource.links, {type: LINK.STORAGE});

    if (!linkedSourceStorage) {
      console.log('No linked storage to source found');
      const flagsFound = creep.pos.lookFor(LOOK_FLAGS);

      if (!_.size(flagsFound)) {
        console.log('No flags found');
        creep.pos.createFlag(_.uniqueId('Flag'), COLOR_YELLOW, COLOR_WHITE);
      }
    }


    // if (linkedSourceStorage) {
    //
    //   if (!linkedSourceStorage.data.isConstructionSite) {
    //     const storage = Game.getObjectById(linkedSourceStorage.id);
    //
    //     // #TODO: Implement safegaurd that deletes the dead-end link.
    //
    //     if (creep.linkTo(storage, LINK.STORAGE) === OK) {
    //       if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //         creep.moveTo(storage);
    //       }
    //     }
    //   }
    //
    // }

    //   if (!creep.memory.ticksOnHold || creep.memory.ticksOnHold === 0) {
    //     const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => !structure.isFull && !structure.isWithdrawOnly});
    //
    //     if (_.size(deposits)) {
    //       storage = _.first(deposits);
    //
    //       if (creep.linkTo(storage, LINK.STORAGE) === OK) {
    //         if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //           creep.moveTo(storage);
    //         }
    //       }
    //     } else {
    //       creep.memory.ticksOnHold = 5;
    //     }
    //   } else {
    //     --creep.memory.ticksOnHold;
    //   }
    // }
  }
}
