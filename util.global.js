global.getObjectById = function (id) {
  if (_.isUndefined(id)) {
    console.log('global.getObjectById: id was undefined.');
    return undefined;
  }

  let object = Game.getObjectById(id);

  if (_.isNull(object)) {
    // Assume it's a Flag if null.
    object = Game.flags[id];
  }

  // Return undefined if it's not a Flag either.
  return !_.isUndefined(object) ? object : undefined;
};

global.__mapToGlobal = function (array) {
  if (_.isArray(array)) {
    _.forEach(array, (key) => {
      global[key] = key;
    });
  }

  throw new Error('__mapToGlobal: argument is not an Array');
};
