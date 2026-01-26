import express from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import { createCard, deleteCard, updateCard, getAllCards, searchCards } from "../controllers/card.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const route = express.Router();

route.get("/all", isLoggedIn, getAllCards);
route.get("/search/:query", isLoggedIn, searchCards);
route.post("/create", isAdmin, upload.single("background"), createCard);
route.put("/update/:id", isAdmin, upload.single("background"), updateCard);
route.delete("/delete/:id", isAdmin, deleteCard);

export default route;