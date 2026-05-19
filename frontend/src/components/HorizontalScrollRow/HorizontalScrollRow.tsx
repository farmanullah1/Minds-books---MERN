import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HorizontalScrollRow.css';

interface HorizontalScrollRowProps {
  children: React.ReactNode;
  title?: string;
  seeAllLink?: string;
}

const HorizontalScrollRow: React.FC<HorizontalScrollRowProps> = ({ children, title, seeAllLink }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const updateArrows = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeftPos.current = containerRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="horizontal-scroll-section">
      {(title || seeAllLink) && (
        <div className="horizontal-scroll-header">
          {title && <h3>{title}</h3>}
          {seeAllLink && <a href={seeAllLink} className="see-all-link">See All</a>}
        </div>
      )}
      <div className="horizontal-scroll-wrapper">
        {canScrollLeft && (
          <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll('left')}>
            <FiChevronLeft size={20} />
          </button>
        )}
        <div
          ref={containerRef}
          className={`horizontal-scroll-container ${isDragging ? 'dragging' : ''}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {children}
        </div>
        {canScrollRight && (
          <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll('right')}>
            <FiChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalScrollRow;
