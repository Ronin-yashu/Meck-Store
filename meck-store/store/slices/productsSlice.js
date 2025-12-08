import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 20, featured = false } = {}) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (featured) params.append('featured', 'true');
    
    const response = await fetch(`/api/products?${params}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch products');
    }
    
    return data.products;
  }
);

// Async thunk for fetching single product
export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (slug) => {
    const response = await fetch(`/api/products/${slug}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch product');
    }
    
    return data.product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    featuredProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch single product
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentProduct, clearError } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectFeaturedProducts = (state) => 
  state.products.items.filter(p => p.tags?.includes('featured'));

export default productsSlice.reducer;