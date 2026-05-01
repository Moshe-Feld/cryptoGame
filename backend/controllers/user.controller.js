const userModel = require("../models/user.modle");
const quoteModel = require("../models/quote.model")
async function getAllUsers(req, res) {
    try {
        const allUsers = await userModel.find();
        res.status(200).send(allUsers);
    } catch (err) {
        console.error(err.message);
    }
}

async function getUserById(req, res) {
    try {
        const { _id } = req.params;
        const result = await userModel.findById(_id);
        if (!result) {
            return res.status(404).send({message:"user not found"})
        }
        res.status(200).send(result);
    } catch (err) {
        console.error(err.message);
    }
}

async function getUserByUserName(req, res) {
    try {
        const { userName } = req.params;
        const result = await userModel.findOne({ userName });
        if(!result){
            return res.status(404).send({message: "No account found with this username"})
        }
        res.status(200).send(result);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getUserProgress(req, res) {
    try{
        const {_id} = req.params
        const {classId} = req.query
        const myUser = await userModel.findById(_id)
        if(!myUser){
            return res.status(404).send({message:`user: ${_id} not found`})
        }
        const classLevelsData = await quoteModel.find({classId})
        if(classLevelsData.length <= 0){
            return res.status(404).send({message:`class: ${classId} not found`})
        }
        const totalLevels = classLevelsData.length
        const classLevels = classLevelsData.map(item => item._id.toString())
        const myLevels = myUser.levelCompleted.filter(lc => classLevels.includes(lc.toString())).length
        res.status(200).send({totalLevels, myLevels})
    }catch(err){
        res.status(500).send(err.message)
    }
}


async function addUser(req, res) {
    try {
        const body = req.body;
        const newUser = { ...body, coins: 50, level: 1 }
        const result = await userModel.findOne({userName: body.userName})
        if(result) return res.status(409).send({message: "User name already exists!"})

        const checkEmail = await userModel.findOne({email: body.email})
        if(checkEmail) return res.status(409).send({message: "Email already exists"})
            
        await userModel.create(newUser);
        res.status(201).send(newUser);
    } catch (err) {
        console.error(err.message);
    }

}

async function updateUser(req, res) {
    try {
        const { _id } = req.params;
        const { coins = 0, level = 0, filmLevel = 0, peopleLevel = 0, tvLevel = 0, quoteId = "" } = req.body;
        const result = await userModel.findById(_id);

        if (!result) return res.status(404).send({message:"user not found"});
        await userModel.updateOne(
            { _id },
            { $inc: { coins, level, filmLevel, peopleLevel, tvLevel } }
        );
        if (!result.levelCompleted.includes(quoteId)) {
            result.levelCompleted.push(quoteId);
            await result.save();
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function updateProfile(req, res) {
    try {
        const { userName } = req.params;
        const dateToEdit = req.body
        const result = await userModel.findOneAndUpdate(
            { userName },
            { ...dateToEdit },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function resetPass(req, res) {
    try {
        const { email } = req.params;
        const result = await userModel.findOne({ email });
        if (!result) return res.status(404).send({message:`user not found`});
        result.password = "0000";
        await result.save()
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteAllUsers(req, res) {
    try {
        const result = await userModel.deleteMany({});
        res.status(200).send(`${result.deletedCount} users deleted`)
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUserName,
    getUserProgress,
    addUser,
    deleteAllUsers,
    updateUser,
    updateProfile,
    resetPass
}