import { useList } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { GamerCard } from "components";

const Gamers = () => {
    const { data, isLoading, isError } = useList({ resource: "users" });

    const allGamers = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Lista de Gamers
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allGamers.map((gamer) => (
                    <GamerCard
                        key={gamer._id}
                        id={gamer._id}
                        name={gamer.name}
                        email={gamer.email}
                        avatar={gamer.avatar}
                        allTournaments={gamer.allTournaments.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Gamers;
