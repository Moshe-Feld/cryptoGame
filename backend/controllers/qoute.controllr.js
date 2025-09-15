const qouteModel = require('../models/qoute.model')
async function getQouteOfUser(req, res) {
    try{
        const {userId} = req.params
        const result = await qouteModel.find({userId: userId})
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
    getQouteOfUser,
    getQouteById,
    postQoute
}