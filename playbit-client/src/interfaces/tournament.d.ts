import { BaseKey } from "@refinedev/core";

export interface FormFieldTour {
    tournamentTitle: string;
    labelName: string;
}

export interface FormValues {
    tournamentTitle: string;
    tournamentRules: string;
    tournamentConsole: string;
    gameTitle: string;
    participantsNumber: number | undefined;
}

export interface TournamentCardProps {
    id?: BaseKey | undefined;
    tournamentTitle: string;
    gameTitle: string;
    participantsNumber: string;
    photo: string;
}
