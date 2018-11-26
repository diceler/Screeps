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

Object.defineProperty(RoomObject.prototype, 'requests', {
  configurable: true,
  get: function () {
    function add(type, targetId, data) {
      if (!_.find(Memory.requests, {type, targetId})) {
        Memory.requests.push({
          type,
          targetId,
          data
        });

        return OK;
      }

      return ERR_NAME_EXISTS;
    }

    function remove(predicate) {
      const requests = _.clone(Memory.requests);
      const remainingRequests = _.remove(requests, predicate);

      if (_.size(remainingRequests) === _.size(requests)) {
        return ERR_NOT_FOUND;
      }

      Memory.requests = remainingRequests;
      return OK;
    }

    function next() {
      return Memory.requests.shift();
    }

    function all() {
      return Memory.requests;
    }

    function flush() {
      Memory.requests = [];

      return OK;
    }

    return {
      add,
      remove,
      next,
      all,
      flush
    }
  }
});
