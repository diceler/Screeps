/**
 * Harvester
 */
module.exports = {
  tick: function (creep) {

    let constSiteLink = _.find(creep.links, {type: LINK.CONSTRUCTION});

    if (constSiteLink) {
      build(creep, constSiteLink);
    } else {
      if (creep.isFull) {
        if (_.some(creep.links, {type: LINK.STORAGE})) {
          deliver(creep);
        } else {
          findStorage(creep);
        }
      }
      else {
        harvest(creep);
      }
    }
  }
};

function build(creep, link) {
  let constSite = Game.getObjectById(link.id);

  if (creep.memory.building && creep.isEmpty) {
    creep.memory.building = false;
  }

  if (!creep.memory.building && creep.isFull) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    creep.build(constSite);
  } else {
    harvest(creep);
  }
}

function harvest(creep) {
  let source = Game.getObjectById(_.find(creep.links, {type: LINK.HARVESTER}).id);

  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}

function deliver(creep) {
  let storage = Game.getObjectById(_.find(creep.links, {type: LINK.STORAGE}).id);
  let actionResult = creep.transfer(storage, RESOURCE_ENERGY);

  switch (actionResult) {
    case ERR_NOT_IN_RANGE:
      creep.moveTo(storage);
      break;
    case ERR_FULL:
    case OK:
      creep.unlink(storage);
      break;
  }
}

function findStorage(creep) {
  let source = Game.getObjectById(_.find(creep.links, {type: LINK.HARVESTER}).id);

  if (_.some(source.links, {type: LINK.STORAGE})) {

    creep.linkTo(Game.getObjectById(_.find(source.links, {type: LINK.STORAGE}).id));

  } else {
    if (_.some(source.links, {type: LINK.CONSTRUCTION})) {

      creep.linkTo(Game.getObjectById(_.find(source.links, {type: LINK.CONSTRUCTION}).id), LINK.CONSTRUCTION);
      let flag = _.find(source.links, {type: LINK.CONSTRUCTION_OBSERVER});
      creep.linkTo(Game.flags[flag.data.flagName], LINK.CONSTRUCTION_OBSERVER, flag.data);

    } else if (!_.some(creep.pos.lookFor(LOOK_FLAGS))) {

      let flagName = creep.pos.createFlag(null, COLOR_YELLOW, COLOR_WHITE);
      let flag = Game.flags[flagName];
      flag.linkTo(creep, LINK.CONSTRUCTION_OBSERVER);
      flag.linkTo(source, LINK.CONSTRUCTION_OBSERVER);

    }
  }
}
