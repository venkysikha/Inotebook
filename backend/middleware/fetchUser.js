// middleware is the function  
var jwt=require('jsonwebtoken');
const jwt_secert="venkyIsAGoodBoy";
const fetchUser=(req,res,next)=>
{
    // get the user from jwt token and add id to req object 
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"please authencate using a valid token"});
    }

    try
    {
        const data =jwt.verify(token,jwt_secert);
        req.user=data.user;
        next();
    }
    catch(error)
    {
        res.status(401).send({error:"please authencate using a valid token"});
    }

}

module.exports=fetchUser;
