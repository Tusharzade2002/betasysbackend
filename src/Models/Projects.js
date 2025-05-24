import mongoose, { Schema } from "mongoose"
const newProjects = new mongoose.Schema({
            project:{
                name:String,
                required:true
            },
            tasks:{
                type:Schema.Types.ObjectId,
                ref:"Tasks"
            }

})
const Projects = mongoose.model("Projects",newProjects)
export default Projects