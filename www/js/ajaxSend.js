(function () {

    var App = angular.module("module", []);

    App.controller("controller", function ($scope, $http, $interval) {
        $scope.facebook_link = "http://www.facebook.com/sweatbrand";
        $scope.twitter_link = "http://www.twitter.com/sweat_brand";
            $http({
                method: 'GET',
                url: 'http://forwardingenuity.com/json_competitions.php'
            })
        .then(function (response) {
            window.localStorage.setItem("prize_stored", (response.data)[0].winning);
            window.localStorage.setItem("instruction_stored", (response.data)[0].instructions);
            window.localStorage.setItem("date_stored", (response.data)[0].ending);
            window.localStorage.setItem("image_stored", (response.data)[0].image);
            $scope.prize = (response.data)[0].winning;
            $scope.image = (response.data)[0].image;

            $scope.instruction = (response.data)[0].instructions;
            window.localStorage.setItem("time", (response.data)[0].ending);
            
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
            $interval.cancel();
        })
        .catch(function (error) {
            if (window.localStorage.getItem("prize_stored") != null) {
                $("#fb-foot").hide();
                $(".page-container").show();

                $scope.prize = window.localStorage.getItem("prize_stored");
                $scope.instruction = window.localStorage.getItem("instruction_stored");
                $scope.image = window.localStorage.getItem("image_stored");
                $("#counting")
                  .countdown(window.localStorage.getItem("date_stored"), function (event) {
                      $(".days").text(event.strftime('%D'));
                      $(".hours").text(event.strftime('%H'));

                      $(".minutes").text(event.strftime('%M'));
                      $(".seconds").text(event.strftime('%S'))
                      /* $(this).text(
                         event.strftime('%D days %H:%M:%S')
                       );*/
                  });
            }
            else {
                $(".page-container").hide();

                $("#text").text("Unable to load information, check connection")



            }
        })

       
        




    })
}());
