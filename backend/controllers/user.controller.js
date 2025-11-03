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
        const { userName } = req.params;
        const findUser = await userModel.findOne({ userName: userName })
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
        const email = req.params.email; // לא destructure
        const { coins = 0, level = 0 } = req.body;

        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $inc: { coins, level } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).send("User not found");
        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getTop10(req, res) {
    try {
        const top10 = await userModel.find().sort({ coins: -1 }).limit(10);
        res.status(200).send(top10)
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteAllUsers,
    updateUser,
    getTop10
}