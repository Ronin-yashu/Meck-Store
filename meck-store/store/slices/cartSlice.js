import { createSlice } from '@reduxjs/toolkit';

// Helper to load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  } catch (error) {
    console.error('Error loading cart:', error);
    return { items: [], total: 0 };
  }
};

// Helper to save cart to localStorage
const saveCartToStorage = (state) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

// Calculate totals
const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% tax
  const shipping = subtotal > 99900 ? 0 : 4900; // Free shipping over ₹999
  const total = subtotal + tax + shipping;
  
  return { subtotal, tax, shipping, total };
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state);
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item._id !== productId);
      
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state);
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state);
    },
    
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item) {
        item.quantity += 1;
      }
      
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state);
    },
    
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.total = 0;
      saveCartToStorage(state);
    },
    
    loadCart: (state) => {
      const savedCart = loadCartFromStorage();
      return savedCart;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  loadCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartShipping = (state) => state.cart.shipping;

export default cartSlice.reducer;