import mongoose from "mongoose"
const newProjects = new mongoose.Schema({
            projectName:{
                type:String,
                required: true,
                unique:true
            },
            tasks:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Tasks"
            }]

})
newProjects.index({ tasks: 1 });

const Projects = mongoose.model("Projects",newProjects)
export default Projects