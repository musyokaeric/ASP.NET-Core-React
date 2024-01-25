import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Brightness4, Brightness7, ShoppingCart } from "@mui/icons-material/";
//import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
    { title: "Catalog", path: "/catalog" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
];

const rightLinks = [
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
];

const navStyles = {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
        color: "grey.500",
    },
    "&.active": {
        color: "text.secondary",
    },
};

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector((state) => state.basket);
    const { user } = useAppSelector((state) => state.account);

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' sx={{ color: "inherit", textDecoration: "none" }}>
                        Re-Store
                    </Typography>
                    <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color='inherit'>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>

                <List sx={{ display: "flex" }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: "flex" }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                    {title}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
