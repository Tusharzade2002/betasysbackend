import Tasks from "../Models/Tasks.js"
import Projects from "../Models/Projects.js"

export const getalltasks = async(req,res)=>{
      const task = await Tasks.find().populate('Tasks')
      res.json(task)
      
const NoofData = async () => {
  const data= Projects.createIndexes({ name: "text" });
  console.log("dtata:",data);
  
};
NoofData();
}


export const Asigntasks =async(req,res)=>{
      //task create 
      try{
            const {taskName, taskDescription, dueDate, projectID} = req.body;

            if(!taskName || !dueDate){
                  return res.status(400).json({message:"Please provide task name and due date"})
            }

            const createdTask = await Tasks.create({
                  name: taskName,
                  description: taskDescription,
                  duedate: dueDate
            })


            if(!createdTask){
                  return res.status(400).json({message:"Something went wromg, while creating Task!"})
            }

            const projectData = await Projects.findOne({_id:projectID})
            
            projectData.tasks.push(createdTask._id)

            const updatedProject = await Projects.findByIdAndUpdate({_id:projectID}, 
                  {tasks:projectData.tasks},{new:true})
            console.log("update", updatedProject)
            if(!updatedProject){
                  return res.status(400).json({message:"Something went wrong, while updating Project!"})
            }
            return res.status(200).json({message:"Task Added successfully", data: updatedProject})
      }
      catch(err){
            return res.status(500).json({message:"Internal server error", error:err})
      }


}