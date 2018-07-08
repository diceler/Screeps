global.USERNAME = _.get(_.first(_.toArray(Game.structures)), 'owner.username');

/**
 * Settings.
 */
global.MAX_STUCK = 3;

/**
 * Built-in energy capacity availability.
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
 */
global.TERRAIN_PLAIN = 'plain';
global.TERRAIN_SWAMP = 'swamp';
global.TERRAIN_WALL = 'wall';

/**
 * Object link constants.
 */
global.LINK = keyMirror({
  HARVESTER: null,
  UPGRADER: null,
  DEPOT: null,
});

global.ROLE_HARVESTER = 'harvester';

global.ROLE_ABBREVIATION = {};
