//this belongs to the john papa angular style
(function() {

  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$state', 'Auth','$modal','looksAPI','scrapeAPI','$alert'];

  function MainCtrl($scope, $state, Auth,$modal,looksAPI,scrapeAPI,$alert) {

    $scope.user = Auth.getCurrentUser();

    $scope.look = {};

    //define an array of looks to show all looks
    $scope.looks = [];
    
    //this part is used to decide whether to show initial contents
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    var alertSuccess = $alert({
        title:'Success',
        content:'New Look added',
        placement:'top-right',
        container:'#alertContainer',
        type:'success',
        duration:8
    });

    var alertFail = $alert({
        title:'Not saved',
        content:'New Look failed to save',
        placement:'top-right',
        container:'#alertContainer',
        type:'warning',
        duration:8
    });
    
    var myModal = $modal({
      scope:$scope, 
        show:false
    });
    
    $scope.showModal = function () {
        myModal.$promise.then(myModal.show);
    };
    
    looksAPI.getAllLooks()
        .then(function (data) {
            console.log(data);
            $scope.looks = data.data;
        })
        .catch(function (err) {
            console.log('failed to get looks: ', err);
        });

      $scope.$watch('look.link',function (newVal,oldVal) {

          console.log('newVal: ', newVal);

          if (newVal.length > 5) {
              $scope.loading = true;

              var link = {url:$scope.look.link};

              //refactor the $http thing
              scrapeAPI.getScrapeDetails(link)
                  .then(function (data) {
                  console.log('data from mainCtrl.js at $watch part: ', data);
                  $scope.showScrapeDetails = true;
                  $scope.gotScrapeResults = true;
                  $scope.uploadLookTitle = false;
                  $scope.look.imgThumb = data.data.img;
                  $scope.look.description = data.data.desc;
              }).catch(function (data) {
                  console.log('failed to return from scrape');
                  $scope.loading = false;
                  $scope.look.link = '';
                  $scope.gotScrapeResults = false;
              }).finally(function () {
                  $scope.loading = false;
                  $scope.uploadLookForm = false;
              });
          }
      });


    $scope.addScrapePost = function () {

        console.log('addScrapePost works');

        var look={
            description: $scope.look.description,
            title:$scope.look.title,
            image:$scope.look.imgThumb,
            linkURL:$scope.look.link,
            email:$scope.user.email,
            name:$scope.user.name,
            _creator: $scope.user._id
        };

        console.log('look: ', look);

        console.log('before http post');

        looksAPI.createScrapeLook(look)
            .then(function (data) {
                console.log('scrapeUpload works');
                alertSuccess.show();
                $scope.showScrapeDetails = false;
                $scope.gotScrapeResults = false;
                $scope.look.title = '';
                $scope.look.link = '';
                $scope.looks.splice(0,0,data.data);
                console.log('data: ', data);
            })
            .catch(function () {
                console.log('failed to post');
                alertFail.show();
                $scope.showScrapeDetails = false;
            });
    }
  }
})();