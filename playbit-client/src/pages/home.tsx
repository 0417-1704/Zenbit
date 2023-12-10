import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
    PieChart,
    TournamentReferrals,
    TotalRevenue,
    TournamentCard,
} from "components";

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: "tournaments",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const latestTournaments = data?.data ?? [];

    if (isLoading) return <Typography>Cargando...</Typography>;
    if (isError) return <Typography>Algo salió mal...</Typography>;

    return (
        <Box
        bgcolor="#060a23">
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Game Dashboard
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Torneos en linea"
                    value={767}
                    series={[63, 37]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Jugadores en linea"
                    value={550}
                    series={[60, 40]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Juegos ganados"
                    value={27}
                    series={[13, 87]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Juegos perdidos"
                    value={180}
                    series={[87, 13]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box>

            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <TotalRevenue />
                <TournamentReferrals />
            </Stack>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Últimos Torneos
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestTournaments.map((tournament) => (
                        <TournamentCard
                            key={tournament._id}
                            id={tournament._id}
                            tournamentTitle={tournament.tournamentTitle}
                            gameTitle={tournament.gameTitle}
                            participantsNumber={tournament.participantsNumber}
                            photo={tournament.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
