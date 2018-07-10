RoomObject.prototype.placeRequest = function (request) {
  let requestType = Memory.requests[request.type];
  const {type, objectId} = request;

  if (!_.find(requestType, {type, objectId})) {
    requestType.push(request);
  }
};

RoomObject.prototype.linkTo = function (target, type) {
  if (!target) {
    return ERR_NOT_FOUND;
  }

  // Are we already linked?
  if (_.find(this.links, {id: target.id})) {
    return OK;
  }

  // Is target linkable?
  if (_.isUndefined(target.links)) {
    return ERR_INVALID_ARGS;
  }

  // Link target to me
  this.links = {type, id: target.id};
  // Link me to target
  target.links = {type, id: this.id};

  return OK;
};

RoomObject.prototype.unlink = function (target) {
  if (!target || !_.find(this.links, {id: target.id})) {
    return ERR_NOT_FOUND;
  }

  // Is target linkable?
  if (_.isUndefined(target.links)) {
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

    if (!_.isUndefined(linkedTarget)) {
      this.unlink(linkedTarget);
    }
  }, this);
};
