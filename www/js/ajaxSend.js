(function () {

    var App = angular.module("module", []);

    App.controller("controller", function ($scope, $http, $interval) {

        $http({
            method: 'GET',
            url: 'http://forwardingenuity.com/json_competitions.php'
        })
        .then(function (response) {
            $scope.prize = (response.data)[0].winning;
            window.localStorage.setItem("time", (response.data)[0].ending);

            console.log(response.data);
            // window.localStorage.setItem('response1',response.data)

            $("#counting")
              .countdown(window.localStorage.getItem("time"), function (event) {
                  $(".days").text(event.strftime('%D'));
                  $(".hours").text(event.strftime('%H'));

                  $(".minutes").text(event.strftime('%M'));
                  $(".seconds").text(event.strftime('%S'))
                  /* $(this).text(
                     event.strftime('%D days %H:%M:%S')
                   );*/
              });
        })




    })
}());
