import { createSlice } from '@reduxjs/toolkit';

// Helper to load wishlist from localStorage
const loadWishlistFromStorage = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

// Helper to save wishlist to localStorage
const saveWishlistToStorage = (items) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage()
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(item => item._id === product._id);
      
      if (!exists) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item._id !== productId);
      saveWishlistToStorage(state.items);
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item._id === product._id);
      
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      
      saveWishlistToStorage(state.items);
    },
    
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
    
    loadWishlist: (state) => {
      state.items = loadWishlistFromStorage();
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  loadWishlist
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) => 
  state.wishlist.items.some(item => item._id === productId);
export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;