angular
  .module("chariotApp")
  .factory("Team", Team);

Team.$inject = ['$resource', 'API'];

function Team($resource, API) {
  var Team = $resource(API+"/teams/:id", null, {
    "update": {method: "PUT"}
  })
  return Team;
}