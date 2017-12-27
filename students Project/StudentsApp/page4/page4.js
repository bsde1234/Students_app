angular.module("myApp.page4", ['ngRoute', 'firebase'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/page4/:id', {
                templateUrl: "page4/page4.html",
                controller: "page4Ctrl"
            });
}])
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: true
        });
  }])



    .controller('page4Ctrl', function ($scope, $firebaseArray, $firebaseObject, $routeParams) {
        $scope.msg3 = "";
        $scope.subjects = ["physics", "chemistry", "english", "maths", "biology", "buisnessmaths", "accountancy", "economics", "zoology", "computerscience", "tamil", "commerce", "science", "socialscience"];
        $scope.physics = "physics";
        $scope.chemistry = "chemistry";
        $scope.tamil = "tamil";
        $scope.accountancy = "accountancy";
        $scope.biology = "biology";
        $scope.english = "english";
        $scope.science = "science";
        $scope.maths = "maths";
        $scope.zoology = "zoology";
        $scope.computerscience = "computerscience";
        $scope.buisnessmaths = "buisnessmaths";
        $scope.socialscience = "socialscience";
        $scope.commerce = "commerce";
        $scope.economics = "economics";

        $scope.$on("create", function (evt, chart) {
            chart.datasets[0].points[1].fillColor = "red";
            chart.update();
        });


        var id = $routeParams.id;
        $scope.lineOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
            }]
            },

            elements: {
                line: {
                    tension: 0
                }
            }
        };



        $scope.res = [];
        $scope.labels = [];
        $scope.returnArr = [];
        $scope.tlabels = [];
        $scope.treturnArr = [];
        $scope.dataa = [];
        $scope.labela = [];
        var dataobj = {};
        var labobj = {};

        var refer = []



        var ref = firebase.database().ref("students/" + id);
        $scope.student = $firebaseObject(ref);


        var pref = firebase.database().ref("students/" + id).child("physics");
        $scope.log = $firebaseObject(pref)


        for (i = 0; i < $scope.subjects.length; i++) {
            var refer = firebase.database().ref("students/" + id).child($scope.subjects[i]);
            refer.on('value', (snapshot) => {


                snapshot.forEach(function (childSnapshot) {

                    var cchildSnapshot = childSnapshot.child("marks")
                    var item = cchildSnapshot.val();
                    item.key = cchildSnapshot.key;

                    $scope.dataa.push(cchildSnapshot.val());
                    var nchildSnapshot = childSnapshot.child("name")
                    var item = nchildSnapshot.val();
                    item.key = nchildSnapshot.key;

                    $scope.labela.push(nchildSnapshot.val());

                });
                dataobj[snapshot.key] = $scope.dataa
                labobj[snapshot.key] = $scope.labela
                console.log(dataobj)
                console.log(labobj)
                $scope.dataa = [];
                $scope.labela = [];

            })

        }
        console.log(labobj.physics)
        $scope.returnArr = dataobj.physics;
        $scope.labels = labobj.physics;
        $scope.treturnArr = dataobj.tamil;
        $scope.tlabels = labobj.tamil;
        $scope.creturnArr = dataobj.chemistry;
        $scope.clabels = labobj.chemistry;



        var lab = firebase.database().ref("students").child("label");
        $scope.plog = $firebaseObject(lab)




        for (var i = $scope.returnArr.length; i--;) {

            if ($scope.returnArr[i] == "$") {


                $scope.labels[i] = "$";


            }


        }
        //tamil loop to remove 
        for (var i = $scope.treturnArr.length; i--;) {

            if ($scope.treturnArr[i] == "$") {


                $scope.tlabels[i] = "$";


            }


        }
        for (var i = $scope.creturnArr.length; i--;) {

            if ($scope.creturnArr[i] == "$") {


                $scope.clabels[i] = "$";


            }


        }








        brr = ["$"];
        err = ["$"];

        $scope.datasets = {

            pointBackgroundColor: [],
            pointColor: [],
            borderColor: [],
            borderWidth: 1
        }
        $scope.tamildatasets = {

            pointBackgroundColor: [],
            pointColor: [],
            borderColor: [],
            borderWidth: 1
        }
        $scope.cdatasets = {

            pointBackgroundColor: [],
            pointColor: [],
            borderColor: [],
            borderWidth: 1
        }




        $scope.lbl = $scope.labels.filter(f => !err.includes(f));
        $scope.res = $scope.returnArr.filter(f => !brr.includes(f));
        $scope.fmarks = $scope.res
        $scope.tamildata = $scope.treturnArr.filter(f => !brr.includes(f));
        $scope.tamillabel = $scope.tlabels.filter(f => !err.includes(f));
        $scope.creturnArr = $scope.creturnArr.filter(f => !brr.includes(f));
        $scope.clabels = $scope.clabels.filter(f => !err.includes(f));




        for (var i = $scope.tamildata.length; i--;) {
            if ($scope.tamildata[i] !== "$") {
                $scope.istamil = true;
            }
            if ($scope.tamildata[i] == "ab") {
                $scope.tamildatasets.pointBackgroundColor[i] = "red";
                $scope.tamildata[i] = 0;



            }

        }


        for (var i = $scope.res.length; i--;) {
            if ($scope.res[i] !== "$") {
                $scope.isphy = true;
            }
            if ($scope.res[i] == "ab") {
                $scope.datasets.pointBackgroundColor[i] = "red";
                $scope.res[i] = 0;



            }

        }
        for (var i = $scope.creturnArr.length; i--;) {
            if ($scope.creturnArr[i] !== "$") {
                $scope.ischem = true;
            }
            if ($scope.creturnArr[i] == "ab") {
                $scope.cdatasets.pointBackgroundColor[i] = "red";
                $scope.creturnArr[i] = 0;



            }

        }



        $scope.colors = ["rgb(159,204,0)", "rgb(250,109,33)", "rgb(154,154,154)"];
        $scope.series = ['Series A'];
        $scope.data = [];


        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };


    });
