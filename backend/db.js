
const mongoose = require('mongoose')
const User = require('./models/User')
const url = 'mongodb+srv://amangupta9579:aman@cluster0.7mv9hps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// // Update existing users to add the isOnline field if it doesn't exist
// const updateExistingUsers = async () => {
//   try {
//     await User.updateMany(
//       { isOnline: { $exists: false } },
//       { $set: { isOnline: false } }
//     );
//     const user = await User.find()
//     console.log(user)
//     console.log("Existing users updated with isOnline field");
//   } catch (error) {
//     console.error("Error updating existing users:", error);
//   }
// };


// updateExistingUsers();

const Connection = () => {
      mongoose.connect(url).then(() => {
        console.log("concttioned!!!") })
    
}


module.exports = {
    Connection
}