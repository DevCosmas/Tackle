const { taskModel } = require("../model/task")
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
async function userTask(req, res) {
    try {
        const page =  parseInt(req.query.page) || 1
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
            res.status(200).render('stats', { taskStats});

        
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }
}

module.exports = {
    userTask,getUserTaskStat
}