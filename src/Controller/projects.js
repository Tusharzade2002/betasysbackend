import Projects from "../Models/Projects.js"
import Tasks from "../Models/Tasks.js"

export const addprojects = async(req,res)=>{
    try{
        const { projectName, task} = req.body;

        if(!projectName){
            return res.status(400).json({message:"Please provide Project name"})
        }

        const ctreatedProject = await Projects.create({projectName, tasks: task || []})

        if(!ctreatedProject){
            return res.status(401).json({message:"Something went wrong, while creating project!"})
        }
        return res.status(201).json({message:"Project created sccessfully", data: ctreatedProject})
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
   
}

// export const Asigntasks =async(req,res)=>{
//     const {UserId , title}=req.body;
//     const task =await Tasks.create({title});
//     const user =await Projects.findById(UserId);
//     console.log(user);
//     user.tasks.push(task._id)
//     await user.save()
//     res.json({
//         message:"task assign to user",user,title
//     })
// }

export const getProjects = async (req, res) => {
    

    try{
        const alldata = await Projects.find().populate('tasks')
        // console.log(alldata)
        if(!alldata){
            return res.status(404).json({message:"Projects not found"})
        }
        return res.status(200).json({message:"All Projects", data:alldata})
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}