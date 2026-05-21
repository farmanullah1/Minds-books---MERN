import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

export type CallType = 'audio' | 'video';
export type CallStatus = 'idle' | 'calling' | 'receiving' | 'connected' | 'ended';

interface CallParticipant {
  _id: string;
  name: string;
  profilePicture?: string;
}

interface CallState {
  status: CallStatus;
  type: CallType | null;
  caller: CallParticipant | null;
  callee: CallParticipant | null;
  conversationId: string | null;
}

interface CallContextValue extends CallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: (callee: CallParticipant, type: CallType, conversationId: string) => void;
  answerCall: () => void;
  endCall: () => void;
  rejectCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  isMuted: boolean;
  isCameraOff: boolean;
}

const INITIAL_STATE: CallState = {
  status: 'idle',
  type: null,
  caller: null,
  callee: null,
  conversationId: null,
};

const CallContext = createContext<CallContextValue | null>(null);

/**
 * CallContext — manages WebRTC voice/video call state.
 * Wraps the entire authenticated app to allow call UI to overlay any page.
 */
export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callState, setCallState] = useState<CallState>(INITIAL_STATE);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const stopStreams = useCallback(() => {
    localStream?.getTracks().forEach((t) => t.stop());
    remoteStream?.getTracks().forEach((t) => t.stop());
    setLocalStream(null);
    setRemoteStream(null);
    pcRef.current?.close();
    pcRef.current = null;
  }, [localStream, remoteStream]);

  const startCall = useCallback(async (callee: CallParticipant, type: CallType, conversationId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });
      setLocalStream(stream);
      setCallState({ status: 'calling', type, caller: null, callee, conversationId });
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  }, []);

  const answerCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callState.type === 'video',
      });
      setLocalStream(stream);
      setCallState((prev) => ({ ...prev, status: 'connected' }));
    } catch (err) {
      console.error('Error answering call:', err);
    }
  }, [callState.type]);

  const endCall = useCallback(() => {
    stopStreams();
    setCallState({ ...INITIAL_STATE, status: 'ended' });
    setTimeout(() => setCallState(INITIAL_STATE), 800);
  }, [stopStreams]);

  const rejectCall = useCallback(() => {
    setCallState({ ...INITIAL_STATE });
  }, []);

  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => (t.enabled = isMuted));
      setIsMuted((prev) => !prev);
    }
  }, [localStream, isMuted]);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => (t.enabled = isCameraOff));
      setIsCameraOff((prev) => !prev);
    }
  }, [localStream, isCameraOff]);

  return (
    <CallContext.Provider
      value={{
        ...callState,
        localStream,
        remoteStream,
        startCall,
        answerCall,
        endCall,
        rejectCall,
        toggleMute,
        toggleCamera,
        isMuted,
        isCameraOff,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCallContext must be used within <CallProvider>');
  return ctx;
};

export default CallContext;
