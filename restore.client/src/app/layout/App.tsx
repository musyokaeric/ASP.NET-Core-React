import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

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
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Catalog />
            </Container>

        </ThemeProvider>
    )
}

export default App
