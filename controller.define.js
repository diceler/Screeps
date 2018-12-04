'use strict';

Object.defineProperty(StructureController.prototype, 'signedByMe', {
  configurable: true,
  get: function () {
    return (this.sign && this.sign.username === Memory.USERNAME);
  }
});

Object.defineProperty(StructureController.prototype, 'hasSufficientUpgraders', {
  configurable: true,
  get: function () {
    const upgraders = _.size(this.room.creeps[ROLE_UPGRADER]);

    switch (this.level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 8:
        return 1 >= upgraders;
      case 5:
      case 6:
      case 7:
        return 2 >= upgraders;
      default:
        return false;
    }
  }
});
