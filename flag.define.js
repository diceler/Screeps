Object.defineProperty(Flag.prototype, 'type', {
  configurable: true,
  get: function () {
    if (_.isUndefined(this._type)) {
      this._type = FLAG[this.color][this.secondaryColor];
    }

    return this._type;
  }
});
