'use strict';

Object.defineProperty(RoomObject.prototype, 'links', {
  configurable: true,
  get: function () {
    if (!this._links) {
      this.memory.links = this.memory.links || [];
      this._links = this.memory.links;
    }

    return this._links;
  },
  set: function (value) {
    this.memory.links = this.memory.links || [];

    const isExistingLink = _.find(this.memory.links, {id: value.id || value.name});

    if (!isExistingLink) {
      this.memory.links.push(value);
    }
  }
});
