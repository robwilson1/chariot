angular
  .module("chariotApp")
  .factory("Team", Team);

Team.$inject = ['$resource'];

function Team($resource) {
  var Team = $resource("http://localhost:3000/api/teams/:id", null, {
    "update": {method: "PUT"}
  })
  return Team;
}