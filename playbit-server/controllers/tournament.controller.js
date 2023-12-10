import Tournament from "../mongodb/models/tournament.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllTournaments = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        tournamentConsole = "",
    } = req.query;

    const query = {};

    if (tournamentConsole !== "") {
        query.tournamentConsole = tournamentConsole;
    }

    if (title_like) {
        query.tournamentTitle = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Tournament.countDocuments({ query });

        const tournaments = await Tournament.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTournamentDetail = async (req, res) => {
    const { id } = req.params;
    const tournamentExists = await Tournament.findOne({ _id: id }).populate(
        "creator",
    );

    if (tournamentExists) {
        res.status(200).json(tournamentExists);
    } else {
        res.status(404).json({ message: "Torneo no encontrado" });
    }
};

const createTournament = async (req, res) => {
    try {
        const {
            tournamentTitle,
            gameTitle,
            tournamentRules,
            tournamentConsole,
            participantsNumber,
            startDate,
            endDate,
            photo,
            email, 
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("Usuario no encontrado");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newTournament = await Tournament.create({
            tournamentTitle,
            gameTitle,
            tournamentRules,
            tournamentConsole,
            participantsNumber,
            startDate,
            endDate, 
            photo: photoUrl.url,
            creator: user._id,
        });

        //user.allTournaments.push(newTournament._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Torneo creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const { tournamentTitle,
            gameTitle,
            tournamentRules,
            tournamentConsole,
            participantsNumber,
            startDate,
            endDate,
            photo } =
            req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Tournament.findByIdAndUpdate(
            { _id: id },
            {
                tournamentTitle,
                gameTitle,
                tournamentRules,
                tournamentConsole,
                participantsNumber,
                startDate,
                endDate,
                photo: photoUrl.url || photo,
            },
        );

        res.status(200).json({ message: "Torneo actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTournament = async (req, res) => {
    try {
        const { id } = req.params;

        const tournamentToDelete = await Tournament.findById({ _id: id }).populate(
            "creator",
        );

        if (!tournamentToDelete) throw new Error("Torneo no encontrado");

        const session = await mongoose.startSession();
        session.startTransaction();

        tournamentToDelete.remove({ session });
        tournamentToDelete.creator.allTournaments.pull(tournamentToDelete);

        await tournamentToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Torneo eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllTournaments,
    getTournamentDetail,
    createTournament,
    updateTournament,
    deleteTournament,
};
