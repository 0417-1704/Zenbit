import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";

import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const TournamentDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const tournamentDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (isError) {
        return <div>Algo salió mal...</div>;
    }

    const isCurrentUser = user.email === tournamentDetails.creator.email;

    const handleDeleteTournament = () => {
        const response = confirm(
            "¿Seguro que deseas eliminar ese torneo?",
        );
        if (response) {
            mutate(
                {
                    resource: "tournaments",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/tournaments");
                    },
                },
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Detalles
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={tournamentDetails.photo}
                        alt="tournament_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="tournament_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                               Consola: {tournamentDetails.tournamentConsole}
                            </Typography>
                           
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {tournamentDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {tournamentDetails.gameTit}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Participantes
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        {tournamentDetails.participantsNumber}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Reglas
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {tournamentDetails.tournamentRules}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(tournamentDetails.creator.avatar)
                                        ? tournamentDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {tournamentDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Gamer
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    North Carolina, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {tournamentDetails.creator.allTournaments.length}{" "}
                                Torneos
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/tournaments/edit/${tournamentDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteTournament();
                                }}
                            />
                        </Stack>
                    </Stack>



                    <Box>
                        <CustomButton
                            title="Participar"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TournamentDetails;
