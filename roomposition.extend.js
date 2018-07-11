RoomPosition.prototype.findNearby = function (type, options) {
  return this.findInRange(type, 1, options);
};

/**
 * Is current position same as the target position.
 * @param position
 * @returns {boolean}
 */
RoomPosition.prototype.sameAs = function (position) {
  let target = position;

  if (!(target instanceof RoomPosition)) {
    target = target.pos;
  }

  return this.x === target.x && this.y === target.y;
};

RoomPosition.prototype.lookForInRange = function (type, range) {
  range = range + 1; // Zero based. Increase by 1 to avoid mismatch.
  let pos = this;
  let lookForAt = [];
  let found = [];

  for (let i = 0; i < range; i++) {
    const west = pos.x - i;
    const east = pos.x + i;
    lookForAt.push(new RoomPosition(west, pos.y, pos.roomName));

    // Avoid multiple center pos being processed.
    if (i > 0)  {
      lookForAt.push(new RoomPosition(east, pos.y, pos.roomName));
    }

    for (let j = 1; j < range; j++) {
      lookForAt.push(new RoomPosition(west, pos.y + j, pos.roomName));
      lookForAt.push(new RoomPosition(west, pos.y - j, pos.roomName));

      // Avoid multiple center pos being processed.
      if (i > 0) {
        lookForAt.push(new RoomPosition(east, pos.y + j, pos.roomName));
        lookForAt.push(new RoomPosition(east, pos.y - j, pos.roomName));
      }
    }
  }

  _.forEach(lookForAt, tile => {
    found.concat(new RoomPosition(tile.x, tile.y, tile.roomName).lookFor(type));
  });

  return found;
};
