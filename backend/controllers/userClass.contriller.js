const userClassModel = require('../models/userClass.model')
const classModel = require("../models/class.model")

async function getAllUserClass(req, res) {
    try {
        const result = await userClassModel.find({})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getUserClassById(req, res) {
    try {
        const { id } = req.params;
        const result = await userClassModel.findById(id)
        if(!result) return res.status(404).send({message: "user-class not found"})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function addUserClass(req, res) {
    try {
        const { joinCode } = req.params
        const {userId} = req.body
        const classToJoin = await classModel.findOne({ joinCode })
        if (!classToJoin) {
            return res.status(404).send({message: "Class not found"})
        }
        if(userId.toString() === classToJoin.userId.toString()){
            return res.status(409).send({message: "You cannot join your own class"})
        }
        const classToJoinId = classToJoin._id
        await userClassModel.create({ userId, classId: classToJoinId })
        res.status(201).send(userId)
    } catch (err) {
    if (err.code === 11000) {
        return res.status(409).send({ message: "User already in this class" })
    }

    res.status(500).send({ message: err.message })
}
}

async function getUserClassByUser(req, res) {
    try {
        const { userId } = req.params
        const result = await userClassModel.find({userId})
        //if(result.length < 1) return res.status(404).send({message:"user not found"})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteAllUserClass(req, res) {
    try{
        const result = await userClassModel.deleteMany({})
        res.status(200).send(`${result.deletedCount} deleted`)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function getJoinedUsers(req, res) {
    try{
        const {id} = req.params
        const result = await userClassModel.find({classId:id})
        // if(result.length < 1){
        //     return res.status(404).send({message:`class ${id} not found`})
        // }
        const joined = result.map(j => j.userId)
        res.status(200).send(joined)
    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllUserClass,
    getUserClassById,
    addUserClass,
    getUserClassByUser,
    deleteAllUserClass,
    getJoinedUsers
}