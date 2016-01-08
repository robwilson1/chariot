angular
  .module("chariotApp")
  .factory("Competition", Competition);

Competition.$inject = ['$resource'];

function Competition($resource) {
  return $resource(API+"/competitions/:id", null, {
    "update": {method: "PUT"}
  })
}