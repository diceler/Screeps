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
global.LINK = keyMirror({
  HARVESTER: null,
  HAULER: null,
  UPGRADER: null,
  DEPOSIT: null,
});

/**
 * Role constants.
 */
global.ROLE = keyMirror({
  HARVESTER: null,
  HAULER: null,
  UPGRADER: null,
  BUILDER: null,
});

/**
 * Request constants.
 */
global.REQUEST = keyMirror({
  HARVESTER: null,
  HAULER: null,
  UPGRADER: null,
  BUILDER: null,
  LOW_ENERGY: null,
  LOW_HEALTH: null,
  DEFEND: null,
});

global.INIT_REQUESTS = {
  [REQUEST.UPGRADER]: [],
  [REQUEST.BUILDER]: [],
  [REQUEST.HARVESTER]: [],
  [REQUEST.HAULER]: [],
  [REQUEST.LOW_ENERGY]: [],
  [REQUEST.LOW_HEALTH]: [],
  [REQUEST.DEFEND]: [],
};

/**
 * Flag constants
 */
global.FLAG_TYPE = keyMirror({
  PLACEHOLDER: null,
  CONTAINER: null,
  EXTENSION: null,
  STORAGE: null,
  TOWER: null,
  RAMPART: null,
  WALL: null,
  CLAIM: null,
  REMOTE_HARVEST: null,
});

 global.FLAG = {
   // Defense
   [COLOR_RED]: {
     [COLOR_WHITE]: FLAG_TYPE.TOWER,
     [COLOR_CYAN]: FLAG_TYPE.RAMPART,
     [COLOR_GREY]: FLAG_TYPE.WALL,
   },
   // Expedition
   [COLOR_PURPLE]: {
     [COLOR_WHITE]: FLAG_TYPE.CLAIM,
     [COLOR_YELLOW]: FLAG_TYPE.REMOTE_HARVEST,
   },
   [COLOR_BLUE]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   [COLOR_CYAN]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   [COLOR_GREEN]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   // Storage
   [COLOR_YELLOW]: {
     [COLOR_WHITE]: FLAG_TYPE.CONTAINER,
     [COLOR_BLUE]: FLAG_TYPE.EXTENSION,
     [COLOR_ORANGE]: FLAG_TYPE.STORAGE,
   },
   [COLOR_ORANGE]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   [COLOR_BROWN]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   [COLOR_GREY]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   },
   [COLOR_WHITE]: {
     [COLOR_WHITE]: FLAG_TYPE.PLACEHOLDER,
   }
 };
