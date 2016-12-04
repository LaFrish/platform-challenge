angular
.module("eventOmatic", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  "$locationProvider",
  "$urlRouterProvider",
  Router
])
.factory("Event", [
  "$resource",
  Event
])
.controller("indexCtrl", [
  "$state",
  "Event",
  indexController
])
.controller("showCtrl", [
  "$state",
  "$stateParams",
  "Event",
  showController
])

function Router ($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)
  $stateProvider
  .state("welcome", {
    url: "/",
    templateUrl: "/assets/js/ng-views/welcome.html"
  })
  .state("index", {
    url: "/events",
    templateUrl: "/assets/js/ng-views/index.html",
    controller: "indexCtrl",
    controllerAs: "vm"
  })
  .state("show", {
    url: "/events/:name",
    templateUrl: "/assets/js/ng-views/show.html",
    controller: "showCtrl",
    controllerAs: "vm"
  })
  $urlRouterProvider.otherwise("/")
}

function Event ($resource) {
  return $resource("/api/events/:name", {}, {
    update: { method: "PUT" }
  });
}

function indexController ($state, Event) {
  this.events = Event.query()
  this.newEvent = new Event()
  this.create = function () {
    this.newEvent.$save().then(function(event){
      $state.go("show", { name: event.name })
    })
  }
}

function showController ($state, $stateParams, Event) {
  this.event = Event.get({name: $stateParams.name})
  this.update = function () {
    this.event.$update({name: $stateParams.name})
  }
  this.destroy = function () {
    this.event.$delete({name: $stateParams.name}).then(function(){
      $state.go("index")
    })
  }
}
