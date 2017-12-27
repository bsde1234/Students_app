angular.module("myApp.page2", ['ngRoute', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/page2', {
                templateUrl: "page2/page2.html",
                controller: "page2Ctrl"
            });
}])
    .controller('page2Ctrl', function ($scope, $firebaseArray, $firebaseObject) {
        $scope.student = {};









        var lref = firebase.database().ref("students").child("label");
        lref.on('value', (snapshot) => {
            $scope.label = snapshot.val();

            $scope.student = snapshot.val()
            console.log($scope.student)
        });




        $scope.addStudent = function () {
            $scope.msg2 = "";
            var ref = firebase.database().ref("students");

            if ($scope.student.name != "" && $scope.student.name != null) {
                $firebaseArray(ref).$add($scope.student)
                    .then(
                        function (ref) {
                            $scope.student = {};
                            $scope.student.name = "";
                            $scope.student = {};
                            $scope.student.name = "";





                            $scope.msg2 = "Student Created successfully.";
                            window.setTimeout(function () {
                                $scope.$apply(function () {
                                    $scope.msg2 = false;
                                })
                            }, 2000)
                        },
                        function (error) {
                            alert("please enter correct details");
                            console.log(error);
                        })
            } else {
                alert("enter the name")
            }
        };
        console.log('page2');
    });
