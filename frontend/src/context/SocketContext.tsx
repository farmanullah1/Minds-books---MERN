import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { socketService } from '../services/socketService';

interface SocketContextValue {
  /** Whether socket is currently connected */
  isConnected: boolean;
  /** Emit a socket event */
  emit: (event: string, data?: any) => void;
  /** The underlying socketService singleton */
  socket: typeof socketService;
}

const SocketContext = createContext<SocketContextValue | null>(null);

/**
 * SocketContext — provides socket connection state and emit helper
 * to the entire authenticated app.
 */
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAppSelector((s) => s.auth);
  const isAuthenticated = !!token;
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      socketService.connect(user._id);
      setIsConnected(true);
    } else {
      socketService.disconnect();
      setIsConnected(false);
    }
  }, [isAuthenticated, user?._id]);

  const emit = (event: string, data?: any) => {
    (socketService as any).socket?.emit(event, data);
  };

  return (
    <SocketContext.Provider value={{ isConnected, emit, socket: socketService }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocketContext must be used within <SocketProvider>');
  return ctx;
};

export default SocketContext;
