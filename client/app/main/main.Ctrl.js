//this belongs to the john papa angular style
(function() {

  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$state', 'Auth','$modal','$http'];

  function MainCtrl($scope, $state, Auth,$modal,$http) {

    $scope.user = Auth.getCurrentUser();

    $scope.look = {};
    
    //this part is used to decide whether to show initial contents
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;
    
    var myModal = $modal({
      scope:$scope, 
        show:false
    });
    
    $scope.showModal = function () {
        myModal.$promise.then(myModal.show);
    }

    //watch for changes in URL, Scrape and Display Results
      $scope.$watch('look.link',function (newVal,oldVal) {

          console.log('newVal: ', newVal);

          if (newVal.length > 5) {

              $scope.loading = true;
              console.log('loading works');

              console.log('$scope.look.link: ', $scope.look.link);

              $http.post('/api/links/scrape', {
                  url: $scope.look.link
              }).then(function (data) {
                  console.log('data from mainCtrl.js at $watch part: ', data);
                  $scope.showScrapeDetails = true;
                  $scope.gotScrapeResults = true;
                  $scope.uploadLookTitle = false;
                  $scope.look.imgThumb = data.data.img;
                  $scope.look.description = data.data.desc;
              }).catch(function (data) {
                  console.log('failed to return from scrape');
                  $scope.loading = true;
                  $scope.look.link = '';
                  $scope.gotScrapeResults = false;
              }).finally(function () {
                  $scope.loading = false;
                  $scope.uploadLookForm = false;
              });
          }
      });

    $scope.addScrapePost = function () {
        var look={
            description: $scope.look.description,
            title:$scope.look.title,
            image:$scope.look.imgThumb,
            linkURL:$scope.look.link,
            email:$scope.user.email,
            name:$scope.user.name,
            _creator: $scope.user._id
        }
        $http.post('/api/look/scrapeUpload',look)
            .then(function (data) {
                $scope.showScrapeDetails = false;
                $scope.gotScrapeResults = false;
                $scope.look.title = '';
                $scope.look.link = '';
                console.log('data: ', data);
            })
            .catch(function () {
                console.log('failed to post');
                $scope.showScrapeDetails = false;
            });
    }

  }
})();