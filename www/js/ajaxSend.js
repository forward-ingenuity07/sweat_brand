(function () {

    var App = angular.module("module", ['ionic']);

    App
        .controller("controller", function ($scope, $http, $interval) {
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

    .controller("ionic_controller", function ($scope, $ionicModal, $ionicLoading, $timeout, $ionicPopup, $http) {
        $scope.win = "Here";

        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('login.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false,
            hardwareBackButtonClose: false,
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal1 = modal;
            $scope.modal1.show();
        });

        $ionicModal.fromTemplateUrl('signUp.html', {
            id: '2',
            scope: $scope
        }).then(function (modal) {
            $scope.modal2 = modal;
        });

        $scope.closeLogin = function () {
            location.href = "competitions.html";

        }
        $scope.facebook_link = "http://www.facebook.com/sweatbrand";
        $scope.twitter_link = "http://www.twitter.com/sweat_brand"
        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            url1 = "http://www.forwardingenuity.com/sweat_users.php"
            $http({ method: 'GET', url: url1, timeout: 5000 })
                .then(function (response) {

                    var username = $("#username").val();
                    var password = $("#password").val();

                    for (i = 0; i < response.data.length; i++) {
                        if (username == response.data[i].email) {
                            if (password == response.data[i].password) {
                                window.localStorage.setItem("Logged", "1");
                                window.localStorage.setItem("Log_status", "1");
                                window.localStorage.setItem("Name", response.data[i].name);
                                break;
                            }
                            else {
                                window.localStorage.setItem("Logged", "0");
                                break;
                            }

                        }
                        else {
                            window.localStorage.setItem("Logged", "0");
                        }

                    }

                })
            .catch(function (error) {

                window.localStorage.setItem("Logged", "2");
            })
            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system

            $scope.loading = $ionicLoading.show({
                template: '<i class="icon ion-loading-c"></i> Logging in',

                //Will a dark overlay or backdrop cover the entire view
                showBackdrop: false,

                // The delay in showing the indicator
                showDelay: 10
            });



            $timeout(function () {

                //        $scope.closeLogin();
                $ionicLoading.hide();
                if (window.localStorage.getItem("Logged") == "1") {
                    var myPopup = $ionicPopup.show({
                        template: 'Welcome ' + window.localStorage.getItem("Name"),
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });
                }
                else if (window.localStorage.getItem("Logged") == "0") {
                    var myPopup = $ionicPopup.show({
                        template: 'Email password combination invalid',
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });

                }

                else if (window.localStorage.getItem("Logged") == "3") {
                    var myPopup = $ionicPopup.show({
                        template: 'Network error, check connection',
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });

                }

            }, 1000);


            $timeout(function () {

                $scope.closeLogin();


            }, 2000);


        };

        $scope.login = function () {
            $scope.modal1.show();
            $scope.modal2.hide();
        };
        $scope.signup = function () {
            $scope.modal2.show();
            $scope.modal1.hide();
        }


        // Perform the sign up action when the user submits the login form
        $scope.doSignup = function () {
            console.log('Doing sign up', $scope.SignupData);

            $scope.loading = $ionicLoading.show({
                template: '<i class="icon ion-loading-c"></i> Signing up',

                //Will a dark overlay or backdrop cover the entire view
                showBackdrop: false,

                // The delay in showing the indicator
                showDelay: 10
            });


            var url2 = "http://www.forwardingenuity.com/sweat_users_upl.php";
            var name = $("#name").val();
            window.localStorage.setItem("Name", name);
            var email = $("#email").val();
            var password = $("#pass").val();
            //  var el = document.getElementById("provinces");
            //  var province = el.options[el.selectedIndex].value;
            var province = $('#provinces option:selected').val()

            var dataSt = "name=" + name + "&email=" + email + "&password=" + password + "&province=" + province

            $.ajax({
                type: "POST",                                           //method
                url: url2,     //url   
                data: dataSt,                                       //data sent as concatinated string
                crossDomain: true,
                cache: false,
                timeout: 5000,
                beforeSend: function () { $("#submit_button").text('Connecting...'); },
                success: function (data) {
                    if (data == "success") {
                        window.localStorage.setItem("signed_up", "1");
                    }
                    else if (data == "error") {
                        window.localStorage.setItem("signed_up", "2");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.localStorage.setItem("signed_up", "3");
                }

            });

            // return false;


            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system





            $timeout(function () {
                $scope.closeLogin();
                $ionicLoading.hide();
                $("#submit_button").text('Sign Up')
                if (window.localStorage.getItem("signed_up") == "1") {
                    var myPopup = $ionicPopup.show({
                        template: 'Welcome ' + window.localStorage.getItem("Name"),
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });
                }
                else if (window.localStorage.getItem("signed_up") == "0") {
                    var myPopup = $ionicPopup.show({
                        template: 'Error logging in, please try again',
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });

                }

                else if (window.localStorage.getItem("signed_up") == "3") {
                    var myPopup = $ionicPopup.show({
                        template: 'Network error, please check connection',
                        scope: $scope,

                        buttons: [
                           { text: 'OK' }, {

                               onTap: function (e) {

                                   if (!$scope.data.model) {
                                       //don't allow the user to close unless he enters model...
                                       e.preventDefault();
                                   } else {
                                       return $scope.data.model;
                                   }
                               }
                           }
                        ]
                    });

                }

            }, 3000);
        };


    })

    .controller("button_controller", function ($scope, $ionicModal, $http) {
        $scope.login = function () {
            if (window.localStorage.getItem("Logged") == "1") {
                alert("Logged in");
            }
            else {
                location.href = "Notsigned.html";
            }
        }

    })
}());

