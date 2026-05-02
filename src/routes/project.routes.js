import { Router } from "express";
import {
  addMemebersToProject,
  createProject,
  deleteMembers,
  getProjects,
  getProjectById,
  getProjectMembers,
  updateMembersRole,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  addMemebersToProjectValidator,
  createProjectValidator,
} from "../validators/index.js";
import { userLoginValidator } from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRoleEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRoleEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRoleEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRoleEnum.ADMIN]),
    addMemebersToProjectValidator(),
    validate,
    addMemebersToProject,
  );

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRoleEnum.ADMIN]), updateMembersRole)
  .delete(validateProjectPermission([UserRoleEnum.ADMIN]), deleteMembers);

export default router;
