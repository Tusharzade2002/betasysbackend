import Members from "../Models/Members.js";
import Tasks from "../Models/Tasks.js";
export const CreateMember = async (req, res) => {
    try{
  const { name, email, address, age ,assignto} = req.body;

  if (!name || !email || !address || !age) {
    res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }
  const newMember = new Members({
    name,
    email,
    address,
    age,
  });

  if(!newMember){
    return res.status(401).json ({
        message : "erroe while creating array"
    })
  }
 
  const taskData = await Tasks.findOne({ _id: assignto });
  taskData.assignto=newMember._id

  const updateTasks = await Tasks.findByIdAndUpdate(
    { _id: assignto },
    { assignto: taskData.assignto },
    { new: true }
  );
  console.log(updateTasks);
  
  if (!updateTasks) {
    return res
      .status(400)
      .json({ message: "Something went wrong, while updating tasks!" });
  }
  res.status(200).json({
    success: true,
    message: "member created succefully",
    data: updateTasks,
  });
}catch(err){
     res.status(400).json({
    success: false,
    message: "internal server erro1r",
    error:err.message
  });
}
};
export const getallMembers = async(req,res)=>{
    const alldata  = await Tasks.find()
    if(!alldata){
        return res.json({
            success:false,
            message:"Data is empty",
            data:[]
        })
    }
            res.status(200).json({
                success:true,
                data:alldata,
                message:"fetch all data"
            })
}
export const DeleteMember =async (req,res)=>{
  try{
        const deleteData = await Members.findByIdAndDelete(req.params.id)
        if(!deleteData){
          return res.status(400).json({
            success:false,
            message:"Please Provide id"
          })
        }
        res.status(200).json({
          success:true,
          message:"Member delete succesfully....",
          data:deleteData
        })
  }catch(err){
  res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })
  }
}
export const getMemberById =async (req,res)=>{
  try{
         const getData = await Members.find({id :req.params._id})
          if(!getData){
            return res.status(400).json({
              success:false,
              message:"id not found"
            })
          }
          res.status(200).json({
            success:true,
            data:getData,
            message:"Data Fetcched Successfully",
          })
  }catch(err){

  }
}