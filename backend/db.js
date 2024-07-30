
const mongoose = require('mongoose')


const url = 'mongodb+srv://amangupta9579:aman@cluster0.7mv9hps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const Connection = () => {
      mongoose.connect(url).then(() => {
        console.log("concttioned!!!") })
    
}


module.exports = {
    Connection
}