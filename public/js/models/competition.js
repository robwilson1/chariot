angular
  .module("chariotApp")
  .factory("Competition", Competition);

Competition.$inject = ['$resource', 'API'];

function Competition($resource, API) {
  return $resource(API+"/competitions/:id", null, {
    "update": {method: "PUT"}
  })
}