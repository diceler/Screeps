Spawn.prototype.tick = function () {
  if (this.room.energyAvailable < 200) {
    return;
  }

  const request = getPendingRequest();

  if (!_.isUndefined(request)) {
    this.spawnCreep(request.type, {
      role: request.type,
      linkTo: request.objectId,
    });
  }
};

function getPendingRequest() {
  let pendingRequest;
  const anyPendingRequests = _.some(Object.keys(Memory.requests), requestType => _.size(Memory.requests[requestType]) > 0);

  if (anyPendingRequests) {
    switch (true) {
      case (_.size(Memory.requests[REQUEST.UPGRADER]) > 0):
        pendingRequest = Memory.requests[REQUEST.UPGRADER].shift();
        break;

      case (_.size(Memory.requests[REQUEST.REPAIRER]) > 0):
        pendingRequest = Memory.requests[REQUEST.REPAIRER].shift();
        break;

      case (_.size(Memory.requests[REQUEST.BUILDER]) > 0):
        pendingRequest = Memory.requests[REQUEST.BUILDER].shift();
        break;

      case (_.size(Memory.requests[REQUEST.HARVESTER]) > 0):
        pendingRequest = Memory.requests[REQUEST.HARVESTER].shift();
        break;

      case (_.size(Memory.requests[REQUEST.HAULER]) > 0):
        pendingRequest = Memory.requests[REQUEST.HAULER].shift();
        break;
    }
  }

  return pendingRequest;
}

Spawn.prototype.__spawnCreep = Spawn.prototype.spawnCreep;
Spawn.prototype.spawnCreep = function (role, memory) {
  const body = this.getCreepBody(role);

  if (_.isUndefined(body)) {
    return ERR_NOT_ENOUGH_RESOURCES;
  }

  const name = this.generateCreepName(role);
  return this.__spawnCreep(body, name, memory);
};

Spawn.prototype.getCreepBody = function (role) {
  let rcl = this.room.controller.level;
  let body = this.bodyTypes[role](rcl);

  while (rcl > 0 && !this.canCreateCreep(body)) {
    body = rcl > 0 ? this.bodyTypes[role](--rcl) : undefined;
  }

  return body;
};

Spawn.prototype.canCreateCreep = function (body) {
  return _.sum(_.map(body, bodyPart => BODYPART_COST[bodyPart])) <= this.room.energyAvailable;
};

Spawn.prototype.generateCreepName = function (role) {
  const randomNumber = Math.round(Math.random() * 100);
  const creepName = `${this.room.name}_${role}_${randomNumber}`;

  if (Game.creeps[creepName]) {
    return this.generateCreepName(role);
  }

  return creepName;
};

Spawn.prototype.bodyTypes = {
  [ROLE.UPGRADER]: rcl => {
    switch (rcl) {
      case 1:
        return workerUnitBuild(2, 1, 1);
      case 2:
        return workerUnitBuild(2, 4, 2);
      case 3:
        return workerUnitBuild(4, 6, 2);
      case 4:
        return workerUnitBuild(5, 10, 5);
      default:
        return workerUnitBuild(10, 10, 5);
    }
  },
  [ROLE.BUILDER]: rcl => {
    switch (rcl) {
      case 1:
        return workerUnitBuild(1, 2, 1);
      case 2:
        return workerUnitBuild(2, 4, 2);
      case 3:
        return workerUnitBuild(4, 6, 2);
      default:
        return workerUnitBuild(5, 10, 5);
    }
  },
  [ROLE.HARVESTER]: rcl => {
    switch (rcl) {
      case 1:
      case 2:
        return workerUnitBuild(1, 1, 1);
      default:
        return workerUnitBuild(5, 1, 5);
    }
  },
  [ROLE.HAULER]: rcl => {
    switch (rcl) {
      case 1:
      case 2:
        return workerUnitBuild(0, 4, 2);
      default:
        return workerUnitBuild(0, 8, 8);
    }
  },
};

function workerUnitBuild(workParts, carryParts, moveParts) {
  function addBodyParts(part, amount) {
    let partialBody = [];
    let increment = 0;

    if (amount === 0) {
      return partialBody;
    }

    while (increment < amount) {
      partialBody.push(part);
      increment++;
    }

    return partialBody;
  }

  return addBodyParts(WORK, workParts).concat(addBodyParts(CARRY, carryParts)).concat(addBodyParts(MOVE, moveParts));
}
