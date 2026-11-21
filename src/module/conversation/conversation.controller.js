import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/exceptions/success.response.js";
import { getConversationMessages, sendMessage } from "./conversation.service.js";

const router = Router();

router.post("/send/:conversationId", auth, async (req, res) => {
  const data = await sendMessage(req.params, req.body, req.user);

  successResponse({ res, data });
});

router.get("/messages/:conversationId", auth, async (req, res) => {
  const data = await getConversationMessages(req.params, req.user);

  successResponse({ res, data });
});

export default router;
