/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

exports.Slides = function(req, res){
    res.json({
        slides:[
            {src:"media/501.gif",caption:"Bad Guys Doing Good"},
            {src:"media/mercs.png",caption:"Vode An!"},
            {src:"media/rebel.png",caption:"We're the good guys"}
        ]
    });
};