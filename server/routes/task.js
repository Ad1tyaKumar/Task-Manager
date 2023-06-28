import express from 'express'
import {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    login,
    register,
    createToken,
    logout,
    getUser
} from '../controllers/controller.js'
const router = new express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/guest').post(createToken);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/user').get(getUser);
router.route('/register').post(register);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask); 
// router.router('/login').post()

export default router