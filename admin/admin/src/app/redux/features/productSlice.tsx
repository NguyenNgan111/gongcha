import { createSlice } from "@reduxjs/toolkit";

interface IProduct {
  name: string;
  description: string;
  discount: string;
  type: [{ size: string; price: string }];
  url: string;
  category: string;
  year: string;
}
interface Istate {
  loading: boolean,
  message: string,
  products: IProduct[]
}
const initialState : Istate  = {
  loading: false,
  message: "",
  products: [],
};


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
        getAllProducts: (state) => {
          state.loading = true;
          state.message = "";
        },
    
        getAllProductsSuccess: (state, action) => {
          state.products = [...action.payload as [IProduct]];
          state.loading = false;
          state.message = "Success";
        },
    
        getAllProductsFailure: (state, action) => {
          state.loading = false;
          state.message = action.payload;
        },
  },
});

export const productData = (state: { product: any; }) => state.product;


export const {
  getAllProducts,
  getAllProductsSuccess,
  getAllProductsFailure
} = productSlice.actions;

export default productSlice.reducer;
