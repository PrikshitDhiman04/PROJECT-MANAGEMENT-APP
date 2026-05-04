import { User } from "../models/users.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { Subtask } from "../models/subtask.models.js";
import { ApiError } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRoleEnum } from "../utils/constants.js";


const getTasks = asyncHandler(async (req, res) => {
    //test
})
const createTask = asyncHandler(async (req, res) => {
    //test
})
const getTaskByTd = asyncHandler(async (req, res) => {
    //test
})
const updateTask = asyncHandler(async (req, res) => {
    //test
})
const deleteTask = asyncHandler(async (req, res) => {
    //test
})
const createSubTask = asyncHandler(async (req, res) => {
    //test
})
const deleteSubTask = asyncHandler(async (req, res) => {
    //test
})




export {
    createSubTask,
    createTask,
    deleteTask,
    deleteSubTask,
    getTaskByTd,
    getTasks,
    updateTask,

}

 
