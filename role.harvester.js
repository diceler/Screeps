/**
 * Harvester
 */
module.exports = {
  tick: function (creep) {
    const constructionLink = _.find(creep.links, {type: LINK.CONSTRUCTION});

    if (constructionLink) {
      build(creep, constructionLink);
    } else {
      if (creep.isFull) {
        deliver(creep);
      } else {
        harvest(creep);
      }
    }

    // let isEmpty = false;
    // const constructionLink = _.find(creep.links, {type: LINK.CONSTRUCTION});
    //
    // if (constructionLink) {
    //   const constructionSite = Game.getObjectById(constructionLink.id);
    //
    //   if (constructionSite) {
    //     if (creep.memory.building && creep.isEmpty) {
    //       creep.memory.building = false;
    //     }
    //
    //     if (!creep.memory.building && creep.isFull) {
    //       creep.memory.building = true;
    //     }
    //
    //     if (creep.memory.building) {
    //       creep.build(constructionSite)
    //     } else {
    //       isEmpty = true;
    //     }
    //   } else {
    //     const container = _.find(creep.pos.lookFor(LOOK_STRUCTURES), {structureType: STRUCTURE_CONTAINER});
    //
    //     if (container) {
    //       creep.linkTo(container, LINK.STORAGE);
    //     } else {
    //       deliver(creep);
    //     }
    //   }
    // } else {
    //   if (creep.isFull) {
    //     deliver(creep);
    //   } else {
    //     isEmpty = true;
    //   }
    // }
    //
    // if (isEmpty) {
    //   harvest(creep);
    // }
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
  const linkedStorage = _.find(creep.links, {type: LINK.STORAGE});

  if (linkedStorage) {
    let storage = Game.getObjectById(linkedStorage.id);
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
      if (_.some(linkedSource.links, {type: LINK.CONSTRUCTION})) {
        const flag = _.find(linkedSource.links, {type: LINK.CONSTRUCTION_OBSERVER});
        const constructionSite = _.find(linkedSource.links, {type: LINK.CONSTRUCTION});

        creep.linkTo(flag, LINK.CONSTRUCTION_OBSERVER);
        creep.linkTo(constructionSite, LINK.CONSTRUCTION);
      } else {
        if (!_.some(creep.links, {type: LINK.CONSTRUCTION_OBSERVER})) {
          const foundFlags = creep.pos.lookFor(LOOK_FLAGS);

          if (!_.size(foundFlags)) {
            creep.pos.createFlag(null, COLOR_YELLOW, COLOR_WHITE);
          } else {
            const containerFlag = _.first(foundFlags);
            creep.linkTo(containerFlag, LINK.CONSTRUCTION_OBSERVER);
            linkedSource.linkTo(containerFlag, LINK.CONSTRUCTION_OBSERVER);
          }
        }
      }

      // const linkedSourceConstruction = _.find(linkedSource.links, {type: LINK.CONSTRUCTION});
      //
      // if (linkedSourceConstruction) {
      //   const constructionSite = Game.getObjectById(linkedSourceConstruction.id);
      //   creep.linkTo(constructionSite, LINK.CONSTRUCTION);
      // } else {
      //   const constructionSitesFound = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES);
      //
      //   if (!_.size(constructionSitesFound)) {
      //     creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
      //   } else {
      //     const constructionSite = _.first(constructionSitesFound);
      //     creep.linkTo(constructionSite, LINK.CONSTRUCTION);
      //     linkedSource.linkTo(constructionSite, LINK.CONSTRUCTION);
      //   }
      // }
    } else {
      creep.linkTo(linkedSourceStorage, LINK.STORAGE);
    }
  }
}

function build(creep, link) {
  const constructionSite = Game.getObjectById(link.id);

  if (constructionSite) {
    if (creep.memory.building && creep.isEmpty) {
      creep.memory.building = false;
    }

    if (!creep.memory.building && creep.isFull) {
      creep.memory.building = true;
    }

    if (creep.memory.building) {
      creep.build(constructionSite);
    } else {
      harvest(creep);
    }
  } else {
    console.log(`${link.id} couldn't be found. Pruned dead link.`);
    creep.pruneLink(link.id);
  }
}
