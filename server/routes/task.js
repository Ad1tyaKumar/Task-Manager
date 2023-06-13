import express from 'express'
import {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} from '../controllers/controller.js'
const router = new express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
// router.router('/login').post()

export default router