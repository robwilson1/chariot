angular
  .module("chariotApp")
  .factory("Competition", Competition);

Competition.$inject = ['$resource'];

function Competition($resource) {
  return $resource("http://localhost:3000/api/competitions/:id", null, {
    "update": {method: "PUT"}
  })
}