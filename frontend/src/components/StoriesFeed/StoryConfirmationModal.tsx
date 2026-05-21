/**
 * CodeDNA
 * StoryConfirmationModal.tsx — Advanced Mobile Story Creator with Camera & drawing canvas (PROMPT-58)
 * exports: default StoryConfirmationModal
 * used_by: StoriesFeed.tsx
 * rules: 1:1 image boxes, HTML5 Canvas finger drawing, text placement layer, sticker drawer, countdown timer
 */

import React, { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiType, FiSmile, FiClock, FiTrash2, FiCamera } from 'react-icons/fi';
import Emoji3D from '../ui/Emoji3D';
import './StoryConfirmationModal.css';

interface StoryConfirmationModalProps {
  file: File;
  previewUrl: string;
  isVideo: boolean;
  onConfirm: (caption: string) => void;
  onCancel: () => void;
  loading: boolean;
}

const StoryConfirmationModal: React.FC<StoryConfirmationModalProps> = ({ file, previewUrl, isVideo, onConfirm, onCancel, loading }) => {
  const [caption, setCaption] = useState('');
  
  // Interactive Mobile Creator states
  const [activeTool, setActiveTool] = useState<'draw' | 'text' | 'sticker' | 'timer' | null>(null);
  const [drawColor, setDrawColor] = useState('#f7b928');
  const [brushSize, setBrushSize] = useState(5);
  
  // Text Tool layers
  const [storyTexts, setStoryTexts] = useState<{ id: string; text: string; color: string; x: number; y: number }[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  
  // Sticker Tray layers
  const [storyStickers, setStoryStickers] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);
  
  // Story Duration Timer
  const [timerDuration, setTimerDuration] = useState('24h');

  // Drawing Canvas setup
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    if (activeTool === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = brushSize;
      }
    }
  }, [activeTool, drawColor, brushSize]);

  // Touch drawing logic
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'draw' || !canvasRef.current) return;
    isDrawingRef.current = true;
    
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    lastXRef.current = clientX - rect.left;
    lastYRef.current = clientY - rect.top;
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || activeTool !== 'draw' || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastXRef.current, lastYRef.current);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    lastXRef.current = currentX;
    lastYRef.current = currentY;
  };

  const handleStopDraw = () => {
    isDrawingRef.current = false;
  };

  const handleAddText = () => {
    if (!currentText.trim()) return;
    setStoryTexts([
      ...storyTexts,
      {
        id: Math.random().toString(),
        text: currentText,
        color: textColor,
        x: 50,
        y: 40 + storyTexts.length * 15
      }
    ]);
    setCurrentText('');
    setActiveTool(null);
  };

  const handleAddSticker = (emoji: string) => {
    setStoryStickers([
      ...storyStickers,
      {
        id: Math.random().toString(),
        emoji,
        x: 40 + storyStickers.length * 10,
        y: 50 + storyStickers.length * 10
      }
    ]);
    setActiveTool(null);
  };

  const handleClearDrawing = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    setStoryTexts([]);
    setStoryStickers([]);
  };

  return (
    <div className="modal-overlay mobile-creator-overlay">
      <div className="modal-content story-confirm-modal mobile-story-creator animate-scale-in">
        
        {/* Creator Header */}
        <div className="modal-header">
          <div className="creator-header-left">
            <FiCamera size={18} className="camera-icon-brand mr-2" />
            <h3>Story Creator</h3>
          </div>
          <div className="duration-pill-indicator">
            <FiClock size={12} className="mr-1" /> {timerDuration} timer
          </div>
          <button className="modal-close" onClick={onCancel} disabled={loading}>&times;</button>
        </div>
        
        <div className="modal-body story-confirm-body layout-mobile-flex">
          
          {/* Main Visual Board Workspace */}
          <div className="story-preview-container mobile-creator-board" style={{ position: 'relative' }}>
            
            {/* Draw Tool Canvas */}
            <canvas
              ref={canvasRef}
              width={350}
              height={380}
              className={`draw-layer-canvas ${activeTool === 'draw' ? 'brush-active' : ''}`}
              onMouseDown={handleStartDraw}
              onMouseMove={handleDrawing}
              onMouseUp={handleStopDraw}
              onMouseLeave={handleStopDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleDrawing}
              onTouchEnd={handleStopDraw}
            />

            {/* Dynamic Text placement Layers */}
            {storyTexts.map((txt) => (
              <div
                key={txt.id}
                className="draggable-story-text"
                style={{
                  position: 'absolute',
                  left: `${txt.x}%`,
                  top: `${txt.y}%`,
                  color: txt.color,
                  transform: 'translate(-50%, -50%)',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  pointerEvents: 'none'
                }}
              >
                {txt.text}
              </div>
            ))}

            {/* Dynamic Sticker placement Layers */}
            {storyStickers.map((stk) => (
              <div
                key={stk.id}
                className="draggable-story-sticker"
                style={{
                  position: 'absolute',
                  left: `${stk.x}%`,
                  top: `${stk.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: '2.5rem',
                  pointerEvents: 'none'
                }}
              >
                <Emoji3D emoji={stk.emoji} size={40} />
              </div>
            ))}

            {isVideo ? (
              <video src={previewUrl} className="story-preview-media creator-media-base" autoPlay loop muted />
            ) : (
              <img src={previewUrl} alt="Story Preview" className="story-preview-media creator-media-base" />
            )}
          </div>

          {/* Quick Creative Action Bar */}
          <div className="story-creative-action-toolbar">
            <button
              type="button"
              className={`toolbar-btn ${activeTool === 'draw' ? 'active' : ''}`}
              onClick={() => setActiveTool(activeTool === 'draw' ? null : 'draw')}
              title="Finger Draw Tool"
            >
              <FiEdit2 size={18} />
            </button>
            <button
              type="button"
              className={`toolbar-btn ${activeTool === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTool(activeTool === 'text' ? null : 'text')}
              title="Text Placement Tool"
            >
              <FiType size={18} />
            </button>
            <button
              type="button"
              className={`toolbar-btn ${activeTool === 'sticker' ? 'active' : ''}`}
              onClick={() => setActiveTool(activeTool === 'sticker' ? null : 'sticker')}
              title="Sticker Selection Tray"
            >
              <FiSmile size={18} />
            </button>
            <button
              type="button"
              className={`toolbar-btn ${activeTool === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveTool(activeTool === 'timer' ? null : 'timer')}
              title="Story Duration Timer"
            >
              <FiClock size={18} />
            </button>
            <button
              type="button"
              className="toolbar-btn clear-all-layers-btn"
              onClick={handleClearDrawing}
              title="Clear layers"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          {/* Active Tool Control Panels */}
          {activeTool === 'draw' && (
            <div className="creator-control-panel bg-tool-drawer animate-slide-up">
              <span className="control-label">Brush Color:</span>
              <div className="color-palette-row">
                {['#f7b928', '#ff4e50', '#5ee7df', '#38ef7d', '#330867', '#ffffff'].map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`color-dot ${drawColor === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setDrawColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTool === 'text' && (
            <div className="creator-control-panel bg-tool-drawer animate-slide-up flex-column-panel">
              <input
                type="text"
                className="input-field text-tool-input"
                placeholder="Enter text layer content..."
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                maxLength={40}
                autoFocus
              />
              <div className="control-row mt-2">
                <div className="color-palette-row">
                  {['#ffffff', '#f7b928', '#ff4e50', '#5ee7df', '#38ef7d', '#000000'].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`color-dot ${textColor === c ? 'active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setTextColor(c)}
                    />
                  ))}
                </div>
                <button type="button" className="btn btn-primary btn-sm ml-auto" onClick={handleAddText}>
                  Add Text
                </button>
              </div>
            </div>
          )}

          {activeTool === 'sticker' && (
            <div className="creator-control-panel bg-tool-drawer animate-slide-up">
              <span className="control-label">Pick a Sticker:</span>
              <div className="stickers-tray-scroll">
                {['🔥', '😍', '🚀', '🎉', '😂', '💯', '👏', '👑', '🌟', '🦄', '💀', '🍕'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    className="sticker-btn-emoji"
                    onClick={() => handleAddSticker(emoji)}
                  >
                    <Emoji3D emoji={emoji} size={32} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTool === 'timer' && (
            <div className="creator-control-panel bg-tool-drawer animate-slide-up">
              <span className="control-label">Timer Expiration:</span>
              <select
                className="input-field select-timer-dropdown"
                value={timerDuration}
                onChange={(e) => setTimerDuration(e.target.value)}
              >
                <option value="12h">12 Hours</option>
                <option value="24h">24 Hours (Default)</option>
                <option value="48h">48 Hours</option>
                <option value="7d">7 Days</option>
              </select>
            </div>
          )}

          {/* Story Caption Details */}
          <textarea
            className="story-caption-input input-field mt-3"
            placeholder="Add story description/caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={loading}
            maxLength={150}
          />
        </div>
        
        {/* Creator Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-primary btn-loading" onClick={() => onConfirm(caption)} disabled={loading}>
            {loading ? <div className="spinner small"></div> : 'Publish Story'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryConfirmationModal;
