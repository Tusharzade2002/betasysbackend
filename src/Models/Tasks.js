import mongoose from 'mongoose'
const newTask = new mongoose.Schema({
    name:{type:String, required:true},
    description:{
        type:String,
        required:false
    },
    duedate:{
        type:String,
        required:true
    },
    assignto:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Members"
    }]
},{timestamps:true})

const Tasks =mongoose.model("Tasks", newTask)
export default Tasks