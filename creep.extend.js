Creep.prototype.loop = function () {
  if (this.spawning) {
    return;
  }

  this.role.tick();
};
