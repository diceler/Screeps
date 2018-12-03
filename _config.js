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

/**
 * Creep body types
 */
global.DEFAULT_CREEP_BODY = [WORK, CARRY, MOVE];
