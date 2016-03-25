angular.module('app')
    .controller('UserController', function($scope, $http){
        var _this = this;

        this.getCoordinates = function(){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { "address": this.adressUser }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    var location = results[0].geometry.location,
                        lat = location.lat(),
                        lng = location.lng();
                }
                document.getElementById('latitude').value = location.lat();
                document.getElementById('longitude').value = location.lng();
                $('#latitude').trigger('input');
                $('#longitude').trigger('input');
            });
        }

        this.getUsers = function(){
            if(this.latitude != undefined && this.longitude != undefined)
            {
                $http.get('/api/users/', {params:{"lat": this.latitude, "lng": this.longitude}})
                    .then(function (res) {
                        _this.users = res.data;
                    })
            }
        }

        this.getUsers();

        this.sendUser = function() {
            $http.post('/api/users', this.newusr)
                .then(function() {
                    _this.getUsers();
                });
            this.newusr = {};
        };

    })