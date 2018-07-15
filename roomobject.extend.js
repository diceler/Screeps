RoomObject.prototype.placeRequest = function (request) {
  let requestType = Memory.requests[request.type];
  const {type, objectId} = request;

  if (!_.find(requestType, {type, objectId})) {
    requestType.push(request);
  }
};

RoomObject.prototype.deleteMyRequests = function () {
  _.forEach(Object.keys(Memory.requests), type => {
    Memory.requests[type] = _.remove(Memory.requests[type], {objectId: this.id});
  });
};

RoomObject.prototype.linkTo = function (target, type, data) {
  if (!target) {
    return ERR_INVALID_TARGET;
  }

  // Are we already linked?
  if (_.find(this.links, {id: target.id})) {
    return OK;
  }

  // Is target linkable?
  if (!target.links) {
    return ERR_INVALID_ARGS;
  }

  // Link target to me
  this.links = {type, id: target.id, data};
  // Link me to target
  target.links = {type, id: this.id, data};

  return OK;
};

RoomObject.prototype.unlink = function (target) {
  if (!target) {
    return ERR_INVALID_TARGET;
  }

  if (!_.find(this.links, {id: target.id})) {
    return ERR_NOT_FOUND;
  }

  // Is target linkable?
  if (!target.links) {
    return ERR_INVALID_ARGS;
  }

  // Unlink target from me
  this.memory.links = _.reject(this.links, {id: target.id});
  // Unlink me from target
  target.memory.links = _.reject(target.links, {id: this.id});

  return OK;
};

RoomObject.prototype.unlinkAll = function () {
  const clonedLinks = _.clone(this.links);

  _.forEach(clonedLinks, link => {
    const linkedTarget = Game.getObjectById(link.id);

    if (linkedTarget) {
      this.unlink(linkedTarget);
    }
  }, this);
};

RoomObject.prototype.pruneLink = function (linkId) {
  if (!linkId) {
    return ERR_INVALID_ARGS;
  }

  this.links = _.reject(this.links, {id: linkId});

  return OK;
};
