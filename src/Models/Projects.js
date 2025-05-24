import mongoose, { Schema } from "mongoose"
const newProjects = new mongoose.Schema({
            projectName:{
                name:String,
                required:true
            },
            ID:{
                type:Schema.Types.ObjectId,
                ref:"Tasks"
            }

})
const Projects = mongoose.model("Projects",newProjects)
export default Projects