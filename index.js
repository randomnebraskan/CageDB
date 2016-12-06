var http = require('http');
var express = require('express');
var app = express();
var url = require('url');
var path = require('path');
//var db = require('./connectDB');
var connect = require('connect');
var MongoClient = require('mongodb').MongoClient,format = require('util').format,assert = require('assert');
var fs = require('fs');
var data = require('./data');
var computing;
var electronics;
var monitors;
var networking;
var peripherals;
var testequip;


http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end()//('Hello World\n');
});

app.listen(3001, '0.0.0.0');

var bodyParser = require('body-parser');

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json());
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(express.static(__dirname + '/'));
//app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res)
{
  res.sendFile('index.html', { root: __dirname + "/" } );
});

app.get('/computing', function (req, res)
{
  res.sendFile('computing.html', { root: __dirname + "/" } );
//  console.log(student);
//  console.log(item);
});

app.get('/electronics', function (req, res)
{
  res.sendFile('electronics.html', { root: __dirname + "/" } );
});

app.get('/monitors', function (req, res)
{
  res.sendFile('monitors.html', { root: __dirname + "/" } );
});

app.get('/networking', function (req, res)
{
  res.sendFile('networking.html', { root: __dirname + "/" } );
});

app.get('/peripherals', function (req, res)
{
  res.sendFile('peripherals.html', { root: __dirname + "/" } );
});

app.get('/testequip', function (req, res)
{
  res.sendFile('testequip.html', { root: __dirname + "/" } );
});

app.get('/admin', function (req, res)
{
  res.sendFile('admin.html', { root: __dirname + "/" } );
});

// app.get('/data', function (req, res)
  // {

  //   //res.sendFile('data.js');
  //   // var data = db.getDocuments();
  //   // getDocuments(function(docs) {

  //   //   console.log(data);
  //   //   res.send(data);
  //   // });
  //     monitors.find({}).toArray(function(err, docs)
  //       {
  //         assert.equal(err, null);
  //         //console.log("Found the following records: ");
  //         //console.log(docs);
  //         // return docs;
  //         // json_info = docs;
  //         // callback(docs);
  //         res.send(docs);
  //       });
// })

app.get('/computing_data', function (req, res)
{
    computing.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})

app.get('/electronics_data', function (req, res)
{
    electronics.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})

app.get('/monitors_data', function (req, res)
{
    monitors.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})

app.get('/networking_data', function (req, res)
{
    networking.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})

app.get('/peripherals_data', function (req, res)
{
    peripherals.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})

app.get('/testequip_data', function (req, res)
{
    testequip.find({}).toArray(function(err, docs)
      {
        assert.equal(err, null);
        res.send(docs);
      });
})


app.get('/admin_data1', function (req, res)
{
  computing.find({}).toArray(function(err, docs)
    {
      assert.equal(err, null);
      res.send(docs);
    });
})

app.get('/admin_data2', function (req, res)
{
  monitors.find({}).toArray(function(err, docs)
    {
      assert.equal(err, null);
      res.send(docs);
    });
})

app.get('/admin_data3', function (req, res)
{
  networking.find({}).toArray(function(err, docs)
    {
      assert.equal(err, null);
      res.send(docs);
    });
})

app.get('/admin_data4', function (req, res)
{
  peripherals.find({}).toArray(function(err, docs)
    {
      assert.equal(err, null);
      res.send(docs);
    });
})

app.post('/admin_post', function(req, res)
{
  var its_id = req.body.itemid;
    
  var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
  {
    if (err)
    {
      console.log("Nope");
      throw err;
    }
    else
    {
      console.log("Connected in admin_post!");
      console.log(its_id);
      var id = require('mongodb').ObjectID(its_id);
        computing = db.collection('computing');
        computing.update({_id:id},{$set: {availible:true, name: ""}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });

        networking = db.collection('networking');
        networking.update({_id:id},{$set: {availible:true, name: ""}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });

        monitors = db.collection('monitors');
        monitors.update({_id:id},{$set: {availible:true, name: ""}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });

        peripherals = db.collection('peripherals');
        peripherals.update({_id:id},{$set: {availible:true, name: ""}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });
      }
  })
  res.redirect('/admin');
})


app.post('/computing_post', function(req, res)
{
  var my_id = req.body.netid;
  var its_id = req.body.itemid;

    
  var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
  {
    if (err)
    {
      console.log("Nope");
      throw err;
    }
    else
    {
      console.log("Connected in computing_post!");
      console.log(its_id);
      //its_id += 'ObjectId('+its_id+')';
      var id = require('mongodb').ObjectID(its_id);
      //console.log(id);
      // computing.findOne({_id:its_id},function(err,object)
      // {
      // object.availible.set('false')
      computing = db.collection('computing');
        //var idHex = document.its_id.toHexString();
          // computing.findOne({_id: id}, function(err, doc)
          // {
          //    if (err)
          //    {
          //      console.log("Nothing found");
          //      throw err;
          //    }
          //    else
          //    {
          //      console.log('Found it!');
          //    }
        // })

        computing.update({_id:id},{$set: {availible:false, NetId: my_id}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });
      }
})

  // 'name': my_id}}, 
  
  // console.log(my_id);
  // console.log(its_id);
  // console.log('status: SUCCESS');
  res.redirect('/computing');
});

app.post('/networking_post', function(req, res)
{
  var my_id = req.body.netid;
  var its_id = req.body.itemid;

    
  var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
  {
    if (err)
    {
      console.log("Nope");
      throw err;
    }
    else
    {
      console.log("Connected in networking_post!");
      console.log(its_id);
      //its_id += 'ObjectId('+its_id+')';
      var id = require('mongodb').ObjectID(its_id);
      //console.log(id);
      // networking.findOne({_id:its_id},function(err,object)
      // {
      // object.availible.set('false')
      networking = db.collection('networking');
        networking.update({_id:id},{$set: {availible:false, NetId: my_id}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });
      }
})
  res.redirect('/networking');
});

app.post('/monitors_post', function(req, res)
{
  var my_id = req.body.netid;
  var its_id = req.body.itemid;

    
  var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
  {
    if (err)
    {
      console.log("Nope");
      throw err;
    }
    else
    {
      console.log("Connected in monitors_post!");
      console.log(its_id);
      //its_id += 'ObjectId('+its_id+')';
      var id = require('mongodb').ObjectID(its_id);
      //console.log(id);
      // monitors.findOne({_id:its_id},function(err,object)
      // {
      // object.availible.set('false')
      monitors = db.collection('monitors');
        monitors.update({_id:id},{$set: {availible:false, NetId: my_id}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });
      }
})
  res.redirect('/monitors');
});

app.post('/peripherals_post', function(req, res)
{
  var my_id = req.body.netid;
  var its_id = req.body.itemid;

    
  var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
  {
    if (err)
    {
      console.log("Nope");
      throw err;
    }
    else
    {
      console.log("Connected in peripherals_post!");
      console.log(its_id);
      //its_id += 'ObjectId('+its_id+')';
      var id = require('mongodb').ObjectID(its_id);
      //console.log(id);
      // peripherals.findOne({_id:its_id},function(err,object)
      // {
      // object.availible.set('false')
      peripherals = db.collection('peripherals');
        peripherals.update({_id:id},{$set: {availible:false, NetId: my_id}},function(err, result)
        {
          if (err) throw err;
          else if(result)
          {
            console.log('No Error');
            //console.log(result);
          }
          else
          {
            console.log('No match for the searched doc: '+its_id);
          }
        });
      }
})
  res.redirect('/peripherals');
});


var db = MongoClient.connect('mongodb://localhost:27017/inventory',function(err,db)
{
  if (err)
  {
    console.log("Nope");
    throw err;
  }
  else
  {
    console.log("Connected!");
    computing = db.collection('computing');
    electronics = db.collection('electronics');
    monitors = db.collection('monitors');
    networking = db.collection('networking');
    peripherals = db.collection('peripherals');
    testequip = db.collection('testequip');
  }

  // console.log("Closing");
  // db.close();
  // console.log("Closed");

})


// app.listen(3001, '0.0.0.0');
console.log('Server Running at http://192.168.70.25:3001');


































// const querystring = require('querystring');



// var bodyParser = require('body-parser');

// // app.use(require('body-parser').urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// var multer = require('multer'); // v1.0.5
// var upload = multer(); // for parsing multipart/form-data

// app.post('/computing_post', upload.array(), function (req, res)
// {
//   console.log(querystring.parse(url.parse(req.url, true)));
//   console.log(req.query.netid);


  // console.log(req.body);
    // var tester = res.json(req.body);
    //console.log(tester);




    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;

    // console.log(query); //{Object}
    // console.log(url_parts);





  
    //console.log(querystring.parse());


































    // var net_id = req.query.netid;
    // var item_id = req.query.itemid;

    // console.log(net_id);
    // console.log(item_id);




    // var temp1 = req.body.netid;
    // var temp2 = req.body.itemid;

    // console.log(temp1);
    // console.log(temp2);



    // var student = "";
    // var item = "";
    
    // var student = req.body.student,
    //       item = req.body.item;
    


    // console.log("NOTICE");
    // console.log(student);
    // console.log(item);
     //  db.collection('computing').updateOne(
     //    { "_id" : "VARIABLE" },
     //    {
     //      $set: { "availible": false },
     //      $set: { "netid": VARIABLE}
     //    }, function(err, results) {
     //    console.log(results);
     //    callback();
   // });
//})





// to support JSON-encoded bodies


//  app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
//    extended: true
//  }));
//  app.use(express.json());       // to support JSON-encoded bodies
//  app.use(express.urlencoded()); // to support URL-encoded bodies
// app.use(express.bodyparser());





























//var jsdom = require('jsdom').jsdom;
//var domready = require("domready");


//var obj = {
  // var getDocuments = function(callback) 
  // {
  //     var json_info;
  //     // Find some documents
  //     collection.find({}).toArray(function(err, docs)
  //     {
  //       assert.equal(err, null);
  //       console.log("Found the following records: ");
  //       console.log(docs);
  //       // return docs;
  //       // json_info = docs;
  //       callback(docs);
  //     });
  //     // return json_info;
  // }

  // findDocuments: function(db, callback) 
  // {
  // // domready(function()
  // // {
  //    // Get the computing collection
  //    var collection = db.collection('computing');
  //    var json_info = collection;
  // //   var para = document.getElementById("para");
  // //   para.innerHTML = "";
  //    // Find some documents
  //    collection.find({}).toArray(function(err, docs)
  //    {
  //      assert.equal(err, null);
  //      console.log("Found the following records: ");
  //      console.log(docs);
  //      callback(docs);
        
  //      //json_info = JSON.parse(json_info);

  //  /*
  //      json_info.forEach(function(json_info)
  //      {
  //        var newentry = para.insertRow();
  //        newentry.innerHTML = "<td>" + json_info.model + "</td>" + "<td>" + json_info.requires + "</td>" + "<td>" + json_info.MAC + "</td>";
  //      });
  //  */
  //    });
  // //   return json_info;
  // // })
  // }
//};



/*
  var collection = db.collection('computing');
    var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

    collection.insert(docs, {w:1}, function(err, result) 
    {
      var stream = collection.find({mykey:{$ne:2}}).stream();
      stream.on("data", function(item) {});
      stream.on("end", function() {});
    });
*/

//var tbody = document.getElementById("tbody");
//tbody.innerHTML = "YEEEEEEEEEEEEEEEEEEEEEEEEEESSSSS!";


//module.exports = obj;









/*
app.get('data.js', function(req, res)
{
  var data = findDocuments();
  res.sendFile('data.js');
  res.render('index.html', {
    locals: {
      data : data,
    }
  });
});
*/



/*
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});
*/






//================================================================================================================================



/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('<b>Hello World</b>');
}).listen(3001, "0.0.0.0");
console.log('Server running at http://0.0.0.0:3001/');
*/

//================================================================================================================================

/*
var http = require('http'),
    fs = require('fs');

  
    fs.readFile('./test.html', function (err, html) {
        if (err) {
            throw err; 
        }

    

    http.createServer(function(request, response) {
        //response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(js);
        response.end(); 

     
    }).listen(3001, "192.168.70.25");
console.log('Server running at http://192.168.70.25:3001/');
});
*/


//================================================================================================================================

/*
var http = require('http'),
    fs = require('fs');

http.createServer(function (reg, res) {

   //if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'

      fs.readFile(__dirname + '/test.html', function (err, html) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
      });

    //}

    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile(__dirname + '/public/js/script.js', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });

    }  

    //if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile(__dirname + '/custom.css', function (err, css) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end();
      });

    //}

}).listen(3001, "0.0.0.0");
console.log('Server running at http://192.168.70.25:3001/');

*/

//================================================================================================================================

/*
var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Herro rittle doggy");
    response.end();
}).listen(3001);
console.log('Server running at http://192.168.70.25:3001/');
*/

//================================================================================================================================

/*
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3001;

//var chatBuffer = [];

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/chat', function(req, res){
  console.log("message was sent");
  var lastMessage = {
    username: req.query.name,
    message: req.query.line
  };
  chatBuffer.push(lastMessage);
});


//app.get('/update',function(req,res){
// res.setHeader('Content-Type', 'application/json');
// res.send(JSON.stringify(chatBuffer));
//});

*/