import React from 'react';
import Tilt from 'react-parallax-tilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  style?: React.CSSProperties;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltMaxAngleX = 8,
  tiltMaxAngleY = 8,
  scale = 1.02,
  glareEnable = true,
  glareMaxOpacity = 0.15,
  style,
}) => {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      glareColor="#F7B928"
      glarePosition="all"
      perspective={1000}
      transitionSpeed={400}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </Tilt>
  );
};

export default TiltCard;
