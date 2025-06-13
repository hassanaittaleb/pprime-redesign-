import toast from 'react-hot-toast';

export const useNotification = () => {
  const notify = {
    success: (message: string) => {
      toast.success(message);
    },
    error: (message: string) => {
      toast.error(message);
    },
    info: (message: string) => {
      toast(message);
    },
  };

  return notify;
}; 