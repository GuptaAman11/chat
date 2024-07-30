const User = require('../models/User')
const Chat = require('../models/chat')

const accessChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(404).json({ msg: "User not found" });
    }
  
    try {
      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      }).populate("users", "-password").populate("latestMessage");
  
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
  
      if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
      } else {
        const chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user.user._id, userId],
        };
  
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
        res.status(200).json(FullChat);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };

  const fetchChat = async(req ,res) => {
    try {
        const chat = await Chat.find({users:{$elemMatch : {$eq : req.user.user._id}}})
        .populate("users")
        .populate("latestMessage").populate("groupAdmin")
        .sort({updatedAt : -1})
        
        
        return res.status(200).json(chat)

    } catch (error) {
        return res.status(400).json(error)
    }
  }

  const createGroupChat = async(req ,res) =>{
    const user = JSON.parse(req.body.users) ;
    if(user.length < 2){
      return res.status(200).json({msg : "more than two user is required"})

    }
    user.push(req.user.user._id) ;
    try {
      const groupChat  = await Chat.create({
        chatName : req.body.chatName ,
        isGroupChat : true ,
        users : user ,
        groupAdmin : req.user.user._id
      })
      groupChat.save()
      return res.json(200).status(groupChat) ;
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  const addToGroupChat = async(req , res) => {
    const {chatId , userId} = req.body ;
    if(!chatId){
      return res.status(404).json({msg : "group chat not found"})
    }
    if(userId){
      return res.status(404).json({msg : "user not found"})

    }

    try {
      const updateChat = await Chat.findByIdAndUpdate(chatId ,
        {
        $push : {users : userId} ,
        } ,
        {
          new : true 
        }
      )

      updateChat.save()
      return res.json(updateChat)

    } catch (error) {
      return res.status(404).json(error)
    }
  }

  const removeFromGroupChat = async(req , res) => {
    const {chatId , userId} = req.body ;
    if(!chatId){
      return res.status(404).json({msg : "group chat not found"})
    }
    if(userId){
      return res.status(404).json({msg : "user not found"})

    }

    try {
      const updateChat = await Chat.findByIdAndUpdate(chatId ,
        {
        $pull : {users : userId} ,
        } ,
        {
          new : true 
        }
      )

      updateChat.save()
      return res.json(updateChat)
    } catch (error) {
      return res.status(404).json(error)
    }
  }

  
  const getAllUser = async(req ,res) =>{
    try {
      const user = await User.find({ _id: { $ne: req.user.user._id } });
      return res.json(user) ;
    } catch (error) {
      console.log(error)
    }
    
  }


  const userInstance = async(req , res) => {
    console.log(req.user.user._id)
    try {

      const findChat = await Chat.find({
        users : req.user.user._id
      }).populate("users")
      
      return res.status(200).json(findChat); // Respond with a 200 status code for successful retrieval
    } catch (error) {
      console.log(error)
    }
  }
module.exports = {
    accessChat ,
    fetchChat ,
    createGroupChat ,
    addToGroupChat ,
    removeFromGroupChat,
    getAllUser ,
    userInstance
}