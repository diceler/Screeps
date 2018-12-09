'use strict';

global.roles = {};

/**
 * Creep config
 */
global.MAX_STUCK = 3;
global.MAX_HARVEST_POWER = 10;
global.MAX_CS_PER_BUILDER = 10;
global.MAX_COST_PER_BUILDER = 15000;
global.MIN_ENERGY_AVAILABLE = 200;
global.HARVESTERS_PER_UPGRADER = 2;
global.WALL_RCL_2_HITS_MIN = 10000;
global.WALL_RCL_3_HITS_MIN = 50000;
global.WALL_RCL_4_HITS_MIN = 100000;
global.WALL_RCL_5_HITS_MIN = 500000;
global.WALL_RCL_6_HITS_MIN = 1000000;

/**
 * Spawn priority
 */
global.SPAWN_PRIORITY = {
  [ROLE_DEFENDER]: 10,
  [ROLE_HARVESTER]: 11,
  [ROLE_HAULER]: 12,
  [ROLE_UPGRADER]: 12,
  [ROLE_BUILDER]: 12,
};
