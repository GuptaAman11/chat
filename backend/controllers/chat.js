const User = require('../models/User')
const Chat = require('../models/chat')

const accessChat = async (loggedInUser , userId, res) => {
    if (!userId) {
      return res.status(404).json({ msg: "User not found" });
    } 
    console.log("logged in user",loggedInUser)
    console.log("user id",userId)
    try {
      const userName = await User.findById(userId)

      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: loggedInUser } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      }).populate("users", "-password").populate("latestMessage");
  
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
  
      if (isChat.length > 0) {
        return res.status(200).json({
          isChat : isChat[0] ,
          name : userName.name
        });
      } else {

        const chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [loggedInUser, userId],
        };
        console.log("excuted successfully")
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
        return res.status(200).json(FullChat);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };

  const fetchChat = async (req, res) => {
    const loggedInUserId = req.user.user._id;
  
    try {
      let chat = await Chat.find({ users: { $elemMatch: { $eq: loggedInUserId } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 });
  
      // Update the chatName for non-group chats
      chat = chat.map(singleChat => {
        if (!singleChat.isGroupChat) {
          const otherUser = singleChat.users.find(user => user._id.toString() !== loggedInUserId.toString());
          if (otherUser) {
            singleChat.chatName = otherUser.name; // Update the chatName to the other user's name
          }
        }
        return singleChat;
      });
  
      return res.status(200).json(chat);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const createGroupChat = async(req ,res) =>{
    const { userArray, chatName } = req.body;
    if(userArray.length < 2){
      return res.status(200).json({msg : "more than two user is required"})

    }
    userArray.push(req.user.user._id) ;
    try {
      const groupChat  = await Chat.create({
        chatName : chatName ,
        isGroupChat : true ,
        users : userArray ,
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

  const findSingleChat = async(req , res) => {
    try {
      const findSingleChat = await Chat.findById({
        _id : req.params.id
      }).populate("users")
      
      return res.status(200).json(findSingleChat); // Respond with a 200 status code for successful retrieval
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
    userInstance,
    findSingleChat
}