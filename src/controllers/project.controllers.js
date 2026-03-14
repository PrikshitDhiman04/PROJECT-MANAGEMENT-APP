import { User } from "../models/users.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api_errors.js";
import { asyncHandler } from "../utils/async-handler.js";

const getProjects = asyncHandler(async (req, res) => {
    
})
const getProjectById = asyncHandler(async (req, res) => {
    
})
const createProject = asyncHandler(async (req, res) => {
    
})
const updateProject = asyncHandler(async (req, res) => {
    
})
const deleteProject = asyncHandler(async (req, res) => {
    
})
const addMemebersToProject = asyncHandler(async (req, res) => {
    
})
const getProjectMembers = asyncHandler(async (req, res) => {
    
})
const updateMembersRole = asyncHandler(async (req, res) => {
    
})
const deleteMembers = asyncHandler(async (req, res) => {
    
})

export {
    addMemebersToProject,
    createProject,
    deleteMembers,
    getProjects,
    getProjectById,
    getProjectMembers,
    updateMembersRole,
    updateProject,
    deleteProject
};
