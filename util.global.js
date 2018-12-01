'use strict';

global.roomNameRegex = /^[WE]([0-9]+)[NS]([0-9]+)$/;

/**
 * Override of Game.getObjectById to also be able to get Flag objects.
 * @param id
 */
global.getObjectById = function (id) {
  if (_.isUndefined(id)) {
    console.log('getObjectById: "id" was undefined.');
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

/**
 * Creates an array of specified body parts.
 * @param bodyPart
 * @param quantity
 * @private
 */
global.parts = function (bodyPart, quantity) {
  if (isNaN(quantity)) {
    throw new Error('parts: "quantity" is not a number.');
  }

  let bodyParts = [];

  if (quantity) {
    for (let i = 0; bodyParts.length < quantity; i++) {
      bodyParts.push(bodyPart);
    }
  }

  return bodyParts;
};
