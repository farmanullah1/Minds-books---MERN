/**
 * CodeDNA
 * Gaming.tsx — High-Fidelity Gaming Dashboard & Interactive Mini-Games (PROMPT-54)
 * exports: default Gaming
 * used_by: App.tsx
 * rules: Golden gaming stage, stateful Memory game, Wordle game, Quiz round mechanics, Leaderboard HUDs
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlay, FiAward, FiUsers, FiShare2, FiGrid, 
  FiClock, FiTrendingUp, FiCheck, FiRefreshCw, 
  FiSmile, FiAlertCircle, FiPlus 
} from 'react-icons/fi';
import confetti from 'canvas-confetti';
import './Gaming.css';

// MEMORY GAME SETUP
const MEMORY_EMOJIS = ['🚀', '🎨', '🧠', '💰', '🎙️', '📍', '🕹️', '👑'];
const DOUBLE_EMOJIS = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];

const Gaming: React.FC = () => {
  // Tabs: dashboard | mindsnap | wordle | quiz | challenges
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mindsnap' | 'wordle' | 'quiz' | 'challenges'>('dashboard');

  // Coin counts
  const [coinCount, setCoinCount] = useState(140);

  // 1. MINDSNAP (MEMORY GAME) STATE
  const [memoryCards, setMemoryCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTime, setMemoryTime] = useState(0);
  const [memoryIntervalId, setMemoryIntervalId] = useState<any>(null);
  const [memoryGameStarted, setMemoryGameStarted] = useState(false);
  const [memoryWon, setMemoryWon] = useState(false);

  // 2. DAILY WORD CHALLENGE (WORDLE) STATE
  const WORD_OF_THE_DAY = 'MINDS';
  const [wordGuesses, setWordGuesses] = useState<string[]>(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentWordInput, setCurrentWordInput] = useState('');
  const [wordleMessage, setWordleMessage] = useState('');
  const [wordleWon, setWordleWon] = useState(false);
  const [wordleLost, setWordleLost] = useState(false);

  // 3. EMOJI QUIZ STATE
  const quizRounds = [
    { question: '🚀 + 🎨 + 💻', answer: 'FRONTEND BUILDER' },
    { question: '☕ + 🧠 + 📝', answer: 'CODER' },
    { question: '📍 + 🗺️ + 🚙', answer: 'CHECK IN ROADTRIP' }
  ];
  const [currentQuizRound, setCurrentQuizRound] = useState(0);
  const [quizInput, setQuizInput] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState('');

  // 4. CHALLENGES FEED STATE
  const [challenges, setChallenges] = useState([
    { id: 'ch_1', name: 'MindBook Memory Master', type: 'MindSnap', creator: 'Farmanullah', participants: 48, daysLeft: 5, progress: 65 },
    { id: 'ch_2', name: 'Wordle Streak Champion', type: 'Wordle', creator: 'Sarah', participants: 124, daysLeft: 12, progress: 85 }
  ]);
  const [newChallengeName, setNewChallengeName] = useState('');
  const [newChallengeType, setNewChallengeType] = useState('MindSnap');

  // --- MEMORY GAME LOGIC ---
  const startMemoryGame = () => {
    const shuffled = DOUBLE_EMOJIS
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);

    setMemoryCards(shuffled);
    setSelectedCards([]);
    setMemoryMoves(0);
    setMemoryTime(0);
    setMemoryWon(false);
    setMemoryGameStarted(true);

    if (memoryIntervalId) clearInterval(memoryIntervalId);
    const interval = setInterval(() => {
      setMemoryTime(t => t + 1);
    }, 1000);
    setMemoryIntervalId(interval);
  };

  const handleCardClick = (id: number) => {
    if (selectedCards.length === 2) return;
    const clickedCard = memoryCards.find(c => c.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;

    // Flip card
    setMemoryCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));
    const nextSelected = [...selectedCards, id];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMemoryMoves(m => m + 1);
      const [firstId, secondId] = nextSelected;
      const firstCard = memoryCards.find(c => c.id === firstId);
      const secondCard = memoryCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Matched
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, matched: true } : c));
          setSelectedCards([]);
          // Check if all matched
          const allMatched = memoryCards.every(c => c.matched || c.id === firstId || c.id === secondId);
          if (allMatched) {
            setMemoryWon(true);
            clearInterval(memoryIntervalId);
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            // Award coins if < 60s
            if (memoryTime < 60) {
              setCoinCount(c => c + 10);
            }
          }
        }, 600);
      } else {
        // Mis-matched, flip back
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, flipped: false } : c));
          setSelectedCards([]);
        }, 1200);
      }
    }
  };

  // --- WORDLE LOGIC ---
  const handleWordleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentWordInput.length !== 5) {
      setWordleMessage('Word must be 5 letters long!');
      return;
    }

    const formattedGuess = currentWordInput.toUpperCase();
    const newGuesses = [...wordGuesses];
    newGuesses[currentGuessIndex] = formattedGuess;
    setWordGuesses(newGuesses);
    setCurrentWordInput('');
    setWordleMessage('');

    if (formattedGuess === WORD_OF_THE_DAY) {
      setWordleWon(true);
      confetti({ particleCount: 80, spread: 60 });
      setCoinCount(c => c + 15);
      return;
    }

    if (currentGuessIndex === 5) {
      setWordleLost(true);
      return;
    }

    setCurrentGuessIndex(idx => idx + 1);
  };

  const getLetterClass = (letter: string, index: number) => {
    if (!WORD_OF_THE_DAY.includes(letter)) return 'absent';
    if (WORD_OF_THE_DAY[index] === letter) return 'correct';
    return 'present';
  };

  // --- EMOJI QUIZ LOGIC ---
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedAnswer = quizInput.toUpperCase().trim();
    const correctAnswer = quizRounds[currentQuizRound].answer;

    if (cleanedAnswer === correctAnswer) {
      setQuizScore(s => s + 1);
      setQuizFeedback('🎉 Correct Answer!');
    } else {
      setQuizFeedback(`❌ Wrong! Correct: ${correctAnswer}`);
    }

    setQuizInput('');
    setTimeout(() => {
      setQuizFeedback('');
      if (currentQuizRound < quizRounds.length - 1) {
        setCurrentQuizRound(r => r + 1);
      } else {
        setQuizFinished(true);
        if (quizScore + (cleanedAnswer === correctAnswer ? 1 : 0) === quizRounds.length) {
          setCoinCount(c => c + 5);
        }
      }
    }, 2000);
  };

  // --- CHALLENGE BUILDER LOGIC ---
  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChallengeName) return;

    setChallenges(prev => [
      {
        id: `ch_${Date.now()}`,
        name: newChallengeName,
        type: newChallengeType,
        creator: 'Farmanullah',
        participants: 1,
        daysLeft: 7,
        progress: 10
      },
      ...prev
    ]);
    setNewChallengeName('');
  };

  return (
    <div className="gaming-page-container">
      
      {/* Top Glass Hero Banner */}
      <div className="gaming-top-hero">
        <div className="hero-text-block">
          <span className="gaming-pill-indicator">🕹️ MINDBOOK ARCADE</span>
          <h1>Gaming Dashboard</h1>
          <p>Compete in weekly challenges, beat top high scores, play retro mini-games, and accumulate gold coins!</p>
        </div>

        <div className="arcade-coins-badge card animate-pulse">
          <span>🪙 Gold Coins</span>
          <h3>{coinCount}</h3>
        </div>
      </div>

      {/* Tabs navigation panels */}
      <div className="gaming-tabs-bar">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
          { id: 'mindsnap', label: 'MindSnap', icon: <FiRefreshCw /> },
          { id: 'wordle', label: 'Daily Wordle', icon: <FiCheck /> },
          { id: 'quiz', label: 'Emoji Quiz', icon: <FiSmile /> },
          { id: 'challenges', label: 'Challenges', icon: <FiAward /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            className={`gaming-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main gaming panels viewport */}
      <div className="gaming-viewport-stage">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD HUD */}
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dashboard-hud-view"
            >
              <div className="hud-three-split">
                
                {/* Available Game Cards */}
                <div className="hud-column game-selector-col">
                  <h2>🕹️ Playable Mini-Games</h2>
                  <div className="game-grid-cards">
                    
                    <div className="game-card card" onClick={() => setActiveTab('mindsnap')}>
                      <div className="card-emoji-glow">🚀</div>
                      <h3>MindSnap Match</h3>
                      <p>Flip and match pairs. Speedrun under 60 seconds to earn 10 gold coins.</p>
                      <button className="play-mini-btn">PLAY <FiPlay size={12} /></button>
                    </div>

                    <div className="game-card card" onClick={() => setActiveTab('wordle')}>
                      <div className="card-emoji-glow">📝</div>
                      <h3>Daily Wordle</h3>
                      <p>Guess the hidden 5-letter word in 6 attempts. Share your colorful grid results.</p>
                      <button className="play-mini-btn">PLAY <FiPlay size={12} /></button>
                    </div>

                    <div className="game-card card" onClick={() => setActiveTab('quiz')}>
                      <div className="card-emoji-glow">🧠</div>
                      <h3>Emoji Quiz Round</h3>
                      <p>Decipher phrases and tags from simple emoji lists. Perfect scores gain 5 gold coins.</p>
                      <button className="play-mini-btn">PLAY <FiPlay size={12} /></button>
                    </div>

                  </div>
                </div>

                {/* Leaderboard panel */}
                <div className="hud-column leaderboard-col card">
                  <div className="header-row">
                    <FiAward size={20} className="trophy-gold" />
                    <h2>Weekly Arcade Leaders</h2>
                  </div>

                  <div className="leader-board-list">
                    <div className="leader-row first-place">
                      <span className="rank">#1</span>
                      <span className="name">Sarah Jenkins</span>
                      <span className="score">1,420 pts</span>
                    </div>

                    <div className="leader-row second-place">
                      <span className="rank">#2</span>
                      <span className="name">Farmanullah Ansari</span>
                      <span className="score">1,150 pts</span>
                    </div>

                    <div className="leader-row">
                      <span className="rank">#3</span>
                      <span className="name">Michael Rover</span>
                      <span className="score">880 pts</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: MINDSNAP CARD GAME */}
          {activeTab === 'mindsnap' && (
            <motion.div 
              key="mindsnap"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mindsnap-game-view card"
            >
              <div className="game-header-controls">
                <h2>🚀 MindSnap Memory Match</h2>
                <div className="game-metrics">
                  <span>Moves: <strong>{memoryMoves}</strong></span>
                  <span>Timer: <strong>{memoryTime}s</strong></span>
                </div>
                <button className="restart-btn" onClick={startMemoryGame}>
                  {memoryGameStarted ? 'Restart' : 'Start Game'}
                </button>
              </div>

              {!memoryGameStarted ? (
                <div className="game-landing-stage">
                  <p>Flip and match pairs. Speedrun under 60 seconds to earn 10 gold coins.</p>
                  <button className="big-start-btn" onClick={startMemoryGame}>START GAME</button>
                </div>
              ) : (
                <div className="memory-board-grid">
                  {memoryCards.map((card) => {
                    const isFlipped = card.flipped || card.matched;
                    return (
                      <button 
                        key={card.id} 
                        className={`memory-tile ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                        onClick={() => handleCardClick(card.id)}
                        disabled={card.matched}
                      >
                        <span className="tile-content">{isFlipped ? card.emoji : '❓'}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {memoryWon && (
                <div className="victory-overlay animate-fadeIn">
                  <h2>🎉 You Won Memory Match!</h2>
                  <p>Completed in {memoryMoves} moves and {memoryTime} seconds.</p>
                  {memoryTime < 60 ? (
                    <span className="award-success">🪙 Awarded +10 Gold Coins!</span>
                  ) : (
                    <span>Speedrun under 60s to earn coins next time!</span>
                  )}
                  <button className="big-start-btn mt-3" onClick={startMemoryGame}>Play Again</button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: DAILY WORDLE CHALLENGE */}
          {activeTab === 'wordle' && (
            <motion.div 
              key="wordle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="wordle-game-view card"
            >
              <h2>📝 Daily Wordle Challenge</h2>
              <p>Find the hidden 5-letter MindBook vocabulary word in 6 attempts.</p>

              {/* Wordle board */}
              <div className="wordle-grid-board">
                {wordGuesses.map((guess, rIndex) => (
                  <div key={rIndex} className="wordle-row">
                    {Array(5).fill('').map((_, cIndex) => {
                      const letter = guess ? guess[cIndex] : '';
                      const isSubmitted = currentGuessIndex > rIndex || wordleWon || wordleLost;
                      const letterClass = isSubmitted && letter ? getLetterClass(letter, cIndex) : '';

                      return (
                        <div key={cIndex} className={`wordle-cell ${letterClass}`}>
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Form Input Guess */}
              {!wordleWon && !wordleLost ? (
                <form onSubmit={handleWordleSubmit} className="wordle-input-form">
                  <input 
                    type="text" 
                    maxLength={5} 
                    value={currentWordInput}
                    onChange={(e) => setCurrentWordInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                    placeholder="Enter 5 letters..."
                    required
                  />
                  <button type="submit" className="wordle-submit-btn">SUBMIT GUESS</button>
                </form>
              ) : (
                <div className="wordle-outcome animate-fadeIn">
                  {wordleWon ? (
                    <h3 className="text-success">🎉 Correct! You guessed: {WORD_OF_THE_DAY} (+15 Coins)</h3>
                  ) : (
                    <h3 className="text-danger">❌ Lost! The word was: {WORD_OF_THE_DAY}</h3>
                  )}
                  <button 
                    className="restart-btn mt-3" 
                    onClick={() => {
                      setWordGuesses(Array(6).fill(''));
                      setCurrentGuessIndex(0);
                      setWordleWon(false);
                      setWordleLost(false);
                    }}
                  >
                    Reset Challenge
                  </button>
                </div>
              )}

              {wordleMessage && <p className="wordle-warning">{wordleMessage}</p>}
            </motion.div>
          )}

          {/* TAB 4: EMOJI QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="quiz-game-view card"
            >
              <h2>🧠 Decode the Emoji Sequence</h2>
              
              {!quizFinished ? (
                <div className="quiz-active-stage">
                  <div className="quiz-sequence-glow">
                    {quizRounds[currentQuizRound].question}
                  </div>

                  <form onSubmit={handleQuizSubmit} className="quiz-input-form">
                    <input 
                      type="text" 
                      placeholder="Type your translation... (e.g. CODER)" 
                      value={quizInput}
                      onChange={(e) => setQuizInput(e.target.value)}
                      required
                    />
                    <button type="submit" className="quiz-btn">SUBMIT</button>
                  </form>

                  {quizFeedback && <p className="quiz-feedback-text">{quizFeedback}</p>}
                </div>
              ) : (
                <div className="quiz-finished animate-fadeIn">
                  <h3>🎉 Quiz Finished! Score: {quizScore} / {quizRounds.length}</h3>
                  {quizScore === quizRounds.length ? (
                    <p className="text-success">Perfect score! Awarded +5 Gold Coins.</p>
                  ) : (
                    <p>Try again to secure the gold prize.</p>
                  )}
                  <button 
                    className="restart-btn mt-3" 
                    onClick={() => {
                      setCurrentQuizRound(0);
                      setQuizScore(0);
                      setQuizFinished(false);
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: CHALLENGES */}
          {activeTab === 'challenges' && (
            <motion.div 
              key="challenges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="challenges-view-stage"
            >
              <div className="challenges-grid-split">
                
                {/* Challenge Creator */}
                <div className="challenge-form-card card">
                  <h3>🏆 Launch a Gaming Challenge</h3>
                  <form onSubmit={handleCreateChallenge} className="challenge-form">
                    <div className="form-group-item">
                      <label>Challenge Name</label>
                      <input 
                        type="text" 
                        value={newChallengeName}
                        onChange={(e) => setNewChallengeName(e.target.value)}
                        placeholder="e.g. Weekly Wordle Blitz..."
                        required
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Challenge Game</label>
                      <select value={newChallengeType} onChange={(e) => setNewChallengeType(e.target.value)}>
                        <option value="MindSnap">MindSnap Card Game</option>
                        <option value="Wordle">Daily Wordle</option>
                        <option value="Quiz">Emoji Quiz</option>
                      </select>
                    </div>

                    <button type="submit" className="challenge-btn">
                      Create Challenge
                    </button>
                  </form>
                </div>

                {/* Challenges listing */}
                <div className="challenges-listing-card">
                  <h3>🎯 Active Community Tournaments ({challenges.length})</h3>
                  <div className="challenges-list-scroll">
                    {challenges.map((c) => (
                      <div key={c.id} className="challenge-row-card card">
                        <div className="card-top-line">
                          <h4>{c.name}</h4>
                          <span className="days-left">{c.daysLeft} days left</span>
                        </div>
                        <p className="creator-text">Started by: @{c.creator} • Type: {c.type}</p>
                        
                        <div className="progress-bar-track">
                          <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="part-count">{c.participants} players entered</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default Gaming;
