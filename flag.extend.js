Flag.prototype.loop = function () {
  if (this.type === FLAG.PLACEHOLDER) {
    return;
  }

  switch (this.type) {
    case FLAG.CONTAINER:
      containerFlag(this);
      break;
    default:
      break;
  }
};

function containerFlag(flag) {
  if (!_.size(flag.links)) {
    console.log('No links yet.');
    return;
  }

  const observerLinks = _.filter(flag.links, {type: LINK.CONSTRUCTION_OBSERVER});
  const structure = _.find(flag.pos.lookFor(LOOK_STRUCTURES), {structureType: STRUCTURE_CONTAINER});

  if (structure) {
    const constructionSite = _.find(flag.links, {type: LINK.CONSTRUCTION});

    _.forEach(observerLinks, observerLink => {
      const link = Game.getObjectById(observerLink.id);

      if (link) {
        link.linkTo(structure, LINK.STORAGE);
        link.pruneLink(constructionSite.id);
        link.pruneLink(flag.id);
      }
    });

    flag.remove();
  } else {
    if (!_.some(flag.links, {type: LINK.CONSTRUCTION})) {
      const constructionSite = _.find(flag.pos.lookFor(LOOK_CONSTRUCTION_SITES), {structureType: STRUCTURE_CONTAINER});

      if (constructionSite) {
        flag.linkTo(constructionSite, LINK.CONSTRUCTION);

        _.forEach(observerLinks, observerLink => {
          const link = Game.getObjectById(observerLink.id);

          if (link) {
            link.linkTo(constructionSite, LINK.CONSTRUCTION);
          } else {
            console.log(`${observerLink.id} couldn't be found. Pruned dead link.`);
            flag.pruneLink(observerLink.id);
          }
        });
      } else {
        flag.pos.createConstructionSite(STRUCTURE_CONTAINER);
      }
    }
  }
}
