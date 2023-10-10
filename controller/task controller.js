const { taskModel } = require("../model/task")

async function getAll(req, res) {
    try {
        if (req.user === true) {
            const query = req.query
            const task = await taskModel.find(query).select('name createdAt').sort({ name: -1 })
            if (!task) return res.status(404).json({ result: "FAIL" })
            res.status(200).json({ result: "SUCCES", size: task.length, task })
        }
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}
async function createNewTask(req, res) {
    try {
        const body = req.body
        body.user = req.user._id

        if (req.user.active === true) {
            const newTask = await taskModel.create(body)
            res.status(201).json({ result: "SUCCESS", message: 'A new task has been added', newTask })
        }
        else { res.status(404).json({ result: 'FAIL', message: 'User does not exist kindly signUp' }) }

    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }
}
async function updateTask(req, res) {
    try {
        const taskToBeUpdated = req.body
        if (req.user.active === true) {
            const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, taskToBeUpdated, { new: true, runValidators: true })
            res.status(201).json({ result: "SUCCESS", message: 'task has been updated', updatedTask })
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
            const { id } = req.params
            const deleteTask = await taskModel.findByIdAndDelete(id)
            deleteTask.status = 'deleted'
            res.status(203).json({ result: "SUCCESS", message: 'A task has been deleted' })
        }

    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}

async function getTaskStats(req, res) {
   try{
    const pipeline = [
        {
            $match: {

                $or: [
                    { status: "pending" },
                    { status: "completed" },
                    { status: "deleted" }
                ]
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        },  {
            $project: {
              _id: 0,
              status: "$_id",
              count: 1,
            },
          }

    ]
    if (req.user.active === true) {
        const taskStats = await taskModel.aggregate(pipeline)
        res.status(200).json({result:'SUCESS', taskStats})

}
   } catch(err){
    res.status(500).json({ message: "internal server error", error: err.message })
   }
}

module.exports = { getAll, deleteTask, updateTask, createNewTask, getTaskStats }