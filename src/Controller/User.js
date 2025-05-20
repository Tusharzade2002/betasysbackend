export const userregister = async(req,res)=>{
    const {name,email,age,username,Address,Password} =req.body;
     
}

export const userlogin=async(req,res)=>{
    res.send("User Login.........")
}

export const userlogout =async(req,res)=>{
    res.send("user logout.......")
}