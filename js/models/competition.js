angular
  .module("chariotApp")
  .factory("Competition", Competition);

Competition.$inject = ['$resource'];

function Competition($resource) {
  var Competition = $resource("http://localhost:3000/api/competitions/:id", null, {
    "update": {method: "PUT"}
  })
  return Competition;
}