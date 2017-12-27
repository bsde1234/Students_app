angular.module("myApp.page5", ['ngRoute', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/page5', {
                templateUrl: "page5/page5.html",
                controller: "page5Ctrl"
            });
}])
    .controller('page5Ctrl', function ($scope, $firebaseArray, $firebaseObject, $routeParams) {
        $scope.msg3 = "";


        var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();



        $scope.somekey = "";
        var lref = firebase.database().ref("students").child("label");
        lref.on('value', (snapshot) => {
            $scope.label = snapshot.val();
            $scope.rlabel = $scope.label.physics;
            console.log($scope.rlabel)
        });


        $scope.subjects = ["physics", "chemistry", "english", "maths", "biology", "buisnessmaths", "accountancy", "economics", "zoology", "computerscience", "tamil", "commerce", "science", "socialscience"];
        var ref = firebase.database().ref("students");

        $scope.addtest = function () {
            $scope.timestamp = Date.now()
            ref.once('value', function (s) {
                var users = s.val();
                var newusers = {};

                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers[key + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/bools'] = true
                        newusers[key + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/marks'] = "$"
                        newusers[key + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/name'] = $scope.somekey
                        newusers[key + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/time'] = $scope.timestamp
                    }
                }

                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers["label" + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/bools'] = true
                        newusers["label" + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/marks'] = "$"
                        newusers["label" + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/name'] = $scope.somekey
                        newusers["label" + "/" + $scope.subjects[i] + "/" + $scope.timestamp + '/time'] = $scope.timestamp
                    }

                }





                ref.update(newusers).then(
                    function (ref) {


                        $scope.msg3 = "Test added successfully.";

                        window.setTimeout(function () {
                            $scope.$apply(function () {

                            })
                        }, 100);
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.msg3 = false;
                            })
                        }, 2000)
                    },
                    function (error) {
                        console.log(error);
                    }
                );

            })
        }


        $scope.deleteStudent = function (name) {
            console.log(name)

            ref.once('value', function (s) {
                var users = s.val();
                var newusers = {};
                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers[key + "/" + $scope.subjects[i] + "/" + name + '/bools'] = null
                        newusers["label" + "/" + $scope.subjects[i] + "/" + name + '/bools'] = null
                    }
                }
                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers[key + "/" + $scope.subjects[i] + "/" + name + '/marks'] = null
                        newusers["label" + "/" + $scope.subjects[i] + "/" + name + '/marks'] = null
                    }
                }
                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers[key + "/" + $scope.subjects[i] + "/" + name + '/name'] = null
                        newusers["label" + "/" + $scope.subjects[i] + "/" + name + '/name'] = null
                    }
                }
                for (var key in users) {
                    for (var i in $scope.subjects) {
                        newusers[key + "/" + $scope.subjects[i] + "/" + name + '/time'] = null
                        newusers["label" + "/" + $scope.subjects[i] + "/" + name + '/time'] = null
                    }
                }

                ref.update(newusers).then(
                    function (ref) {


                        $scope.msg3 = "Test deleted successfully.";

                        window.setTimeout(function () {
                            $scope.$apply(function () {

                            })
                        }, 100);
                        window.setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.msg3 = false;
                            })
                        }, 2000)
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            })
        }





    });
