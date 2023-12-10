import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema({
    tournamentTitle: { type: String, required: true },
    gameTitle: { type: String, required: true },
    tournamentRules: { type: String, required: true },
    tournamentConsole: { type: String, required: true },
    participantsNumber: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const tournamentModel = mongoose.model("Tournament", TournamentSchema);

export default tournamentModel;
