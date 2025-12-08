"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { loadCart } from '@/store/slices/cartSlice';
import { loadWishlist } from '@/store/slices/wishlistSlice';
import { setUser } from '@/store/slices/userSlice';
import { useSession } from 'next-auth/react';

function ReduxInitializer({ children }) {
  const { data: session } = useSession();
  
  useEffect(() => {
    // Load cart and wishlist from localStorage on mount
    store.dispatch(loadCart());
    store.dispatch(loadWishlist());
  }, []);
  
  useEffect(() => {
    // Sync user from NextAuth session to Redux
    if (session?.user) {
      store.dispatch(setUser(session.user));
    } else {
      store.dispatch(setUser(null));
    }
  }, [session]);
  
  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ReduxInitializer>
        {children}
      </ReduxInitializer>
    </Provider>
  );
}