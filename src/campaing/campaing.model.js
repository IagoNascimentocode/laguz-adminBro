const mongoose = require('mongoose');

const CampaingSchema = new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String},
    isDead:{type:String},
    type:{type:String},
    gender:{type:String},
    document:{type:String},
    age:{type:Number},
    phones:[{type:String}],
    created_at:{type:Date,default:Date.now},
 
});

const Campaing = mongoose.model("Campaing",CampaingSchema);

module.exports = {CampaingSchema,Campaing}