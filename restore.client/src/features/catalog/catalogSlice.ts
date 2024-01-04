import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>("catalog/fetchProductsAsync", async () => {
    try {
        return await agent.Catalog.list();
    } catch (error) {
        console.error(error);
    }
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        productsoaded: false,
        status: "idle",
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productsoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = "idle";
        });
    },
});
