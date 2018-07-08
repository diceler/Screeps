/**
 * Harvester
 * @type {{tick: module.export.tick}}
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
  let source;
  let linkedSource = _.find(creep.links, {type: LINK.HARVESTER});

  if (linkedSource) {

    source = Game.getObjectById(linkedSource.id);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }

  } else {

    const availableSources = creep.room.find(FIND_SOURCES, {filter: source => !source.isAtFullCapacity});

    // No available sources. Kill creep to save resources.
    if (!_.size(availableSources)) {
      // TODO: Find better alternative.
      creep.suicide();
      return;
    }

    source = _.first(availableSources);

    if (creep.linkTo(source, LINK.HARVESTER) === OK) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }

  }

}

function deliver(creep) {
  let depot;
  let linkedDepot = _.find(creep.links, {type: LINK.DEPOT});

  if (linkedDepot) {

    depot = Game.getObjectById(linkedDepot.id);
    const actionResult = creep.transfer(depot, RESOURCE_ENERGY);

    switch (actionResult) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(depot);
        break;
      case ERR_FULL:
      case OK:
        creep.unlink(depot);
        break;
    }

  } else {

    const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => !structure.isFull && !structure.isWithdrawOnly});

    if (_.size(deposits)) {

      depot = _.first(deposits);

      if (creep.linkTo(depot, LINK.DEPOT) === OK) {
        if (creep.transfer(depot, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(depot);
        }
      }

    }

  }

}
