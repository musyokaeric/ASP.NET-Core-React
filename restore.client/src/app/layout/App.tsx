import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

import "react-toastify/dist/ReactToastify.css";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        const buyerId = getCookie("buyerId");
        if (buyerId) {
            agent.Basket.get()
                .then((basket) => dispatch(setBasket(basket)))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch]);

    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? "dark" : "light";
    const theme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default: palleteType === "light" ? "#eee" : "#121212",
            },
        },
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message='Initializing app...' />;

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default App;
