/**
 * Is current position same as the target position.
 * @param position
 * @returns {boolean}
 */
RoomPosition.prototype.sameAs = function (position) {
  if (!(position instanceof RoomPosition)) {
    position = position.pos;
  }

  return this.roomName === position.roomName && this.x === position.x && this.y === position.y;
};
