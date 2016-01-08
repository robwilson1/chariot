angular
  .module("chariotApp")
  .factory("Team", Team);

Team.$inject = ['$resource'];

function Team($resource) {
  var Team = $resource(API+"/teams/:id", null, {
    "update": {method: "PUT"}
  })
  return Team;
}