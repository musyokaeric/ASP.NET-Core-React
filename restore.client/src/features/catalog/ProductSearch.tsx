import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
    const { productParams } = useAppSelector((state) => state.catalog);
    const [search, setSearch] = useState(productParams.search);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ search: event.target.value }));
    }, 1000);

    return (
        <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={search || ""}
            onChange={(event: any) => {
                setSearch(event.target.value);
                debouncedSearch(event);
            }}
        />
    );
}
