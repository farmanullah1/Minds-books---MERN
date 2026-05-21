import { motion } from 'framer-motion';
import Emoji3D from '../ui/Emoji3D';
import './ReactionPicker.css';

interface ReactionOption {
  type: string;
  label: string;
  icon: string;
  color: string;
}

interface ReactionPickerProps {
  reactions: readonly ReactionOption[];
  onReact: (type: string) => void;
}

export default function ReactionPicker({ reactions, onReact }: ReactionPickerProps) {
  return (
    <motion.div
      className="reaction-picker-popover card"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: -50, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      role="toolbar"
      aria-label="Reactions"
      onMouseEnter={(event) => event.stopPropagation()}
    >
      {reactions.map((reaction, index) => (
        <motion.button
          key={reaction.type}
          className="reaction-picker-btn"
          whileHover={{ scale: 1.3, y: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onReact(reaction.type)}
          title={reaction.label}
          aria-label={reaction.label}
        >
          <span className="reaction-picker-emoji">
            <Emoji3D emoji={reaction.icon} size={28} />
          </span>
          <span className="reaction-picker-tooltip">{reaction.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
