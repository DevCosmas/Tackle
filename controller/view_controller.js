const { taskModel } = require("../model/task")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
async function userTask(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = 5;
        const skip = (page - 1) * pageSize;

        const userId = res.locals.user.id
        const userTasks = await taskModel.find({ user: userId }).skip(skip).limit(pageSize);
        if (!userTasks) return res.status(404).json({ result: "FAIL" })
        res.status(200).render('searchQuery', { userTasks, page, pageSize });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}
async function getUserTaskStat(req, res) {
    try {
        const userId = res.locals.user.id
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

        const taskStats = await taskModel.aggregate(pipeline)
        res.status(200).render('stats', { taskStats });


    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }
}

    async function queryTask(req, res) {
        const filter = req.query.filter;
        const page = parseInt(req.query.page) || 1;
        const pageSize = 5;
        const skip = (page - 1) * pageSize;
        const userId = res.locals.user.id;
    
        let filteredTasks = [];
    
        try {
            if (filter === 'all') {
                filteredTasks = await taskModel.find({ user: userId }).skip(skip).limit(pageSize);
            } else if (filter === 'pending') {
                filteredTasks = await taskModel.find({ user: userId, status: 'pending' }).skip(skip).limit(pageSize);
            } else if (filter === 'completed') {
                filteredTasks = await taskModel.find({ user: userId, status: 'completed' }).skip(skip).limit(pageSize);
            } else if (filter === 'deleted') {
                filteredTasks = await taskModel.find({ user: userId, status: 'deleted' }).skip(skip).limit(pageSize);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    
        res.render('searchQuery', { filteredTasks, page, pageSize , filter});
    }
    




module.exports = {
    userTask, getUserTaskStat, queryTask
}