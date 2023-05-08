require('dotenv').config()
const fs =require("fs");
const express=require("express")
const bodyparser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")
const app=express()
const session=require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const morgan=require("morgan")
const formidable = require('express-formidable');
const cors=require("cors")
const { ObjectID } = require('mongodb');
const { Http2ServerRequest } = require('http2');
var emailverify="";
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use('/public',express.static("public"))
app.use(session({
  secret: 'pundamavanaedei',
  resave: false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect('mongodb://localhost:27017/tourist', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true);
const touristSchema=new mongoose.Schema({
  Email:String,
  Password:String,
  googleId:String
}) 
touristSchema.plugin(passportLocalMongoose)
touristSchema.plugin(findOrCreate)
const User=new mongoose.model("User",touristSchema)
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



app.get("/",function(req,res)
{
  console.log("ff")
  res.render("register")
})
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get("/auth/google/home",
    passport.authenticate("google", { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/choosingsides");
    });
app.get("/home",function(req,res)
{
  //if(req.isAuthenticated())
  //{
    res.render("home")
    console.log(emailverify);
  
  //}
  //else {
    //res.rediect("/login")
  //}
})
app.get("/login",function(req,res)
{
  res.render("login")
})

app.post("/register",function(req,res)
{
  User.register({username: req.body.username}, req.body.password,function(err,User){
    async function app(){
         https.post('/',arg=req.body.username,function(err,res)
         {
           if(err)
           {
            console.log(err);
           }
         })
    }
    if(err)
    {
      console.log(err)
      res.redirect("/login")
      
      
    }
    else {
      passport.authenticate("local")(req,res,function(){
        emailverify=req.body.username;
        res.redirect("/choosingsides")
      })
    }
  })
})
app.post("/login/:GETTED",function(req,res) {
  
     const doom= new User({
       username:req.body.username,
       password:req.body.password
     })
     req.login(doom,function(err)
     {
       if(err)
       {
         console.log(err)
         res.redirect("/login")
       }
       else {
         passport.authenticate("local")(req,res,function(){
           emailverify=req.body.username;
           res.redirect("/choosingsides")
         })
       }
       })
})
app.get("/choosingsides",function(req,res)
{
  res.render("choosingsides")
})
const PostSchema= new mongoose.Schema({
  roomtitle:{
      type:String
  },
  roomdesc :{
      type:String
  },
  roomlocation:{
      type:String,
  },
  from:{
      type:Date
      //required:"required"
  },
  to:{
      type:Date
      //required:"required"
  },
  price:{
      type:Number,
      required:true
  },
   image:{
      data:Buffer,
      contentype:String
  },
  bed:{
      type:Number
  },
  postedby:{
      type:String
  }
},
{timestamps:true})

const SaveSchema=new mongoose.Schema({
  saveid:{
     type:String,
     required:true  
  },
  savename:{
      type:String,
      required:true
  },
  roomdesc:{
    type:String
  },
  roomlocation:{
  type:String,
  },
  from:{
    type:Date
  },
  to:{
    type:Date
  },
  price:{
    type:Number
  },
  bed:{
    type:Number
  },
  bookedby:{
     type:String
  }
}) 
const bot= mongoose.model("ownerbookinginfromatiom",PostSchema)
const pro=mongoose.model("bookedhotels",SaveSchema)
app.post("/posthotel",formidable(),async function(req,res)
{
    try
    {
      let fields=req.fields;
      let files=req.files;
      let Owner=new bot(fields);
    // console.log(files);
    // console.log(fs.readFileSync(files.roomimg.path))
      if(files.roomimg)
     {
         Owner.image.data=fs.readFileSync(files.roomimg.path)
         Owner.image.contentype=files.roomimg.type
     }
     Owner.postedby=emailverify;
     Owner.save( function(err,result)
     {
         if(err)
         {
             console.log(err)

         }
         else
         {
             console.log("Succesfulllysaved");
             res.status(200).send("finally i am happy");
       
        }
     }
     )}
     catch(err)
     {
         console.log(err);
     }   
})
app.get("/client/home",async function(req,res)
{
    var items=await bot.find({}).select('-image.data');
    console.log("req is complicated");
    res.json(items);
   

})
app.get("/single/:hotelid",async function(req,res)
{
    var singlehotel=await bot.findById(req.params.hotelid).select('-image.data')
    res.send(singlehotel);
})
app.get("/collect/image/:picture",async function(req,res)
{ 
    console.log(req.params.picture)

    const hotellings = await bot.findById(req.params.picture)
  
    res.send(hotellings.image.data)
})
app.post("/bookhotel",formidable(),async function(req,res)
{
    let fielditems=req.fields;
    console.log(fielditems);
    const booked=new pro(fielditems);
    booked.bookedby=emailverify;
    booked.save(function(err,result)
    {
       if(err)
       {
           console.log(err)
       }
       else
       {
           console.log('booking successfull')
       }
    })
})
app.get("/check/:checkhotelid",async function(req,res)
{
    const checkid=req.params.checkhotelid;
    pro.findOne({saveid:req.params.checkhotelid},function(err,order)
    {
            if(order)
            {
                console.log(true);
                res.send({results:true});
            }
            else
            {
                console.log(false);
                res.send({results:false});
            }

    })
    
})
app.post("/search",async function(req,res)
{
   const location=(req.body.location)
   const bed=(req.body.bed)
   console.log(location)
   console.log(bed)
   let result=await bot.find({'bed':bed,'roomlocation':location}).select('-image.data')
   console.log(result);
   res.send(result);
})
app.get("/lala", function(req,res)
{
  console.log(emailverify)
  bot.find({'postedby':emailverify},  function(err,dogecoins){
    if(err)
    {
      console.log(err)
    }
    else
    {
      console.log(dogecoins)
      res.send(dogecoins)   
    }
   
  })
  
  
})


app.get("/task", function(req,res)
{
  bot.find({'postedby':emailverify},  function(err,dogecoins){
    if(err)
    {
      console.log(err)
    }
    else
    {
      console.log(dogecoins)
      res.send(dogecoins)   
    }
   
  })
  
  
})
app.get("/clientdash", function(req,res)
{
  console.log(emailverify)
  pro.find({'bookedby':emailverify},  function(err,dogecoins){
    if(err)
    {
      console.log(err)
    }
    else
    {
      console.log(dogecoins)
      res.send(dogecoins)   
    }
   
  })
  
  
})




app.listen(3002,function(req,res)
{
  console.log("my server is running")
})