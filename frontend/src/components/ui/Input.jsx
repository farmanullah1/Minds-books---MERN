/* frontend/src/components/ui/Input.jsx — PROMPT-01.C */
import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { label, error, hint, type = 'text', className = '', required = false,
    leftIcon, rightIcon, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={rest.id}>
          {label}
          {required && <span className={styles.required} aria-hidden>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          ref={ref}
          type={inputType}
          className={`${styles.input} ${leftIcon ? styles.hasLeft : ''} ${(isPassword || rightIcon) ? styles.hasRight : ''}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${rest.id}-error` : hint ? `${rest.id}-hint` : undefined
          }
          {...rest}
        />
        {isPassword ? (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : rightIcon && (
          <span className={styles.rightIcon}>{rightIcon}</span>
        )}
      </div>
      {error && <p id={`${rest.id}-error`} className={styles.error} role="alert">{error}</p>}
      {hint && !error && <p id={`${rest.id}-hint`} className={styles.hint}>{hint}</p>}
    </div>
  );
});

export default Input;
