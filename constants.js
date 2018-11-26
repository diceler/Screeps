/**
 * Owner
 */
global.USERNAME = _.get(_.first(_.toArray(Game.structures)), 'owner.username');

/**
 * Settings.
 */
global.MAX_STUCK = 3;
global.MAX_HARVEST_POWER = 10;

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
 * Flag constants
 */
const flagTypes = keyMirror({
  FLAG_PLACEHOLDER: null,

  // Structures
  FLAG_CONTAINER: null,
  FLAG_EXTENSION: null,
  FLAG_STORAGE: null,
  FLAG_TOWER: null,
  FLAG_RAMPART: null,
  FLAG_WALL: null,

  // Actions
  FLAG_HARVEST: null,
  FLAG_CLAIM: null,
  FLAG_REMOTE_HARVEST: null,
});

_.forEach(Object.keys(flagTypes), (key) => {
  global[key] = key;
});

 global.FLAG = {
   [COLOR_RED]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_PURPLE]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_BLUE]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_CYAN]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_GREEN]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_YELLOW]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_ORANGE]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_BROWN]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_GREY]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   },
   [COLOR_WHITE]: {
     [COLOR_WHITE]: FLAG_PLACEHOLDER,
   }
 };
