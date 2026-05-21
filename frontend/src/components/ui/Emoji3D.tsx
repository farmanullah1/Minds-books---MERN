/* frontend/src/components/ui/Emoji3D.tsx
   Provides beautiful, premium, 3D-rendered Microsoft Fluent UI Emojis 
   with smooth hover physics and micro-animations.
*/
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mapping standard Unicode emojis to Fluent UI 3D Emoji CDN assets
export const EMOJI_3D_MAP: Record<string, string> = {
  // Post Reactions
  '👍': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Thumbs%20up/Default/3D/thumbs_up_3d.png',
  '❤️': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Red%20heart/3D/red_heart_3d.png',
  '😆': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Grinning%20squinting%20face/3D/grinning_squinting_face_3d.png',
  '😮': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Face%20with%20open%20mouth/3D/face_with_open_mouth_3d.png',
  '😢': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Crying%20face/3D/crying_face_3d.png',
  '😠': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Angry%20face/3D/angry_face_3d.png',
  '🙌': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Raising%20hands/Default/3D/raising_hands_3d.png',
  '🏆': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Trophy/3D/trophy_3d.png',
  '🤔': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Thinking%20face/3D/thinking_face_3d.png',
  '🔖': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Bookmark/3D/bookmark_3d.png',

  // Other social/chat reactions
  '😂': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Face%20with%20tears%20of%20joy/3D/face_with_tears_of_joy_3d.png',
  '😡': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Pouting%20face/3D/pouting_face_3d.png',
  '💛': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Yellow%20heart/3D/yellow_heart_3d.png',
  '🔥': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Fire/3D/fire_3d.png',
  '💻': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Laptop/3D/laptop_3d.png',
  '🥳': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Partying%20face/3D/partying_face_3d.png',
  '🚀': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Rocket/3D/rocket_3d.png',
  '👏': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Clapping%20hands/Default/3D/clapping_hands_3d.png',
  '💯': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Hundred%20points/3D/hundred_points_3d.png',

  // Gaming Memory Emojis
  '🎨': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Artist%20palette/3D/artist_palette_3d.png',
  '🧠': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Brain/3D/brain_3d.png',
  '💰': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Money%20bag/3D/money_bag_3d.png',
  '🎙️': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Studio%20microphone/3D/studio_microphone_3d.png',
  '📍': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Round%20pushpin/3D/round_pushpin_3d.png',
  '🕹️': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Joystick/3D/joystick_3d.png',
  '👑': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Crown/3D/crown_3d.png',
  '🌱': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Seedling/3D/seedling_3d.png',

  // Story creator stickers and common emotional/fun assets
  '😍': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Smiling%20face%20with%20heart-eyes/3D/smiling_face_with_heart-eyes_3d.png',
  '🎉': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Party%20popper/3D/party_popper_3d.png',
  '🌟': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Glowing%20star/3D/glowing_star_3d.png',
  '🦄': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Unicorn/3D/unicorn_3d.png',
  '💀': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Skull/3D/skull_3d.png',
  '🍕': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Pizza/3D/pizza_3d.png',
};

interface Emoji3DProps {
  emoji: string;
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
  animate?: boolean;
  inline?: boolean;
}

export const Emoji3D: React.FC<Emoji3DProps> = ({
  emoji,
  className = '',
  size = 24,
  style = {},
  animate = true,
  inline = false,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const cleanEmoji = emoji.trim();
  const url = EMOJI_3D_MAP[cleanEmoji];

  if (!url || error) {
    // Return standard fallback text emoji if not mapped or failed to load
    return (
      <span
        className={`emoji-fallback ${className}`}
        style={{
          fontSize: typeof size === 'number' ? `${size}px` : size,
          display: inline ? 'inline' : 'inline-block',
          verticalAlign: 'middle',
          fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
          ...style,
        }}
      >
        {emoji}
      </span>
    );
  }

  const dimension = typeof size === 'number' ? `${size}px` : size;

  const content = (
    <img
      src={url}
      alt={emoji}
      draggable={false}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      style={{
        width: dimension,
        height: dimension,
        objectFit: 'contain',
        display: 'block',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    />
  );

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: inline ? 'inline-flex' : 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    width: dimension,
    height: dimension,
    ...style,
  };

  if (!animate) {
    return (
      <span className={`emoji-3d-container ${className}`} style={containerStyle}>
        {!loaded && <span className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: '50%' }} />}
        {content}
      </span>
    );
  }

  return (
    <motion.span
      className={`emoji-3d-container ${className}`}
      style={containerStyle}
      whileHover={{ scale: 1.25, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {!loaded && <span className="skeleton" style={{ position: 'absolute', inset: 0, borderRadius: '50%' }} />}
      {content}
    </motion.span>
  );
};

export default Emoji3D;
