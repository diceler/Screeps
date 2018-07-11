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
  const {pos} = this;
  const lookForAt = [pos];
  const found = [];

  for (let i = 1; i < range; i++) {
    const west = pos.x - i;
    const east = pos.x + 1;
    lookForAt.push(new RoomPosition(west, pos.y, pos.roomName));
    lookForAt.push(new RoomPosition(east, pos.y, pos.roomName));

    for (let j = 1; j < range; j++) {
      lookForAt.push(new RoomPosition(west, pos.y + 1, pos.roomName));
      lookForAt.push(new RoomPosition(west, pos.y + 1, pos.roomName));
      lookForAt.push(new RoomPosition(east, pos.y - 1, pos.roomName));
      lookForAt.push(new RoomPosition(east, pos.y - 1, pos.roomName));
    }
  }

  _.forEach(lookForAt, tile => {
    found.concat(tile.lookFor(type));
    new RoomVisual(pos.roomName).rect(tile.x - .5, tile.y - .5, 1, 1, {fill: '#98FB98', opacity: .2});
  });

  return found;
};
