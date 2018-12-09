'use strict';

require('main.imports');

module.exports.loop = () => {
  if (!Memory.USERNAME) {
    Memory.USERNAME = _.get(_.first(_.toArray(Game.structures)), 'owner.username');
  }

  if (!Memory.MAINBASE) {
    Memory.MAINBASE = _.get(_.first(_.toArray(Game.structures)), 'room.name');
  }

  global.Cache = global.Cache || {};

  clearMemory();
  executeLoops();
};

function clearMemory() {
  for (const room in Memory.rooms) {
    if (!Game.rooms[room]) {
      delete Memory.rooms[room];
    }
  }
  for (const spawn in Memory.spawns) {
    if (!Game.spawns[spawn]) {
      delete Memory.spawns[spawn];
    }
  }
  for (const creep in Memory.creeps) {
    if (!Game.creeps[creep]) {
      delete Memory.creeps[creep];
    }
  }
  for (const flag in Memory.flags) {
    if (!Game.flags[flag]) {
      delete Memory.flags[flag];
    }
  }
}

function executeLoops() {
  // for (const flag in Game.flags) {
  //   Game.flags[flag].loop();
  // }
  for (const room in Game.rooms) {
    Cache.rooms = Cache.rooms || {};
    Cache.rooms[room] = Cache.rooms[room] || {};
      Game.rooms[room].loop();
  }
  for (const creep in Game.creeps) {
    Game.creeps[creep].loop();
  }
  for (const structure in Game.structures) {
    Game.structures[structure].loop();
  }
  for (const constructionSite in Memory.constructionSites) {
    Game.constructionSites[constructionSite].loop();
  }
}
