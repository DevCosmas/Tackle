const { taskModel } = require("../model/task")
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

async function getAll(req, res) {
    try {
        if (req.user.active === true) {
            const userId = req.user.id
            const userTasks = await taskModel.find({ user: userId });
            if (!userTasks) return res.status(404).json({ result: "FAIL" })
            res.status(200).json({ result: "SUCCES", size: userTasks.length, userTasks })
        }
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}

async function createNewTask(req, res) {
    try {
        const body = req.body;
        body.user = req.user._id;
        if (req.user.active === true) {
            const newTask = await taskModel.create(body);
           
            res.status(201).json({ result: "SUCCESS", message: 'A new task has been added', newTask });
        } else {
            res.status(404).json({ result: 'FAIL', message: 'User does not exist kindly sign up' });
        }
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message, stack: err.stack });
    }
}

async function updateTask(req, res) {
    try {
        if (req.user.active === true) {
            const task= await taskModel.findById(req.params.id)
            task.status='completed',
            await task.save();
            res.status(201).json({ result: "SUCCESS", message: 'task has been updated', task })
        }
        else {
            res.status(404).json({ result: 'FAIL', message: 'User does not exist kindly signUp' })
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}
async function deleteTask(req, res) {
    try {
        if (req.user.active === true) {
            const task= await taskModel.findById(req.params.id)
            task.status='deleted'
            await task.save();
            res.status(200).json({ result: "SUCCESS", message: 'A task has been deleted' , task})
        }else {
            res.status(404).json({ result: 'FAIL', message: 'User does not exist kindly signUp' })
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}

async function getTaskStats(req, res) {
    try {
        const userId = req.user._id
        const pipeline = [
            { $match: { user: new ObjectId(userId) } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            }

        ]
        if (req.user.active === true) {
            const taskStats = await taskModel.aggregate(pipeline)
            res.status(200).json({ result: 'SUCESS', taskStats })

        }
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }
}

module.exports = { getAll, deleteTask, updateTask, createNewTask, getTaskStats }