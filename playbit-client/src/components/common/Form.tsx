import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";
const Form = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    tournamentImage,
}: FormProps) => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#fff">
                {type} un Torneo
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Ingrese nombre del torneo
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("tournamentTitle", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Ingrese el nombre del juego
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("gameTitle", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Ingrese reglas del torneo
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            placeholder="Ingrese reglas del torneo"
                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            {...register("tournamentRules", { required: true })}
                        />
                    </FormControl>

                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Seleccione la consola del torneo
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="XBOX ONE"
                                {...register("tournamentConsole", {
                                    required: true,
                                })}
                            >
                                <MenuItem value="xboxOne">XBOX ONE</MenuItem>
                                <MenuItem value="xbox360">XBOX 360</MenuItem>
                                <MenuItem value="ps5">PS5</MenuItem>
                                <MenuItem value="ps4">PS4</MenuItem>
                                <MenuItem value="ps3">PS3</MenuItem>
                                <MenuItem value="wii">WII</MenuItem>
                                <MenuItem value="pc">PC</MenuItem>
                                <MenuItem value="gamecube">GAMECUBE</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Ingrese número de jugadores
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="number"
                                variant="outlined"
                                {...register("participantsNumber", { required: true })}
                            />
                        </FormControl>
                        
                    </Stack>
                    <Stack direction="row" gap={4}>
                    {/**TODO check 'no name' error issue when picking date*/}
                    {/**<LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        
                        label="Fecha inicio" 
                        {...register("startDate", { required: true })}/>
                        
                    <DatePicker 
                    label="Fecha fin"
                    {...register("endDate", { required: true })} />
                            </LocalizationProvider>*/}
                            <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Ingrese fecha de inicio
                        </FormHelperText>
                        
                        <input type="date" id="start" name="trip-start" value="2023-12-09" min="2023-12-09" max="2025-12-31"
                        {...register("startDate", { required: true })} />
                       
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Ingrese fecha fin
                        </FormHelperText>
                        <input type="date" id="start" name="trip-start" value="2023-12-09" min="2023-12-09" max="2025-12-31"
                         {...register("endDate", { required: true })}/>
                        
                    </FormControl>
                    
                        
                    </Stack>

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Imagen representativa
                            </Typography>

                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Subir *
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        handleImageChange(e.target.files![0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {tournamentImage?.name}
                        </Typography>
                    </Stack>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Creando..." : "Crear"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default Form;
