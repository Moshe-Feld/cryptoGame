const userModel = require("../models/user.modle");
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
        const { email } = req.params;
        const findUser = await userModel.findOne({ email: email })
        if (!findUser) {
            return res.status(404).send("user undefine")
        }
        res.status(200).send(findUser);
    } catch (err) {
        console.error(err.message);
    }
}

async function addUser(req, res) {
    try {
        const {email} = req.body;
        const newUser = { email, coins: 0, hints: 0 }
        await userModel.create(newUser);
        res.status(200).send(newUser);
    } catch (err) {
        console.error(err.message);
    }

}

async function deleteAllUsers(req, res){
    try{
       const result = await userModel.deleteMany({});
       res.status(200).send(`${result.deletedCount} users deleted`)
    } catch(err){
        console.error(err.message);
    }
}

// async function editUser(req, res) {
//     try {
//         const { email, coins, hints } = req.query;
//         await userModel.findOneAndUpdate(
//             {email: email},
//             {coins: coins, hints: hints}
//         )
//        res.status(200).send("updated");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

async function addCoinsToUser(req, res) {
    try{
        const {email} = req.params;
        const updateCoins = await userModel.findOneAndUpdate(
            {email: email},
            {$inc: {coins: 10}},
            {new: true}
        )
        res.status(200).send(updateCoins);
    }catch(err){
        res.status(500).send(err.message);
    }
}

async function setLevel(req, res) {
    try{
        const {email} = req.params;
        const updateLevel = await userModel.findOneAndUpdate(
            {email: email},
            {$inc: {level: 1}},
            {new: true}
        );
        res.status(200).send(updateLevel)
    }catch(err){
        res.status(500).send(err.nessage);
    }
}
async function getTop10(req, res) {
    try{
        const top10 = await userModel.find().sort({coins: -1}).limit(10);
        res.status(200).send(top10)
    }catch(err){
        res.status(500).send(err.message);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteAllUsers,
    addCoinsToUser,
    setLevel,
    getTop10
}