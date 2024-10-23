import { Router } from "express";
import { login } from "../controllers/AuthController";
import authMiddleware from "../middlewares/AuthMiddleware";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/ChatGroupController";
import {
  chatGroupUserIndex,
  chatGroupUserStore,
} from "../controllers/ChatGroupUserController";
import { getAllChats } from "../controllers/ChatController";
const router = Router();

router.post("/auth/login", login);

router.get("/chat-group", authMiddleware, index);
router.post("/chat-group", authMiddleware, store);
router.get("/chat-group/:id", authMiddleware, show);

router.put("/chat-group/:id", authMiddleware, update);
router.delete("/chat-group/:id", authMiddleware, destroy);

//chat group users
router.get("/chat-group-users", chatGroupUserIndex);
router.post("/chat-group-users", authMiddleware, chatGroupUserStore);
router.get("/chats/:groupId", getAllChats);

export default router;
