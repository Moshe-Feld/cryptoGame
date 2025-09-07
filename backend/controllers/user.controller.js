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
        const findUser = await userModel.find({ email: email })
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
        const body = req.body.email;
        const newUser = { "email": body, "coins": 0, "hints": 0 }
        await userModel.create(newUser);
        res.status(200).send("user added");
    } catch (err) {
        console.error(err.message);
    }

}

async function editUser(req, res) {
    try {
        const { email, coins, hints } = req.query;
        await userModel.findOneAndUpdate(
            {email: email},
            {coins: coins, hints: hints}
        )
       res.status(200).send("updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    editUser
}