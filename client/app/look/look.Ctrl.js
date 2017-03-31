(function() {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

  LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'Auth','commentAPI'];

  function LookCtrl($scope, $stateParams, looksAPI, Auth,commentAPI) {

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

    commentAPI.getComments($scope.id)
        .then(function (data) {
            console.log('data from getComments backend: ', data);
            $scope.comments = data.data;
        })
        .catch(function (err) {
            if (err){
                console.log('err happens in the process of obtaining comments from back end: ', err);
            }
        });

    $scope.postComment= function () {
        var comment = {
            authorId: $scope.user._id,
            authorName: $scope.user.name,
            authorEmail:$scope.user.email,
            gravatar:$scope.user.gravatar,
            comment:$scope.comment.body,
            lookId:$scope.id
        };
        commentAPI.addComment(comment)
            .then(function (data) {
                console.log('add comment successfully: ', data);
                $scope.comment.body = '';
                $scope.comments.splice(0,0,data.data);
            })
            .catch(function (err) {
                console.log('failed to add comment: ', err);
            })
    };

    $scope.addVote=function (look) {
        looksAPI.upVoteLook(look)
            .then(function (data) {
                console.log('data from addVote backend: ',data);
                look.upVotes++;
            })
            .catch(function (err) {
                if (err){
                    console.log('failure occurs in addVote: ', err);
                }
            });
    };

    function addView() {
        looksAPI.addView($scope.id)
            .then(function (res) {
                console.log('view added to Look: ', res);
            })
            .catch(function (err) {
                if (err){
                    console.log('failed to increment: ', err);
                }
            });
    };

  }
})();