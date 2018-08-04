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
 * Object link constants.
 */
const linkTypes = keyMirror({
  LINK_HARVESTER: null,
  LINK_HAULER: null,
  LINK_UPGRADER: null,
  LINK_STORAGE: null,
  LINK_ENERGY_SOURCE: null,
  LINK_CONSTRUCTION: null,
  LINK_CONSTRUCTION_OBSERVER: null,
});

_.forEach(Object.keys(linkTypes), (key) => {
  global[key] = key;
});

/**
 * Role constants.
 */
const roles = keyMirror({
  ROLE_HARVESTER: null,
  ROLE_HAULER: null,
  ROLE_UPGRADER: null,
  ROLE_BUILDER: null,
});

_.forEach(Object.keys(roles), (key) => {
  global[key] = key;
});

/**
 * Request constants.
 */
const requestTypes = keyMirror({
  REQUEST_HARVESTER: null,
  REQUEST_HAULER: null,
  REQUEST_UPGRADER: null,
  REQUEST_BUILDER: null,
  REQUEST_LOW_ENERGY: null,
  REQUEST_LOW_HEALTH: null,
  REQUEST_DEFEND: null,
});

_.forEach(Object.keys(requestTypes), (key) => {
  global[key] = key;
});

/**
 * Flag constants
 */
const flagTypes = keyMirror({
  FLAG_PLACEHOLDER: null,
  FLAG_CONTAINER: null,
  FLAG_EXTENSION: null,
  FLAG_STORAGE: null,
  FLAG_TOWER: null,
  FLAG_RAMPART: null,
  FLAG_WALL: null,
  FLAG_CLAIM: null,
  FLAG_REMOTE_HARVEST: null,
});

_.forEach(Object.keys(flagTypes), (key) => {
  global[key] = key;
});

 global.FLAG = {
   // Defense
   [COLOR_RED]: {
     [COLOR_WHITE]: FLAG_TOWER,
     [COLOR_CYAN]: FLAG_RAMPART,
     [COLOR_GREY]: FLAG_WALL,
   },
   // Expedition
   [COLOR_PURPLE]: {
     [COLOR_WHITE]: FLAG_CLAIM,
     [COLOR_YELLOW]: FLAG_REMOTE_HARVEST,
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
   // Storage
   [COLOR_YELLOW]: {
     [COLOR_WHITE]: FLAG_CONTAINER,
     [COLOR_BLUE]: FLAG_EXTENSION,
     [COLOR_ORANGE]: FLAG_STORAGE,
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
