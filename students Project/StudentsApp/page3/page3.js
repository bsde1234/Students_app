angular.module("myApp.page3", ['ngRoute', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/page3/:id', {
                templateUrl: "page3/page3.html",
                controller: "page3Ctrl"
            });
}])
    .controller('page3Ctrl', function ($scope, $firebaseArray, $firebaseObject, $routeParams) {
        $scope.msg3 = "";
        $scope.testsel = "";
        $scope.subsel = "";
        $scope.tr = "true"
        var id = $routeParams.id;
        var ref = firebase.database().ref("students/" + id);
        var lref = firebase.database().ref("students").child("label");


        lref.on('value', (snapshot) => {
            $scope.label = snapshot.val();
            $scope.rlabel = $scope.label.physics;
            console.log($scope.rlabel)
        });



        $scope.student = $firebaseObject(ref);

        $scope.editStudent = function (id) {
            if ($scope.testsel != "" && $scope.subsel != "") {
                if ($scope.studentpres != $scope.tr) {
                    $scope.marks = "ab"
                }

                console.log(id);
                newusers = {}
                newusers[$scope.subsel + "/" + $scope.testsel + '/marks'] = $scope.marks


                var ref = firebase.database().ref("students/" + id);
                ref.update({
                    name: $scope.student.name,
                    rollno: $scope.student.rollno,
                    std: $scope.student.std,
                    class: $scope.student.class,

                })
                ref.update(newusers)


                    .then(
                        function (ref) {


                            $scope.msg3 = "Marks Added successfully.";

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
            } else {
                window.alert("please fill the fields")
            }

        }
    });
