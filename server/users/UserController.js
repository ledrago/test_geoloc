var Users = require('./user.model');

module.exports = function(app){

    /*distance calcul in km*/

    var distance = function(lat1, lng1, lat2, lng2){
        var R = 6371;
        var dLat = deg2rad(lat2-lat1);
        var dLng = deg2rad(lng2-lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if(d <= 20){
            return true;
        }
        else {
            return false;
        }
    }


    function deg2rad(deg){
        return deg * (Math.PI/180)
    }


    /*!distance calcul in km*/

    app.get('/api/users', function(req, res) {
        Users.find(function(err, users) {
            var newArr = [];
            for(i = 0; i < users.length; i++)
            {
                newArr.push({"_id" : i, "state": distance(users[i].locations.lat, users[i].locations.lng, req.query.lat, req.query.lng)})
            }
            var nbDel = 0;
            for(i = 0; i < newArr.length; i++)
                {
                    if(newArr[i].state == false)
                        {
                            users.splice(newArr[i]._id - nbDel, 1);
                            nbDel++;
                        }
                }
            (err ? res.send(err) : res.json(users));
        });
    });

    app.post('/api/users', function(req, res) {
        Users.create(req.body, function(err) {
            (err ? res.send(err) : res.status(200).send());
        });
    });
}