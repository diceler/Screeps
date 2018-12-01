'use strict';

global.roles = {};

/**
 * Creep config
 */
global.MAX_STUCK = 3;
global.MAX_HARVEST_POWER = 10;
global.SPAWN_REQUEST_EXPIRE = 200;

/**
 * Spawn priority
 */
global.SPAWN_PRIORITY = {
  [ROLE_HARVESTER]: 50,
  [ROLE_HAULER]: 60,
  [ROLE_BUILDER]: 70,
  [ROLE_UPGRADER]: 100,
};

/**
 * Creep body types
 */
const DEFAULT_CREEP_BODY = [WORK, CARRY, MOVE];
global.CREEP_BODY = {
  [ROLE_HARVESTER]: rcl => {
    switch (rcl) {
      case 2:
        return [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE];
      default:
        return DEFAULT_CREEP_BODY;
    }
  },
  [ROLE_HAULER]: rcl => {
    switch (rcl) {
      default:
        return DEFAULT_CREEP_BODY;
    }
  },
  [ROLE_BUILDER]: rcl => {
    switch (rcl) {
      default:
        return DEFAULT_CREEP_BODY;
    }
  },
  [ROLE_UPGRADER]: rcl => {
    switch (rcl) {
      default:
        return DEFAULT_CREEP_BODY;
    }
  },
};
