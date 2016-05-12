var jsonfile = require('jsonfile'); 
var json2csv = require('json2csv');
var fs = require('fs');
//CSV fields
var fields = ["name","email","groups.imp","groups.reb","groups.merc","comment"];
var fieldnames = ["Name","Email","501st","Rebel Legion","Mercs","Comments"];

var file = './data/db.json';
var outFile = './CostumeInterest.csv';

jsonfile.readFile(file,function(err,obj){
    if(err){
        console.log(err);
    }else{
        if(!obj){
            console.log('nothing found in the data file');
        }else{
            json2csv({data:obj,fields:fields,fieldNames:fieldnames},function(err,csv){
                if(err){
                    console.log(err);
                }else{
                    fs.writeFile(outFile,csv,function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('csv file created');
                        }
                        
                    });
                }
            });
        }
    ;
    }

});