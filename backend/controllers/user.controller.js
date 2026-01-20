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
        if (!result) {
            return res.status(404).send(`${userName} undefine`);
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function addUser(req, res) {
    try {
        const body = req.body;
        const newUser = { ...body, coins: 0, level: 1 }
        await userModel.create(newUser);
        res.status(200).send(newUser);
    } catch (err) {
        console.error(err.message);
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

// async function updateUser(req, res) {
//     try {
//         const email = req.params.email;
//         const { coins, level } = req.body;
//         const fields = {}
//         if (coins) fields.coins = coins;
//         if (level) fields.level = level;
//         const updatedUser = await userModel.findOneAndUpdate(
//             { email: email },
//             { $inc: fields },
//             { new: true }
//         )
//         res.status(200).send(updatedUser);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

async function updateUser(req, res) {
    try {
        const { _id } = req.params;
        const { coins = 0, level = 0, wikiLevels = 0, qouteId = "" } = req.body;

        console.log("1. Received _id:", _id);
        console.log("2. Request body:", req.body);

        const result = await userModel.findById(_id);
        console.log("3. Found user:", result);

        if (!result) return res.status(404).send("4. User not found");
        await userModel.updateOne(
            { _id },
            { $inc: { coins, level, wikiLevels } }
        );
        const updatedUser = await userModel.findById(_id);
         if (!updatedUser.levelCompleted.includes(qouteId)) {
            updatedUser.levelCompleted.push(qouteId);
            await updatedUser.save();
        }
        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function completedLevel(req, res) {
    try {
        const {_id} = req.params;
        const { qouteId } = req.body;
        const userCompleted = await userModel.findById(_id);
        if (!userCompleted) {
            return res.status(404).send(`${_id} undefine`);
        }
        if (!userCompleted.levelCompleted.includes(qouteId)) {
            userCompleted.levelCompleted.push(qouteId);
            await userCompleted.save();
        }
        res.status(200).send(`${_id} updated`);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUserName,
    addUser,
    deleteAllUsers,
    updateUser,
    completedLevel
}