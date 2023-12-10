import express from "express";

import {
    createTournament,
    deleteTournament,
    getAllTournaments,
    getTournamentDetail,
    updateTournament,
} from "../controllers/tournament.controller.js";

const router = express.Router();

router.route("/").get(getAllTournaments);
router.route("/:id").get(getTournamentDetail);
router.route("/").post(createTournament);
router.route("/:id").patch(updateTournament);
router.route("/:id").delete(deleteTournament);

export default router;
