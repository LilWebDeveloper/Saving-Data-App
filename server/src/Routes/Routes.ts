import express from "express";
import userController from "../Controllers/Users";
import continentController from "../Controllers/Continents";

const router = express.Router();

router.post("/form", userController.addUser);
router.get("/form", userController.allUsers);
router.get("/form/:userId", userController.findByIdUser);
router.delete("/form/:userId", userController.deleteUser)


router.post("/continent", continentController.addContinent);
router.get("/continent", continentController.allContinent);

export = router;
