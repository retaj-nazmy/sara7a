import { Router } from "express";

import { auth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/exceptions/success.response.js";

import {
  createRequest,
  getAcceptedRequests,
  getMyRequests,
  updateRequestStatus,
} from "./request.service.js";

const router = Router();

router.post("/send-request/:messageId", auth, async (req, res) => {
  const data = await createRequest(req.params, req.user);

  successResponse({ res, data });
});

router.get("/my-requests", auth, async (req, res) => {
  const data = await getMyRequests(req.user);
  successResponse({ res, message: "requests retrieved successfully", data });
});

router.patch("/:requestId", auth, async (req, res) => {
  const data = await updateRequestStatus(req.params, req.body, req.user);

  successResponse({ res, data });
});



router.get("/accepted-requests", auth, async (req, res) => {
  const data = await getAcceptedRequests(req.user);

  successResponse({ res, data });
});

export default router;
