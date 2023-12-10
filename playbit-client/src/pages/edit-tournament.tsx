import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "components/common/Form";

const EditTournament = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [tournamentImage, setTournamentImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setTournamentImage({ name: file?.name, url: result }),
        );
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!tournamentImage.name) return alert("Porfavor sube una imagen de torneo");

        await onFinish({
            ...data,
            photo: tournamentImage.url,
            email: user.email,
        });
    };

    return (
        <Form
            type="Editar"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            tournamentImage={tournamentImage}
        />
    );
};

export default EditTournament;
