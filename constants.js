'use strict';

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
 * Link constants
 */
__mapToGlobal([
  "LINK_ENERGY_SOURCE",
]);

/**
 * Roles
 */
__mapToGlobal([
  "ROLE_HARVESTER",
  "ROLE_HAULER",
  "ROLE_BUILDER",
  "ROLE_UPGRADER",
]);

/**
 * Spawn priority
 */
global.SPAWN_PRIORITY = {
  [ROLE_HARVESTER]: 50,
  [ROLE_HAULER]: 60,
  [ROLE_BUILDER]: 70,
  [ROLE_UPGRADER]: 100,
};
