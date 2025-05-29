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
  taskData.assignto.push(newMember._id)

  const updateTasks = await Tasks.findByIdAndUpdate(
    { _id: assignto },
    { assignto: taskData.assignto },
    { new: true }
  );
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
    message: "internal server error",
    error:err.message
  });
}
};
export const getallMembers = async(req,res)=>{
    const alldata  = await Tasks.find();
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