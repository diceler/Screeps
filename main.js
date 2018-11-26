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
  for (const structure in Memory.structures) {
    if (!Game.structures[structure]) {
      delete Memory.structures[structure];
    }
  }
  for (const constructionSite in Memory.constructionSites) {
    if (!Game.constructionSites[constructionSite]) {
      delete Memory.constructionSites[constructionSite];
    }
  }
}

function executeLoops() {
  // for (const flag in Game.flags) {
  //   Game.flags[flag].loop();
  // }
  // for (const creep in Game.creeps) {
  //   Game.creeps[creep].loop();
  // }
  for (const room in Game.rooms) {
    Game.rooms[room].loop();
  }
  // for (const structure in Game.structures) {
  //   Game.structures[structure].loop();
  // }
  // for (const constructionSite in Memory.constructionSitea) {
  //   Game.rooms[constructionSite].loop();
  // }
}
