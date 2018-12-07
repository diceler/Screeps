'use strict';

Structure.prototype.loop = function () {
  if (_.isFunction(this.tick)) {
    this.tick();
  }
};
