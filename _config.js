'use strict';

global.roles = {};

/**
 * Creep config
 */
global.MAX_STUCK = 3;
global.MAX_HARVEST_POWER = 10;
global.SPAWN_REQUEST_EXPIRE = 200;
global.CONTROLLER_TICKS_TO_DOWNGRADE_MIN = 1000;
global.NO_INTERACTION_TICK_LIMIT = 500;
global.MAX_CS_PER_BUILDER = 10;
global.HARVESTERS_PER_UPGRADER = 3;
global.MIN_ENERGY_AVAILABLE = 200;

/**
 * Spawn priority
 */
global.SPAWN_PRIORITY = {
  [ROLE_DEFENDER]: 10,
  [ROLE_HARVESTER]: 11,
  [ROLE_HAULER]: 12,
  [ROLE_UPGRADER]: 12,
  [ROLE_BUILDER]: 13,
};
