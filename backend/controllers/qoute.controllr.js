const qouteModel = require('../models/qoute.model')

async function getAllQoutes(req, res) {
    try{
        const allQoutes = await qouteModel.find({});
        res.status(200).send(allQoutes);
    }catch(err){
        res.status(500).send(err.message);
    }
}
async function getQouteOfUser(req, res) {
    try{
        const {teacherId} = req.params
        const result = await qouteModel.find({teacherId: teacherId})
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function getQouteById(req, res) {
    try{
        const {_id} = req.params;
        const qoute = qouteModel.findOne({_id:_id})
        res.status(200).sen(qoute)
    }catch(err){
        res.status(500).send(err.message)
    }
}

async function postQoute(req, res) {
    try{
        const newQoute = req.body;
        await qouteModel.create(newQoute);
        res.status(200).send(newQoute)
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllQoutes,
    getQouteOfUser,
    getQouteById,
    postQoute
}