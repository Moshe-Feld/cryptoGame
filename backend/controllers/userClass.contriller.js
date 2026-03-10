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
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function addUserClass(req, res) {
    try {
        console.log(req.params)
        console.log(req.body)
        const { joinCode } = req.params
        const body = req.body
        const classToJoin = await classModel.findOne({ joinCode })
        const classToJoinId = classToJoin._id
        await userClassModel.create({ userId: body.userId, classId: classToJoinId })
        res.status(200).send(body)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function getUserClassByUser(req, res) {
    try {
        const { userId } = req.params
        const result = await userClassModel.find({ userId })
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllUserClass,
    getUserClassById,
    addUserClass,
    getUserClassByUser
}