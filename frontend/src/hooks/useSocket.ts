import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { socketService } from '../services/socketService';

/**
 * useSocket — connects the Socket.IO service when the user is authenticated
 * and disconnects on logout. Returns the socketService singleton.
 */
export function useSocket() {
  const { user, token } = useAppSelector((s) => s.auth);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      socketService.connect(user._id);
    } else {
      socketService.disconnect();
    }
  }, [isAuthenticated, user?._id]);

  return socketService;
}

export default useSocket;
