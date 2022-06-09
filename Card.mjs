import mongoose from "mongoose";

const scheama=mongoose.Schema({
    name:String,
    sirname:String
})

export default mongoose.model('datas',scheama)