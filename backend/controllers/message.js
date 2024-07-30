const Message = require('../models/message')
const User = require('../models/User')
const Chat = require('../models/chat')
const addMessage = async(req , res) => {
    const { content , chat} = req.body ;
    if(!content){
        return res.json({msg : "Cant send the empty message"}) ;

    }
    try {
       var message = await Message.create({
        sender : req.user.user._id ,
        content : content ,
        chat : chat
       })

        message = await User.populate(message ,{
        path : "chat.users" ,
        select : "name email"
       })

       await Chat.findByIdAndUpdate(chat , {
        latestMessage : message
       })

       return res.status(200).json(message) ;
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


const allMessages = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };

module.exports = {
    addMessage ,
    allMessages 
}