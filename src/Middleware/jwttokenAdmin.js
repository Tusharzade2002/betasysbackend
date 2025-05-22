import jwt from 'jsonwebtoken'
 const verifysuperadmintoken = async(req,res,next)=>{
    
     const authHeader = req.headers.authorization;
     if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.json({
            success:false,
            message:"Token Not Provided"
        })
     }

      const token = authHeader.split(' ')[1];

      try{
                const decoded =jwt.verify(token,process.env.JWT_SIGNATURE);

      }catch(err){
        return res.json({
            success:false,
            message:"Invaid or Token Expire"
        })
      }
     
 }