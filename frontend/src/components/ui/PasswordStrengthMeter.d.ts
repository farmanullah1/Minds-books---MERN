import React from 'react';

export interface PasswordStrengthMeterProps {
  score?: number;
  password?: string;
}

declare const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps>;
export default PasswordStrengthMeter;
