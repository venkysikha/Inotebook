const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser')
const jwt_secert="venkyIsAGoodBoy";
// create user using the endpoint :post
//route 1: 
router.post('/createuser',[body('password','password must be six letters long ').isLength({min:5}),
            body('email','enter the valid email').isEmail(),
            body('name','name must be 3 letters long').isLength({min:3})
],async(req,res)=>
{
   const errors=validationResult(req);
   console.log(User);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   }
   //check whether the email exists already

   try{
   let user=await User.findOne({email:req.body.email});
   if(user)
   {
      return res.status(400).json({error:"sorry a user with this email already exists"});
   }
// before creating the user iam going hash the password
   const salt= await bcrypt.genSalt(10);
   const secpas=await bcrypt.hash(req.body.password,salt);


   // creating the new user 

    user= await User.create({
    name:req.body.name,
    password:secpas,
    email:req.body.email,
   // }).then(user=>res.json(user)).catch(err=>{console.log(err)  
   //    res.json({error:"please enter valid email"})
 });
   const data={
      user:
      {
         id:user.id
      }
   }

   const AuthToken=jwt.sign(data,jwt_secert)
   res.json(AuthToken);
}catch(error)
{
   console.error(error.message);
   res.status(500).send("Internal Server Error");
}

})

//Authencate the user  using post:"/api/auth/login". no login required
//route 2:
router.post('/login',
   [body('password','password cannot be blank').exists(),
   body('email','enter the valid email').isEmail(),
],async(req,res)=>
{
   let success=false;
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

   const {email,password}=req.body;
   try {
         let user = await User.findOne({email});
         if(!user)
         {
            success=false
            return res.status(400).json({success,error:"please try to login with correct credentials"});
         }
         const passwordCompare= await bcrypt.compare(password,user.password);
         if(!passwordCompare)
         {
            success=false;
            return res.status(400).json({success,error:"please try to login with correct credentials"});
         }
         const playload ={
            user:{
               id:user.id
            }
         }
         const AuthToken=jwt.sign(playload,jwt_secert);
         success=true;
         res.json({success,AuthToken});

   }catch(error){
      console.error(error.message);
      res.status(500).send("internal server error occurred");
   }
})


//route3: get logged in user details using :post "/api/auth/getuser". login required
router.post('/getuser',fetchUser,async(req,res)=>
{
try{  
   userId=req.user.id;
   const user=await User.findById(userId).select("-password");
   res.send(user);
}catch(error)
{
   console.error(error.message);
      res.status(500).send("internal server error occurred");
}
})
module.exports=router
