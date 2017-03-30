(function() {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

  LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'Auth'];

  function LookCtrl($scope, $stateParams, looksAPI, Auth) {

    $scope.user = Auth.getCurrentUser();
    $scope.id = $stateParams.lookId;
    $scope.popLooks = [];

    looksAPI.findOneLook($scope.id)
      .then(function(data) {
        console.log(data);
        $scope.look = data.data;
        // addView();
      }).catch(function (err) {
        console.log('failed to get look: ', err);
    });

    looksAPI.popLooks($scope.id)
      .then(function(data) {
        console.log(data);
        $scope.popLooks = data.data;
      }).catch(function(err) {
        console.log('failed to get look: ', err);
      });

  }
})();