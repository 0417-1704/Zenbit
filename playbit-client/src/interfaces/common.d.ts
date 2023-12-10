export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    color: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export interface ProfileProps {
    type: string;
    name: string;
    avatar: string;
    email: string;
    tournaments: Array | undefined;
}

export interface TournamentProps {
    _id: string;
    tournamentTitle: string;
    gameTitle: string;
    tournamentRules: string;
    tournamentConsole: string;
    participantsNumber: string;
    startDate: string;
    endDate: string;
    photo: string;
    creator: string;
}

export interface FormProps {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues,
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    handleImageChange: (file) => void;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    tournamentImage: { name: string; url: string };
}
