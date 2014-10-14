/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    
function AppGeneralCtrl($scope, $http, $templateCache) {          
    
    
    $scope.UnityCtrlAjax = function(filter) {
         $http.get('http://rems.local/api/building?filter=[{"property": "site_type", "value" : "'+filter+'", "operator": "="}]').
            success(function(data) {
                 $scope.posts = data; // response data 
            });        
    } 
    
    $scope.UnityCount = function() {
   
         $http.get('http://rems.local/api/building/categorycount').
            success(function(data) {
                 $scope.unity = {
                    scolastico: (data.param1["edificio scolastico"]!=null) ? data.param1["edificio scolastico"] : 0,
                    commerciale: (data.param1["edificio commerciale"]!=null) ? data.param1["edificio commerciale"] : 0,
                    sanitaria: (data.param1["struttura sanitaria"]!=null) ? data.param1["struttura sanitaria"] : 0,
                    ricreativaculturale: (data.param1["struttura ricreativa e culturale"]!=null) ? data.param1["struttura ricreativa e culturale"]!=null : 0,
                    altro: (data.param1["altro"] != null) ? data.param1["altro"] : 0,
                }
                // $scope.unity.scolastico = 1;//data.data.totalCount; // response data 
            });        
    }  
    
    $scope.showUnityDetails = function(id,address,lat,long) {
      $http({method: 'GET', url: 'http://rems.local/api/building/' + id, cache: $templateCache}).
          success(function(data, status, headers, config) {
              $scope.appDetail = data;               //set view model
             // $scope.view = './Partials/detail.html'; //set to detail view
             $scope.showGoogleMap(address,lat,long);
          }).
          error(function(data, status, headers, config) {
              $scope.appDetail = data || "Request failed";
              $scope.status = status;           
          });
  } 
  
  $scope.showGoogleMap = function(address,lat,long) {     
        App.initializeMap("map", address,lat, long);       
  }  
  
  
   $scope.myusers = [];
   
   $scope.AssemblyListViewAjax = function() {
       if($scope.myusers.status == 1) {
         $http.get('http://rems.local/api/assemblypartecipants?filter=[{"property": "users_id", "value" : "'+$scope.myusers.userid+'", "operator": "="}]').
            success(function(data) {
                 $scope.calls = data; // response data                  
            });        
        }else{
            return false;
        }
    } 
    
    
     $scope.ContractListViewAjax = function() {                  
             $http({method: 'GET', url: 'http://rems.local/api/contractinvitation', cache: $templateCache}).
                success(function(data, status, headers, config) {
                    $scope.contracts = data;               //set view model                  
                }).
                error(function(data, status, headers, config) {
                    $scope.contracts = data || "Request failed";          
                });       
    } 
  
  $scope.submitLogin = function() {
       
            
    if ($scope.username && $scope.password) {
             
      $http.get('http://rems.local/api/assemblypartecipants/condominium/'+$scope.username+'/'+$scope.password).
            success(function(data) {
                if(data.result.result == "ok") {
                                  
                    $scope.myusers.username = $scope.username;                  
                    $scope.myusers.status = '1';
                    $scope.myusers.fullname = data.result.fullname;
                    $scope.myusers.userid = data.result.userid;
                  
               
                     $scope.loginstatus = true;
                     $scope.loginform = true;
                     $scope.loginmessage = false;
                     
                    $scope.AssemblyListViewAjax();
                     
                } else {
                        $scope.loginmessage = true;
                        $scope.loginmessagetxt = 'Username/Email o Password errati.';
                    }
            }); 
      
        }          
    
  }
  

  
  }

 
  
  
  
 
  
  var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }


    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {

        // Show the selected image
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
        smallImage.src = imageURI;
    }


    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function uploadPhoto() {

        //selected photo URI is in the src attribute (we set this on getPhoto)
        var imageURI = document.getElementById('smallImage').getAttribute("src");
        if (!imageURI) {
            alert('Please select an image first.');
            return;
        }

        //set upload options
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.params = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            workplace: document.getElementById("workplace").value
        }

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      console.log('Failed because: ' + message);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        //alert("Response =" + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

 