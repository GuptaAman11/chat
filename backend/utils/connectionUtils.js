const User = require('../models/User')

const updateUserStatusFunction =async(userId ,targetUserId , newStatus)=>{
    try {
        console.log("executing")
        await User.findOneAndUpdate(
            {
                _id: userId, // Match the document
                "connections.userId": targetUserId, // Match the specific array element
            },
            {
                $set: {
                    "connections.$.status": newStatus, // Update the status
                    "connections.$.lastUpdated": new Date(), // Update the timestamp
                },
            },
            { new: true } // Return the updated document
        );
    
       
    } catch (error) {
        throw error ;
    }

         
   
}



module.exports = {
    updateUserStatusFunction,
}

