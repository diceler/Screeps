global.USERNAME = _.get(_.first(_.toArray(Game.structures)), 'owner.username');

/**
 * Built-in energy capacity availability.
 * @type {{1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number, 8: number}}
 */
global.ENERGY_CAPACITY_AVAILABLE = {
  1: 300,  // RCL 1
  2: 550,  // RCL 2
  3: 800,  // RCL 3
  4: 1300, // RCL 4
  5: 1800, // RCL 5
  6: 2300, // RCL 6
  7: 5300, // RCL 7
  8: 12300 // RCL 8
};

/**
 * Terrain constants.
 * @type {string}
 */
global.TERRAIN_PLAIN = 'plain';
global.TERRAIN_SWAMP = 'swamp';
global.TERRAIN_WALL = 'wall';

/**
 * Object link constants
 * @type {string}
  */
global.LINK_HARVESTER = 'harvester';
global.LINK_UPGRADER = 'upgrader';
global.LINK_DEPOT = 'depot';
