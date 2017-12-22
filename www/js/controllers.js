angular.module('mobionicApp.controllers', [])

// Home Controller
.controller('HomeCtrl', function($scope, Data) {
  $scope.items = Data.items;
})

// News Controller
.controller('NewsCtrl', function($scope, $ionicLoading, NewsData, NewsStorage) {
    
    $scope.news = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    NewsData.async().then(
        // successCallback
        function() {
            $scope.news = NewsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.news = NewsStorage.all();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// New Controller
.controller('NewCtrl', function($scope, $stateParams, NewsData) {

    $scope.new = NewsData.get($stateParams.newId);
    
})

// Products Controller
.controller('ProductsCtrl', function($scope, $ionicLoading, ProductsData, ProductsStorage) {
    
    $scope.products = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    ProductsData.async().then(
        // successCallback
        function() {
            $scope.products = ProductsData.getAll();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.products = ProductsStorage.all();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
})



// Product Controller
.controller('ProductCtrl', function($scope, $stateParams, ProductsData) {
    
    $scope.product = ProductsData.get($stateParams.productId);
    
})

// Gallery Controller
.controller('GalleryCtrl', function($scope, GalleryData) {

    $scope.items = GalleryData.items;

})

// Map Controller
.controller('MapCtrl', function($scope, MapData) {

    $scope.windowOptions = false;

    $scope.onClick = function () {
    this.windowOptions = !this.windowOptions;
    };

    $scope.closeClick = function () {
    this.windowOptions = false;
    };

    $scope.map = MapData.map;

    $scope.events = {

        click: function (mapModel, eventName, originalEventArgs) {

            var e = originalEventArgs[0];
            var latitude = e.latLng.lat(), longitude = e.latLng.lng();

            console.log(longitude, latitude);

        }
    }

})

// About Controller
.controller('AboutCtrl', function($scope, $ionicLoading, AboutData, AboutStorage) {
    
    $scope.about = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    
    AboutData.async().then(
        // successCallback
        function() {
            $scope.about = AboutData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.about = AboutStorage.all();
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
})

// Member Controller
.controller('MemberCtrl', function($scope, $stateParams, AboutData) {
    
    $scope.member = AboutData.get($stateParams.memberId);
    
})

    .directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})


// Contact Controller
.controller('ContactCtrl', function ($scope, $timeout, $ionicScrollDelegate) {

    $scope.hideTime = true;

    var alternate,
      isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.sendMessage = function () {
        alternate = !alternate;



        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        var user_id = window.localStorage.getItem("user_id");
        var message = $scope.data.message;
        if (window.localStorage.getItem("messages") != null) {
            var messages = [];
            messages = JSON.parse(window.localStorage.getItem("messages"));
            messages[messages.length] = message;
            window.localStorage.setItem("messages", JSON.stringify(messages));
        }
        var dataStr = "name=" + window.localStorage.getItem("Name") + "&user_id=" + user_id + "&message=" + message;
        var url3="http://www.sweatbrand.forwardingenuity.com/message_sent.php"
        $.ajax({
              type: "POST",                                           //method
              url: url3,     //url   
              data: dataStr,                                       //data sent as concatinated string
              crossDomain: true,
              cache: false,
              timeout: 5000,
              success: function (data) {
                  if (data == "success") {
                      window.localStorage.setItem("message_sent", "1");
                  }
                  else if (data == "error") {
                      window.localStorage.setItem("message_sent", "0");
                  }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  window.localStorage.setItem("signed_up", "3");
              }

          });

        $scope.messages.push({
            userId: alternate ? '12345' : '54321',
            text: $scope.data.message,
            time: d
        });

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    };


    $scope.inputUp = function () {
        if (isIOS) $scope.data.keyboardHeight = 216;
        $timeout(function () {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    };

    $scope.inputDown = function () {
        if (isIOS) $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function () {
        // cordova.plugins.Keyboard.close();
    };


    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

})

// Posts Controller
.controller('PostsCtrl', function($scope, $ionicLoading, PostsData, PostsStorage) {
    
    $scope.posts = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    PostsData.async().then(
        // successCallback
        function() {
            $scope.posts = PostsData.getAll().posts;
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.posts = PostsStorage.all().posts;
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 3;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.posts.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;       
    }; 
    
})

// Post Controller
.controller('PostCtrl', function($scope, $stateParams, PostsData, $sce) {

    $scope.post = PostsData.get($stateParams.postId);
    
    $scope.content = $sce.trustAsHtml($scope.post.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.sharePost = function () {

        var subject = $scope.post.title;
        var message = $scope.post.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})

// ServerPosts Controller
.controller('ServerPostsCtrl', function($scope, $http, $ionicLoading, ServerPostsData, ServerPostsStorage) {
    var data = []
    $scope.posts = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    $scope.loadData = function () {
        
        $http({method: 'GET', url: ServerPostsData.getURL() + 'page=' + $scope.page, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
            $scope.more = data.pages !== $scope.page;
            $scope.posts = $scope.posts.concat(data.posts);
            ServerPostsData.setData($scope.posts);
            ServerPostsStorage.save(data);
            $ionicLoading.hide();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
            $scope.posts = ServerPostsStorage.all().posts;
            ServerPostsData.setData(ServerPostsStorage.all().posts);
            $scope.storage = 'Data from local storage';
            $ionicLoading.hide();
        });

    };
        
    $scope.showMoreItems = function () {
        $scope.page += 1;
        $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Loading Data',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 10
        });
        $scope.loadData();
    }

    $scope.hasMoreItems = function () {
        return $scope.more;
    }

    $scope.page = 1;
    $scope.more = true;
    $scope.loadData();
    
})

// ServerPost Controller
.controller('ServerPostCtrl', function($scope, $stateParams, ServerPostsData, $sce) {

    $scope.post = ServerPostsData.get($stateParams.serverpostId);
    
    $scope.content = $sce.trustAsHtml($scope.post.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.sharePost = function () {

        var subject = $scope.post.title;
        var message = $scope.post.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})

// RSS Feeds Controller
.controller('FeedsCtrl', function($scope, $ionicLoading, FeedsData, FeedsStorage) {
    
    $scope.feeds = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var data;
    
    FeedsData.async().then(
        // successCallback
        function() {
            data = FeedsData.getAll();

            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;
            
            $ionicLoading.hide();
            
        },
        // errorCallback 
        function() {
            data = FeedsStorage.all();
            console.log(data);
            $scope.storage = 'Data from local storage';
            
            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;
            
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
    var page = 1;
    // Define the number of the feed results in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.feeds.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    $scope.$apply();
    }; 
    
    $scope.getImage = function(index) {
    var selectedItem = $scope.feeds[index];
    var content = selectedItem.content;
    var element = $('<div>').html(content);
    var source = element.find('img').attr("src");
    return source;
    }
    
})

// RSS Feeds Controller
.controller('FeedsRefresherCtrl', function($scope, $ionicLoading, FeedsData, FeedsStorage) {
    
    $scope.feeds = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var data;
        
    var getData = function() {
    
        FeedsData.async().then(
            // successCallback
            function() {
                data = FeedsData.getAll();
                console.log(data);

                $scope.title = data.title;
                $scope.description = data.description;
                $scope.link = data.link;
                $scope.feeds = data.entries;

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

            },
            // errorCallback 
            function() {
                data = FeedsStorage.all();
                console.log(data);
                $scope.storage = 'Data from local storage';

                $scope.title = data.title;
                $scope.description = data.description;
                $scope.link = data.link;
                $scope.feeds = data.entries;

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // notifyCallback
            function() {}
        );
        
    }
    
    getData();
    
    $scope.doRefresh = function() {
        getData();  
    }
    
    $scope.getImage = function(index) {
    var selectedItem = $scope.feeds[index];
    var content = selectedItem.content;
    var element = $('<div>').html(content);
    var source = element.find('img').attr("src");
    return source;
    }
    
})

// RSS Feed Controller
.controller('FeedCtrl', function($scope, $stateParams, FeedsData, $sce) {
    
    $scope.entry = FeedsData.get($stateParams.entryId);
    
    $scope.content = $sce.trustAsHtml($scope.entry.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.shareEntry = function () {

        var subject = $scope.entry.title;
        var message = $scope.entry.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.entry.link;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})



// Plugins Controller
.controller('PluginsCtrl', function($scope, PluginsData) {
  $scope.items = PluginsData.items;
})

// Device Controller
.controller('DeviceCtrl', function($scope) {
  $scope.device = device;
})

// Notifications Controller
.controller('NotificationsCtrl', function($scope) {
    
    $scope.alertNotify = function() {
    navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };

    $scope.beepNotify = function() {
    navigator.notification.beep(1);
    };

    $scope.vibrateNotify = function() {
    navigator.notification.vibrate(3000);
    };

    $scope.confirmNotify = function() {
    navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
    
})

// Barcodescanner Controller
.controller('BarcodescannerCtrl', function($scope) {
    
    $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };
    
})

// Geolocation Controller
.controller('GeolocationCtrl', function($scope, $ionicLoading) {
    
    $scope.map = {
    center: {
        latitude: 45, 
        longitude: -73
    },
    marker: {},
    zoom: 5
    };

    $scope.loading = $ionicLoading.show({

      //The text to display in the loading indicator
      template: '<i class="icon ion-loading-c"></i> Getting current location',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    var options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(function(position) {

        $scope.map = {
            center: {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            },
            marker: {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            },
            zoom: 12
        };

        $ionicLoading.hide();
        
        }, function(error) {
        alert('Unable to get location: ' + error.message);
        $ionicLoading.hide();
    }, options);


})

// Seetings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage, NewsStorage, ProductsStorage, AboutStorage, FeedsStorage, PostsStorage, ServerPostsStorage) {
 
    $scope.settings = SettingsStorage.all();

    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };
    
    $scope.$watch('settings', function() { SettingsStorage.save($scope.settings) }, true);
    
    $scope.resetSettings = function() {
        SettingsStorage.clear();
        $scope.settings = SettingsStorage.all();
    };
    
    $scope.resetNewsStorage = function() {
        NewsStorage.clear();
    };
    
    $scope.resetProductsStorage = function() {
        ProductsStorage.clear();
    };
    
    $scope.resetAboutStorage = function() {
        AboutStorage.clear();
    };
    
    $scope.resetFeedsStorage = function() {
        FeedsStorage.clear();
    };
    
    $scope.resetPostsStorage = function() {
        PostsStorage.clear();
    };
    
    $scope.resetServerPostsStorage = function() {
        ServerPostsStorage.clear();
    };
    
})

.controller('AppCtrl', function($scope, $ionicModal,$ionicLoading, $timeout, MenuData, $ionicActionSheet, $ionicPopup, $http, $ionicPlatform) {
    
  $scope.items = MenuData.items;
    
  

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
    id:'1',
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

    $ionicModal.fromTemplateUrl('templates/signUp.html', {
        id: '2',
        scope: $scope
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
      $scope.modal1.hide();
      $scope.modal2.hide();
  },

  // Open the login modal
  $scope.login = function() {
      $scope.modal1.show();
      $scope.modal2.hide();
  };
  $scope.signup = function () {
      $scope.modal2.show();
      $scope.modal1.hide();
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

      url1="http://www.forwardingenuity.com/sweat_users.php"
      $http({ method: 'GET', url: url1, timeout: 5000 })
          .then(function (response) {
              var username = $("#username").val();
              var password=$("#password").val();

          for (i = 0; i < response.data.length; i++) {
              if (username == response.data[i].email) {
                  if (password == response.data[i].password){
                      window.localStorage.setItem("Logged", "1");
                      window.localStorage.setItem("Log_status", "1");
                      window.localStorage.setItem("Name", response.data[i].name);
                      window.localStorage.setItem("Name", response.data[i].name);
                      window.localStorage.setItem("email", response.data[i].email);
                      window.localStorage.setItem("province", response.data[i].province);
                      window.localStorage.setItem("user_id", response.data[i].id);
                  break;
                      }
              else{
                      window.localStorage.setItem("Logged", "0");
                      break;
                  }
                  
              }
              else
              {
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

        $scope.closeLogin();
        $ionicLoading.hide();
        if(window.localStorage.getItem("Logged")=="1"){
        var myPopup = $ionicPopup.show({
            template: 'Welcome '+window.localStorage.getItem("Name"),
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
  };
  
    // Perform the sign up action when the user submits the login form
  $scope.doSignup = function () {
      console.log('Doing sign up', $scope.SignupData);

      


      var url2 = "http://www.forwardingenuity.com/sweat_users_upl.php";
      var name = $("#name").val();
      window.localStorage.setItem("Name", name);
      var email = $("#email").val();
      var password = $("#pass").val();
      
    //  var el = document.getElementById("provinces");
      //  var province = el.options[el.selectedIndex].value;

      var province = $('#provinces option:selected').val()
      window.localStorage.setItem("province", province);
      var dataSt = "name=" + name + "&email=" + email + "&password=" + password + "&province=" + province
      if (password != '' && name != '' && email != '') {

          $scope.loading = $ionicLoading.show({
              template: '<i class="icon ion-loading-c"></i> Signing up',

              //Will a dark overlay or backdrop cover the entire view
              showBackdrop: false,

              // The delay in showing the indicator
              showDelay: 10
          });

          window.localStorage.setItem("empty", "0");
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
                      window.localStorage.setItem("Logged", "1");
                      window.localStorage.setItem("Name", name);
                      window.localStorage.setItem("email", email);
                      window.localStorage.setItem("province", province);
                      url1 = "http://www.forwardingenuity.com/sweat_users.php"
                      $http({ method: 'GET', url: url1, timeout: 5000 })
                          .then(function (response) {
                              for (var i = 0; i < response.data.length; i++) {
                                  if (response.data[i].email == window.localStorage.getItem("email")) {
                                      window.localStorage.setItem("user_id", response.data[i].id);
                                  }
                              }
                          })
                  }
                  else if (data == "error") {
                      window.localStorage.setItem("signed_up", "2");
                  }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  window.localStorage.setItem("signed_up", "3");
              }

          });

      }
      else {
          window.localStorage.setItem("empty", "1");
      }
                    
                   // return false;

      
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system

      


      if (window.localStorage.getItem("empty") == "0") {

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

      }
     
      else {
          var myPopup = $ionicPopup.show({
              template: 'Name/Password/email cannot be left empty',
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

  };

    // Triggered on a button click, or some other target
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<b>Share</b> This' },
           { text: 'Move' }
         ],
         destructiveText: 'Delete',
         titleText: 'Modify your album',
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
           return true;
         }
        });

    };



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

// Feed Plugin Categories Controller
.controller('FeedPluginCategoriesCtrl', function($scope, $ionicLoading, FeedPluginData) {
    
    $scope.categories = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    
    FeedPluginData.asyncCategories().then(
        // successCallback
        function() {
            $scope.categories = FeedPluginData.getCategories();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
})

// Feed Plugin Category Controller
.controller('FeedPluginCategoryCtrl', function($scope, $ionicLoading, $stateParams, FeedPluginData) {
    
    $scope.id = $stateParams.id;
    $scope.title = FeedPluginData.getCategoryTitle($stateParams.id);
    $scope.items = FeedPluginData.getCategory($stateParams.id);
    
})

// Feed Plugin Feeds Controller
.controller('FeedPluginMasterCtrl', function($scope, $ionicLoading, $stateParams, FeedPluginData) {
    
    $scope.feeds = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var data;
    
    FeedPluginData.async($stateParams.categoryId, $stateParams.id).then(
        // successCallback
        function() {
            data = FeedPluginData.getResult();

            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;
            FeedPluginData.setFeeds($scope.feeds);
            
            $ionicLoading.hide();
            
        },
        // errorCallback 
        function() {
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
    var page = 1;
    // Define the number of the feed results in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.feeds.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    $scope.$apply();
    }; 
    
    $scope.mediaObject = function(item) {
        return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
    }

    $scope.hasVideo = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
        return media.type ? (media.type == "video/mp4") : false;
    }

    $scope.hasAudio = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        return media.type ? (media.type == "audio/mp3") : false;
    }
    
    $scope.getImage = function(index) {
    var selectedItem = $scope.feeds[index];
    var content = selectedItem.content;
    var element = $('<div>').html(content);
    var source = element.find('img').attr("src");
    return source;
    }
    
})

// Feed Plugin Feed Controller
.controller('FeedPluginDetailCtrl', function($scope, $stateParams, FeedPluginData, $sce) {
    
    $scope.entry = FeedPluginData.getFeed($stateParams.id);
    
    $scope.content = $sce.trustAsHtml($scope.entry.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.shareEntry = function () {

        var subject = $scope.entry.title;
        var message = $scope.entry.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.entry.link;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
    $scope.mediaObject = function(item) {
        return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
    }

    $scope.hasVideo = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
        return media.type ? (media.type == "video/mp4") : false;
    }

    $scope.hasAudio = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        return media.type ? (media.type == "audio/mp3") : false;
    }

    $scope.getTrustedResourceUrl = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
})

// YouTube Videos Controller
.controller('YouTubeVideosCtrl', function($scope, $ionicLoading, YouTubeData) {
    
    $scope.videos = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var getData = function() {
        
        YouTubeData.async().then(
            // successCallback
            function() {
                $scope.videos = YouTubeData.getVideos();
                console.log($scope.videos);
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // errorCallback 
            function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // notifyCallback
            function() {}
        );
    }
    
    getData();
    
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 6;
    
    $scope.doRefresh = function() {
        getData();  
    }
    
    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.videos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;       
    }; 
    
})

// YouTube Video Controller
.controller('YouTubeVideoCtrl', function($scope, $stateParams, YouTubeData, $sce) {
    $scope.video = {};
    $scope.video = YouTubeData.getVideo($stateParams.videoId);
    
    $scope.content = $sce.trustAsHtml($scope.video.snippet.description);
    
    $scope.getVideoUrl = function () {
        var videoUrl= 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;
        return $sce.trustAsResourceUrl(videoUrl);
    }
    
    $scope.shareVideo = function () {

        var subject = $scope.video.snippet.title;
        var message = $scope.video.snippet.description;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})