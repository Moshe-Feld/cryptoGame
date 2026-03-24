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
        const { _id } = req.params;
        const findUser = await userModel.findById(_id);
        if (!findUser) {
            return res.status(404).send("user undefine")
        }
        res.status(200).send(findUser);
    } catch (err) {
        console.error(err.message);
    }
}

async function getUserByUserName(req, res) {
    try {
        const { userName } = req.params;
        const result = await userModel.findOne({ userName });
        res.status(200).send({ exists: !!result, user: result || null });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


async function addUser(req, res) {
    try {
        const body = req.body;
        const newUser = { ...body, coins: 50, level: 1 }
        await userModel.create(newUser);
        res.status(200).send(newUser);
    } catch (err) {
        console.error(err.message);
    }

}

async function updateUser(req, res) {
    try {
        const { _id } = req.params;
        const { coins = 0, level = 0, filmLevel = 0, peopleLevel = 0, tvLevel = 0, quoteId = "" } = req.body;
        const result = await userModel.findById(_id);

        if (!result) return res.status(404).send("user not found");
        await userModel.updateOne(
            { _id },
            { $inc: { coins, level, filmLevel, peopleLevel, tvLevel } }
        );
        const updatedUser = await userModel.findById(_id);
        if (!updatedUser.levelCompleted.includes(quoteId)) {
            updatedUser.levelCompleted.push(quoteId);
            await updatedUser.save();
        }
        res.status(200).send(updatedUser);
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
            return res.status(404).send(`${userName} is undefine`)
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
        if (!result) return res.status(404).send(`user not found`);
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
    addUser,
    deleteAllUsers,
    updateUser,
    updateProfile,
    resetPass
}