import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (e) {
        res.status(500).json({ msg: e });
    }
}

export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (e) {
        res.status(500).json({ message: e })
    }
}
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ msg: "NOT FOUND!" });
        }
        res.status(200).json({ task });
    } catch (e) {
        res.status(500).json({ msg: "NO_ID" });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true, runValidators: true, useFindAndModify: false
        });
        console.log(task);
        if (!task) {
            return res.status(404).json({ msg: "NOT FOUND!" });
        }
        res.status(200).json({ task });
    } catch (e) {
        res.status(500).json({ msg: e });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).json({ msg: "NOT FOUND!" });
        }
        res.status(200).json({ task });
    } catch (e) {
        res.status(500).json({ msg: e });
    }
}

// export const