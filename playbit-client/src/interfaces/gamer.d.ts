import { BaseKey } from "@refinedev/core";

export interface GamerCardProp {
    id?: BaseKey | undefined;
    name: string;
    email: string;
    avatar: string;
    allTournaments: number;
}

export interface InfoBarProps {
    icon: ReactNode;
    name: string;
}
