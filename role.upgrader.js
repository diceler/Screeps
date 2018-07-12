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
  let deposit;
  let linkedDeposit = _.find(creep.links, {type: LINK.DEPOSIT});

  if (linkedDeposit) {
    deposit = Game.getObjectById(linkedDeposit.id);
    const actionResult = creep.withdraw(deposit, RESOURCE_ENERGY);

    switch (actionResult) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(deposit);
        break;
      case ERR_NOT_ENOUGH_ENERGY:
      case OK:
        creep.unlink(deposit);
        break;
    }
  } else {
    const deposits = creep.room.find(FIND_STRUCTURES, {filter: structure => structure.storesEnergy && !structure.isEmpty});

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

function upgrade(creep) {
  if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }
}
