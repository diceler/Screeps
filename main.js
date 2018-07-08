require('main.imports');

module.exports.loop = () => {
  clearMemory();
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
