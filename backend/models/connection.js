const mongoose = require("mongoose");
const ConnectionSchema = new mongoose.Schema({
    requester: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User" 
        }, // The logged-in user
    target: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User" 
        
        },    // The other user
    status: {
         type: String,
         enum: ["pending", "accepted", "rejected" ], 
         default: "pending"
         }, // The status of the connection request
    hasSender: {
         type: Boolean,
          default: true
         }, // Indicates who initiated the request
    lastUpdated: { 
        type: Date,
         default: Date.now
         }
});

const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;