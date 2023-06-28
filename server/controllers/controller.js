import { Guest, User } from "../models/Task.js";
import { sendCookie, tempCookie } from "../utils/features.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getAllTasks = async (req, res) => {
    try {
        const { 'Task-Manager': token1 } = req.cookies;
        const { 'Task-Guest': token2 } = req.cookies;
        const token = token2 ? token2 : token1;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const guest = await Guest.findById(decoded._id);
        const user = await User.findById(decoded._id);
        const tasks = guest ? guest.task : user.task;
        res.status(200).json({ tasks });

    } catch (e) {
        res.status(500).json({ msg: e });
    }
}

export const createTask = async (req, res) => {
    try {
        const { 'Task-Manager': token1 } = req.cookies;
        const { 'Task-Guest': token2 } = req.cookies;
        const token = token2 ? token2 : token1;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const guest = await Guest.findById(decoded._id);
        const user = await User.findById(decoded._id);
        if (guest) {
            await guest.updateOne({ $push: { task: req.body } });
            await guest.save();
            res.status(201).json(req.body);
        } else {
            await user.updateOne({ $push: { task: req.body } })
            await user.save();
            res.status(201).json(req.body);
        }

    } catch (e) {
        res.status(500).send(e);
    }
}
export const getTask = async (req, res) => {
    try {
        const { 'Task-Manager': token1 } = req.cookies;
        const { 'Task-Guest': token2 } = req.cookies;
        const token = token2 ? token2 : token1;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;
        let guest = await Guest.findById(decoded._id);
        let user = await User.findById(decoded._id);

        const tasks = (guest) ? guest.task : user.task;
        const task = tasks.find(Task => Task._id == id);
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
        const { 'Task-Guest': token } = req.cookies;


        const { id } = req.params;
        const { name, completed } = req.body;
        if (token) {
            const newTask = await Guest.findOneAndUpdate({ "task._id": id }, {
                $set: {
                    'task.$.name': name,
                    'task.$.completed': completed,
                },
            }, { new: true }).lean()
            if (!newTask) {
                return res.status(404).json({ msg: "NOT FOUND!" });
            }
            const tasks = newTask.task;
            const task = tasks.find(Task => Task._id == id);
            res.status(200).json({ task });
        } else {
            const newTask = await User.findOneAndUpdate({ "task._id": id }, {
                $set: {
                    'task.$.name': name,
                    'task.$.completed': completed,
                },
            }, { new: true }).lean()
            if (!newTask) {
                return res.status(404).json({ msg: "NOT FOUND!" });
            }
            const tasks = newTask.task;
            const task = tasks.find(Task => Task._id == id);
            res.status(200).json({ task });
        }
    } catch (e) {
        res.status(500).send({ msg: e });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { 'Task-Guest': token2 } = req.cookies;
        const { id } = req.params;
        if (token2) {
            const deletedTask = await Guest.findOneAndUpdate({ 'task._id': id }, { $pull: { task: { _id: id } } });
            if (!deletedTask) {
                return res.status(404).json({ msg: "NOT FOUND!" });
            }
            const tasks = deletedTask.task;
            const task = tasks.find(Task => Task._id == id);
            res.status(200).json({ task });
        } else {
            const deletedTask = await User.findOneAndUpdate({ 'task._id': id }, { $pull: { task: { _id: id } } });
            if (!deletedTask) {
                return res.status(404).json({ msg: "NOT FOUND!" });
            }
            const tasks = deletedTask.task;
            const task = tasks.find(Task => Task._id == id);
            res.status(200).json({ task });
        }

    } catch (e) {
        res.status(500).send({ msg: e });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.json('not exist');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json('wrong_pass');
        }
        res.cookie("Task-Guest", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        });

        sendCookie(user, res, 'matched', 200);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: e });
    }
}
export const logout = (req, res) => {
    res.cookie("Task-Manager", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
    }
    ).json({
        success: true,
    });
}
export const register = async (req, res) => {
    try {

        const { name, email, password, cpassword } = req.body;
        const { 'Task-Guest': token } = req.cookies;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const guest = await Guest.findById(decoded._id);
        let user = await User.findOne({ email });
        console.log();
        if (password != cpassword) {
            return res.json('pass_not_match');
        }
        if (user) {
            return res.json('email exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword, task: [] });
        for (let i = 0; i < guest.task.length; i++) {
            var addTask = { "name": guest.task[i].name, "completed": guest.task[i].completed };
            await user.updateOne({ $push: { task: addTask } })
        }
        res.cookie("Task-Guest", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        });
        sendCookie(user, res, 'registered', 201);
    } catch (e) {
        // console.log(e);
        res.status(500).send({ msg: e.name });
    }
}
export const createToken = async (req, res) => {
    try {
        const { 'Task-Manager': token1 } = req.cookies;
        const { 'Task-Guest': token2 } = req.cookies;
        if (!token1 && !token2) {
            console.log('hh');
            let guest = await Guest.create({ task: [] })
            return tempCookie(guest, res, 'created', 201);
        }
       
        res.send('already logged in');
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: e });
    }
}

export const getUser = async (req, res) => {
    try {
        const { 'Task-Manager': token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                user: null,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);   
        res.status(200).json({
            success: true,
            user,
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: e });
    }
}