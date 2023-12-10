import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import AdminPanel from "@mui/icons-material/AdminPanelSettings";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
    GitHubBanner,
    LegacyAuthProvider as AuthProvider,
    Refine,
} from "@refinedev/core";
import {
    ErrorComponent,
    notificationProvider,
    ReadyPage,
    RefineSnackbarProvider,
} from "@refinedev/mui";

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { Header, Layout, Sider, Title } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

import {
    GamerProfile,
    Gamers,
    AllTournaments,
    CreateTournament,
    EditTournament,
    Home,
    Login,
    MyProfile,
    TournamentDetails,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

function App() {
    const authProvider: AuthProvider = {
        login: async ({ credential }: CredentialResponse) => {
            const profileObj = credential ? parseJwt(credential) : null;

            if (profileObj) {
                const response = await fetch(
                    "http://localhost:8080/api/v1/users",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: profileObj.name,
                            email: profileObj.email,
                            avatar: profileObj.picture,
                        }),
                    },
                );

                const data = await response.json();

                if (response.status === 200) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...profileObj,
                            avatar: profileObj.picture,
                            userid: data._id,
                        }),
                    );
                } else {
                    return Promise.reject();
                }
            }
            localStorage.setItem("token", `${credential}`);

            return Promise.resolve();
        },
        logout: () => {
            const token = localStorage.getItem("token");

            if (token && typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                axios.defaults.headers.common = {};
                window.google?.accounts.id.revoke(token, () => {
                    return Promise.resolve();
                });
            }

            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            const token = localStorage.getItem("token");

            if (token) {
                return Promise.resolve();
            }
            return Promise.reject();
        },

        getPermissions: async () => null,
        getUserIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return Promise.resolve(JSON.parse(user));
            }
        },
    };

    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    dataProvider={dataProvider("http://localhost:8080/api/v1")}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "tournaments",
                            options: { label: "Torneos " },
                            list: AllTournaments,
                            show: TournamentDetails,
                            create: CreateTournament,
                            edit: EditTournament,
                            icon: <EmojiEvents />,
                        },
                        {
                            name: "gamers",
                            list: Gamers,
                            show: GamerProfile,
                            icon: <PeopleAltOutlined />,
                        },
                        {
                            name: "Admins",
                            list: Home,
                            icon: <AdminPanel />,
                        },
                        {
                            name: "Mensajes",
                            list: Home,
                            icon: <ChatBubbleOutline />,
                        },
                        {
                            name: "my-profile",
                            options: { label: "Mi Perfil " },
                            list: MyProfile,
                            icon: <AccountCircleOutlined />,
                        },
                    ]}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}
                    legacyRouterProvider={routerProvider}
                    legacyAuthProvider={authProvider}
                    LoginPage={Login}
                    DashboardPage={Home}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;
