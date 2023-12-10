import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

const GamerProfile = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string,
    });

    console.log(data);

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="Gamer"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            tournaments={myProfile.allTournaments}
        />
    );
};

export default GamerProfile;
