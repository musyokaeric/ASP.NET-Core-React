import { useState } from "react";
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default: palleteType === 'light' ? '#eee' : '#121212'
            }
        }
    })

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Outlet />
            </Container>

        </ThemeProvider>
    )
}

export default App
