import { User } from "../models/users.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { UserRoleEnum } from "../utils/constants.js";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projects",
        foreignField: "_id",
        as: "projects",
        pipeline: [
          {
            $lookup: {
              from: "projectmembers",
              localField: "_id",
              foreignField: "projects",
              as: "projectmembers",
            },
          },
          {
            $addFields: {
              members: {
                $size: "$projectmembers",
              },
            },
          },
          {
            $unwind: "$project",
          },
          {
            $project: {
              project: {
                _id: 1,
                name: 1,
                description: 1,
                members: 1,
                createdAt: 1,
                createdBy: 1,
              },
              role: 1,
              _id: 0,
            },
          },
        ],
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, projects, "Projects Fetched Successfully"))
});
const getProjectById = asyncHandler(async (req, res) => {
  const {projectId} = req.params
  const project = await Project.findById(projectId)

  if(!project){
    throw new ApiError(404, "Project not found")
  }

  return req.status(200).json(new ApiResponse(200, "project fetched Successfully"))
});
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRoleEnum.ADMIN,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created Successfully"));
});
const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    { new: true },
  );

  if (!project) {
    throw new ApiError(404, "Project not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Updated Successfully"));
});
const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new ApiError(404, "Project not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Deleted Successfully"));
});
const addMemebersToProject = asyncHandler(async (req, res) => {});
const getProjectMembers = asyncHandler(async (req, res) => {});
const updateMembersRole = asyncHandler(async (req, res) => {});
const deleteMembers = asyncHandler(async (req, res) => {});

export {
  addMemebersToProject,
  createProject,
  deleteMembers,
  getProjects,
  getProjectById,
  getProjectMembers,
  updateMembersRole,
  updateProject,
  deleteProject,
};
