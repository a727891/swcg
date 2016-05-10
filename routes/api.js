/*
 * Serve JSON to our AngularJS client
 */
var jsonfile = require('jsonfile');
var fs = require('fs');

var slidesPath = './public/media/slides/';
var imgsrcPath = "media/slides/";

var file = './data/db.json';

exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

exports.Slides = function(req, res){
    fs.readdir(slidesPath,function(err,files){
        var slides = {};
        files.map(function(file){
            var dot = file.indexOf(".");
            var fileBase = file.substr(0,dot);
            var ext = file.substr(dot+1);
            if(!slides[fileBase]){
                slides[fileBase] = {};
            }
            if(ext=="txt"){
                slides[fileBase].caption = fs.readFileSync(slidesPath+file,'utf8');
            }else{
                slides[fileBase].src = imgsrcPath+file;
            }

        });
        slides = Object.keys(slides).map(function (key) {return slides[key]});
        res.json({
            slides:shuffle(slides)
        });
    });
};
function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

exports.signup = function(req,res){
    console.log("new signup",req.body);
    jsonfile.readFile(file, function(err, obj) {
        if(!obj){
            obj = [];
        }
        obj.push(req.body);
        jsonfile.writeFile(file,obj,function(err){
            res.json({error:err});
        });
    });

};

exports.getList = function(req,res){
    jsonfile.readFile(file,function(err,obj){
        if(!obj){
            res.json({error:err});
        }else{
            res.json(obj);
        }
    });
};