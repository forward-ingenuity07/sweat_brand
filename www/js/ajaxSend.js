
    var App = angular.module("module", []);

    App.controller("controller", function ($scope, $http, $interval) {
       
            $http({
                method: 'GET',
                url: 'http://forwardingenuity.com/json_competitions.php'
            })
        .then(function (response) {
            window.localStorage.setItem("prize_stored", (response.data)[0].winning);
            window.localStorage.setItem("date_stored", (response.data)[0].ending);
            $scope.prize = (response.data)[0].winning;
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
                
                var url1 = "http://forwardingenuity.com/json_competitions.php"; //Get url of php file containing json

                var ourRequest = new XMLHttpRequest(); //create XMLHttpRequest object to request for the JSON data
                ourRequest.open("GET", url1);   //Opening...

                ourRequest.onload = function () {
                    
                    window.localStorage.setItem("ajax_received", ourRequest.responseText);
                }
                ourRequest.send();      //send request

                if (window.localStorage.getItem("ajax_received") != null) {
                    alert("here");
                    var ourData = JSON.parse(window.localStorage.getItem("ajax_received"));
                    $(".page-container").show();
                    $("#fb-foot").hide();
                    $scope.prize = ourData[0].winning;
                    $("#counting")
                  .countdown(ourData[0].ending, function (event) {
                      $(".days").text(event.strftime('%D'));
                      $(".hours").text(event.strftime('%H'));

                      $(".minutes").text(event.strftime('%M'));
                      $(".seconds").text(event.strftime('%S'))
                      /* $(this).text(
                         event.strftime('%D days %H:%M:%S')
                       );*/
                  });
                }
            }
        })

       
        




    })
