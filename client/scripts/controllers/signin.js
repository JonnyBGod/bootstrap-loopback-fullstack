'use strict';

/**
 * @ngdoc function
 * @name caaSwebsiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the caaSwebsiteApp
 */
angular.module('App')
  	.controller('signinCtrl', function ($scope, $state, $stateParams, $location, User, AppAuth, LoopBackAuth) {
    	$scope.err = false;
        $scope.success = false;
        $scope.loading = false;

        $scope.formData = {}; 
        $scope.currentUser = AppAuth.currentUser;
        $scope.showForm = $state.current.name;

        if ($scope.currentUser.username && $state.current.name === 'signup') {
        	$scope.formData.email = $scope.currentUser.email;
        	$scope.formData.name = $scope.currentUser.name;
        }

        if ($stateParams.resetPasswordToken) {
        	//$scope.formData.password = $stateParams.resetPasswordToken;
        	LoopBackAuth.accessTokenId = $stateParams.resetPasswordToken;
			LoopBackAuth.save();
        }

        $scope.login = function () {
            $scope.loading = true;

            if ($scope.currentUser.username) {
            	$scope.loginResult = User.link({rememberMe: false}, $scope.formData,
					function() {
						$scope.loading = false;
						var next = $location.nextAfterLogin || '/';
						$location.nextAfterLogin = null;
						
						AppAuth.ensureHasCurrentUser(User);
						$location.path(next);
					},
					function(res) {
						$scope.loading = false;
						$scope.loginError = res.data.error;
					}
				);
            } else {
            	$scope.loginResult = User.login({rememberMe: false}, $scope.formData,
					function() {
						$scope.loading = false;
						var next = $location.nextAfterLogin || '/';
						$location.nextAfterLogin = null;
						
						AppAuth.ensureHasCurrentUser(User);
						$location.path(next);
					},
					function(res) {
						$scope.loading = false;
						$scope.loginError = res.data.error;
					}
				);
            }
        };

        $scope.register = function() {
        	$scope.loading = true;
        	
        	if ($scope.currentUser.username) {
        		$scope.user = User.createAndLink($scope.formData,
					function () {
						$scope.loading = false;
						$scope.login();
					},
					function (res) {
						$scope.loading = false;
						$scope.registerError = res.data.error;
					}
				);
        	} else {
        		$scope.user = User.save($scope.formData,
					function () {
						$scope.loading = false;
						$scope.login();
					},
					function (res) {
						$scope.loading = false;
						$scope.registerError = res.data.error;
					}
				);
        	}
		};

		$scope.resetPassword = function () {
        	$scope.loading = true;

            if ($scope.currentUser.name) {

            } else {
            	User.upsert({password: $scope.formData.password},
					function(res) {
						$scope.loading = false;
						console.log(res);
					},
					function(res) {
						$scope.loading = false;
						console.log(res);
						$scope.loginError = res.data.error;
					}
				);
            }
        };

        $scope.recover = function () {
            $scope.loading = true;

            User.resetPassword($scope.formData,
				function(res) {
					$scope.loading = false;
					console.log(res);
				},
				function(res) {
					$scope.loading = false;
					console.log(res);
					$scope.loginError = res.data.error;
				}
			);
            
        };

  	});
