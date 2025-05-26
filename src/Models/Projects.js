import mongoose from "mongoose"
const newProjects = new mongoose.Schema({
            projectName:{
                type:String,
                required: true
            },
            tasks:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Tasks"
            }]

})
const Projects = mongoose.model("Projects",newProjects)
export default Projects