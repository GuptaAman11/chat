// 
const Connection = require('../models/connection');
const User = require('../models/User');
const sendConnection = async(req, res) => {
    const {targetId} = req.body;
    const user = req.user.user._id;
    if(!user){
        return res.status(401).json({message: "Unauthorized"});
    }
    if(!targetId){
        return res.status(400).json({message: "Target ID is required"});
    }
    if(user === targetId){
        return res.status(400).json({message: "You cannot send a connection request to yourself"});
    }
    try {
        const findConnection = await Connection.findOne({
            requester: user,
            target: targetId
        });
        if(findConnection){
            return res.status(400).json({message: "Connection request already sent"});
        }
        const findConnection2 = await Connection.findOne({
            requester: targetId,
            target: user
        });
        if(findConnection2){
            return res.status(400).json({message: "Connection request already sent by the other user"});
        }
         await Connection.create({
            requester: user,
            target: targetId,
        })
        return res.status(200).json({message: "Connection request sent"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const connectionAccepted = async(req, res) => {
    const {connectionId, status} = req.body;
    const user = req.user.user._id;
    if(!user){
        return res.status(401).json({message: "Unauthorized"});
    }
    if(!connectionId){
        return res.status(400).json({message: "Connection ID is required"});
    }
    if(!status){
        return res.status(400).json({message: "Status is required"});
    }
    if(status !== "accepted" && status !== "rejected"){
        return res.status(400).json({message: "Status must be either accepted or rejected"});
    }
    try{
        if(status === "rejected"){
            await Connection.deleteOne({
                _id: connectionId
            });
            return res.status(200).json({message: "Connection request rejected"});
        }

        const findConnection = await Connection.findOne({
            _id: connectionId
        });
        if(!findConnection){
            return res.status(400).json({message: "Connection request not found"});
        }
        if(findConnection.target.toString() !== user){
            return res.status(401).json({message: "Unauthorized"});
        }
        if(findConnection.status !== "pending"){
            return res.status(400).json({message: "Connection request already accepted or rejected"});
        }
        findConnection.status = status;
        await findConnection.save();

        return res.status(200).json({message: "Connection request " + status});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

    const findPendingRequest = async(req, res) => {
        const user = req.user.user._id;
        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }
        try{
            const pendingRequests = await Connection.find({
                target: user,
                status: "pending"
            }).populate("requester", "name email")
            .populate("target", "name email");
            return res.status(200).json({pendingRequests});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }
    const findUnconnectedUsers = async (req, res) => {
        const loggedInUserId = req.user.user._id;
    
        try {
            // Step 1: Fetch all users who are connected or have pending requests
            const connectedUsers = await Connection.find({
                $or: [
                    { requester: loggedInUserId }, // Sent requests
                    { target: loggedInUserId }    // Received requests
                ]
            }).select('requester target');
    
            // Step 2: Extract unique user IDs
            const connectedUserIds = new Set();
            connectedUsers.forEach(conn => {
                connectedUserIds.add(conn.requester.toString());
                connectedUserIds.add(conn.target.toString());
            });
    
            // Add the logged-in user to the set
            connectedUserIds.add(loggedInUserId.toString());
    
            // Step 3: Query for users not in the connectedUserIds
            const unconnectedUsers = await User.find({
                _id: { $nin: Array.from(connectedUserIds) }
            }).select('name email'); // Fetch only necessary fields
    
            res.status(200).json(unconnectedUsers);
        } catch (error) {
            console.error('Error fetching unconnected users:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    };
    
    const findDisplayUsers = async (req, res) => {
        const user = req.user.user._id;
        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }
        try{
            const friends = await Connection.find({
                $or :[
                    {requester : user  , status : "accepted"},
                    {target : user  , status : "accepted"}

                ]
            }).populate("requester", "name email") // Populate the requester details
            .populate("target", "name email") // Populate the target details
            .exec();
            const connectedUserDetails = friends.map((connection)=>{
                const isRequester = String(connection.requester._id) === String(user);
                const connectedUser = isRequester ? connection.target : connection.requester;
                return({
                    userId : connectedUser._id ,
                    name : connectedUser.name 
                })
                
            })
            return res.json({connectedUserDetails}) ;
        }catch(error){
            return res.json({message : error})
        }
    }
    

    

module.exports = {
    sendConnection,
    connectionAccepted,
    findPendingRequest,
    findUnconnectedUsers,
    findDisplayUsers
}