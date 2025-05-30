import Tasks from "../Models/Tasks.js"
import Projects from "../Models/Projects.js"

export const getalltasks = async(req,res)=>{
      const task = await Tasks.find().populate("assignto")
      res.json(task)
}


export const Asigntasks =async(req,res)=>{
      //task create 
      try{
            const {name, description, duedate, projectID , member} = req.body;

            if(!name || !duedate){
                  return res.status(400).json({message:"Please provide task name and due date"})
            }

            const createdTask = await Tasks.create({
                  name ,
                  description ,
                  duedate ,
                  assignto : member
            })


            if(!createdTask){
                  return res.status(400).json({message:"Something went wromg, while creating Task!"})
            }

            const projectData = await Projects.findOne({_id:projectID})
            
            projectData.tasks.push(createdTask._id)

            const updatedProject = await Projects.findByIdAndUpdate({_id:projectID}, 
                  {tasks:projectData.tasks},{new:true})
            // console.log("update", updatedProject)
            if(!updatedProject){
                  return res.status(400).json({message:"Something went wrong, while updating Project!"})
            }
            return res.status(200).json({message:"Task Added successfully", data: updatedProject})
      }
      catch(err){
            return res.status(500).json({message:"Internal server error", error:err.message})
      }


}