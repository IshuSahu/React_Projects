// Global reducer

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/index";
import adminProductsSlice from "./admin/product-slice/index";
import shopProductSlice from './admin/product-slice/index'
const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductSlice
  },
});

export default store;
