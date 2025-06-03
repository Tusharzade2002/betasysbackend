
import {insertMediaMiddleware} from "./media.controller.js"

export const uploadfile =async(req,res)=>{
try{
            const files = req.files?.avatar || [];
            const userId = req.user?.id;
 
             if(!files || !userId){
                return res.status(400).json({
                    success:false,
                    message:"NO file and user Id provide",
                })
             }

             const result =await insertMediaMiddleware(files ,userId);
             console.log(result);
             return res.status(200).json({
                success:true,
                message:"file uploaded successfullyy...",
                data:result
             })
             

}catch(err){
 console.log(err);
 return res.status(500).json({
    success:false,
    message:"Internal server error",
    err:err.message
 })
}
}


