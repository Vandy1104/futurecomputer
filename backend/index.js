const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const Product = require('./models/products.js');

const port = 8081;

//connect to db
// const mongodbURI = 'mongodb+srv://beulasamuel:<password>@beudb-sxyu7.mongodb.net/test?retryWrites=true&w=majority';
const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/futurecom?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(err =>{
  console.log(`DBConnectionError: ${err.message}`);
});



//test the connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to mongo db');
});


app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//include this to go to the next middleware
});

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.get('/', (req, res) => res.send('Hello FutureCom!'))


//Add products.
app.post('/addProduct',(req,res)=>{
  //checking if user is found in the db already
  Product.findOne({coursename:req.body.coursename},(err,productResult)=>{

    if (productResult){
      res.send('product added already');
    } else {
       const dbProduct = new Product({
         _id : new mongoose.Types.ObjectId,
         coursename : req.body.coursename,
         image_url : req.body.image_url,
         description : req.body.description,
         duration : req.body.duration,
         faculty : req.body.faculty
       });
       //save to database and notify the user accordingly
       dbProduct.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    }
  })
});

//get all products / Courses
app.get('/allProductsFromDB', (req,res)=>{
  Product.find().then(result =>{
    res.send(result);
  })

});

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
