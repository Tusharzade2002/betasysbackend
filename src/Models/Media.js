import mongoose from "mongoose"
const newMedia = new mongoose.Schema({
originalname:{
    type:String,
    requied:true
},
encoding:{
     type:String,
    requied:true
},
mimetype:{
     type:String,
    requied:true
},
filename:{
     type:String,
    requied:true
},
path:{
     type:String,
    requied:true
},
size:{
     type:String,
    requied:true
},
account:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin"
},
fullpath:{
     type:String,
    requied:true
}
})
const Mediasdata = mongoose.model("Medias",newMedia)
export default Mediasdata