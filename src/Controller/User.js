import User from '../Models/UserRegistration.js'
import bcrypt  from "bcrypt"
export const userregister = async(req,res)=>{
    const {name,email,age,username,Address,Password} =req.body;
     try{
          const newUser =new User({name,email,age,username,Address,Password})
           const Existing = await User.findOne({email});
           if(Existing){
              return res.status(409).json({
                success:false,
                message:"Email already axist"
              })
           }
      
           const salt=10;
           const hashpassword =await bcrypt.hash(Password,salt);
           const NewUser= new User({name,email,age,username,Address,Password:hashpassword})
           const SaveUser=await  NewUser.save()
           res.status(201).json({
            success:true,
            message:"User Registration successfully..",
            data:SaveUser
           })
        //   const SaveUser = await newUser.save();
        //   return res.json({
        //       success:true,
        //       message:"registration successfulyy ...",
        //       data:SaveUser
        //   })
     }catch(err){

     }
}

export const userlogin=async(req,res)=>{
    res.send("User Login.........")
}

export const userlogout =async(req,res)=>{
    res.send("user logout.......")
}