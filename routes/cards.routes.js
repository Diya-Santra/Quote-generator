import express from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import { createCard, deleteCard, updateCard, getAllCards } from "../controllers/card.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const route = express.Router();

route.get("/all", isLoggedIn, getAllCards);
route.post("/card/create", isAdmin, upload.single("background"), createCard);
route.put("/card/update/:id", isAdmin, upload.single("background"), updateCard);
route.delete("/card/delete/:id", isAdmin, deleteCard);

export default route;