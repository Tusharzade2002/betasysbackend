import Tasks from "../Models/Tasks.js"
import Projects from "../Models/Projects.js"

export const getalltasks = async(req,res)=>{
      const task = await Tasks.find().populate('Tasks')
      res.json(task)
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
            
            const updatedProjet = await Projects.findByIdAndUpdate({_id:projectID}, {tasks:projectData.tasks}, {new:true})
            console.log(" update", updatedProjet)

            if(!updatedProjet){
                  return res.status(400).json({message:"Something went wromg, while updating Project!"})
            }

            return res.status(200).json({message:"Task Added suessfully", data: updatedProjet})

      }
      catch(err){
            return res.status(500).json({message:"Internal server error", error:err})
      }


}