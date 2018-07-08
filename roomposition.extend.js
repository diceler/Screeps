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
