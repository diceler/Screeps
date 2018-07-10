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
  let deposit;
  let linkedDeposit = _.find(creep.links, {type: LINK.DEPOSIT});

  if (linkedDeposit) {
    deposit = Game.getObjectById(linkedDeposit.id);
    const actionResult = creep.transfer(deposit, RESOURCE_ENERGY);

    switch (actionResult) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(deposit);
        break;
      case ERR_FULL:
      case OK:
        creep.unlink(deposit);
        break;
    }
  } else {
    const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => !structure.isFull && !structure.isWithdrawOnly});

    if (_.size(deposits)) {
      deposit = _.first(deposits);

      if (creep.linkTo(deposit, LINK.DEPOSIT) === OK) {
        if (creep.transfer(deposit, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(deposit);
        }
      }
    }
  }
}
