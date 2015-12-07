angular
  .module("chariotApp")
  .controller("VotePageController", VotePageController);


function VotePageController() {
  var self = this;

  self.title = "title";

  self.first = {};
  self.second = {};

  self.first.amount   = 12454;
  self.second.amount  = 8230;
  self.target         = 20000;
  self.total          = self.first.amount + self.second.amount;

  self.first.decimal  = self.first.amount/self.target;
  self.second.decimal = self.second.amount/self.target;

  self.first.percent  = self.first.decimal*100 + "%";
  self.second.percent = self.second.decimal*100 + "%";

  self.donate = function(team) {
    console.log(team);
  }
}