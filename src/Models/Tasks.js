import mongoose from 'mongoose'
const newTask = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

const Tasks =mongoose.model("Tasks", newTask)
export default Tasks