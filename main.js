require('main.imports');

module.exports.loop = () => {
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
  for (const creep in Game.creeps) {
    Game.creeps[creep].loop();
  }
  for (const room in Game.rooms) {
    Game.rooms[room].loop();
  }
  for (const structure in Game.structures) {
    Game.structures[structure].loop();
  }
  // for (const constructionSite in Memory.constructionSitea) {
  //   Game.rooms[constructionSite].loop();
  // }
  // for (const flag in Memory.flags) {
  //   Game.rooms[flag].loop();
  // }
}
