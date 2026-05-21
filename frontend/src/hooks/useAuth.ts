import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout as logoutAction } from '../store/slices/authSlice';

/**
 * useAuth — convenience hook exposing the auth state and actions.
 * Mirrors the pattern expected by PROMPT-01.A.
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((s) => s.auth);
  const isAuthenticated = !!token;

  const logout = () => dispatch(logoutAction());

  return { user, token, isAuthenticated, loading, error, logout };
}

export default useAuth;
