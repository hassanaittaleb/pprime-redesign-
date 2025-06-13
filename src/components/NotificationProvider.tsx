'use client';

import { Toaster } from 'react-hot-toast';

export const NotificationProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#4CAF50',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#f44336',
          },
        },
      }}
    />
  );
}; 