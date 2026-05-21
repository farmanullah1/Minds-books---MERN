/**
 * CodeDNA
 * Events.tsx — high-fidelity Events experience with calendar & Leaflet.js map integration
 * exports: none
 * used_by: internal
 * rules: Follow project conventions, HSL dark theme, dynamic Leaflet script injection
 * agent: Antigravity | google | 2026-05-20 | implement | Implemented interactive events system
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  FiCalendar, 
  FiMapPin, 
  FiUsers, 
  FiPlus, 
  FiX, 
  FiGrid, 
  FiMap, 
  FiChevronLeft, 
  FiChevronRight, 
  FiCheckCircle, 
  FiAlertCircle 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';

import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import api, { uploadFile } from '../../services/api';
import { useAppSelector } from '../../store/hooks';
import { IEvent } from '../../types';
import { getInitials } from '../../utils/helpers';
import { useToast } from '../../components/Toast/ToastContext';
import { SkeletonRect, SkeletonLine } from '../../components/Skeleton/Skeleton';
import './Events.css';

// Predefined coordinate hashes for popular locations or fallback hash-based location generation
const getCoordinatesForLocation = (location: string): [number, number] => {
  if (!location) return [37.7749, -122.4194]; // Default Center (San Francisco)
  
  // Format check for literal "lat, lng" coordinates
  const parts = location.split(',');
  if (parts.length === 2) {
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (!isNaN(lat) && !isNaN(lng)) {
      return [lat, lng];
    }
  }

  const lowerLoc = location.toLowerCase();
  if (lowerLoc.includes('san francisco') || lowerLoc.includes('sf')) return [37.7749, -122.4194];
  if (lowerLoc.includes('new york') || lowerLoc.includes('nyc') || lowerLoc.includes('brooklyn')) return [40.7128, -74.0060];
  if (lowerLoc.includes('london')) return [51.5074, -0.1278];
  if (lowerLoc.includes('paris')) return [48.8566, 2.3522];
  if (lowerLoc.includes('tokyo')) return [35.6762, 139.6503];
  if (lowerLoc.includes('berlin')) return [52.5200, 13.4050];
  if (lowerLoc.includes('chicago')) return [41.8781, -87.6298];
  if (lowerLoc.includes('los angeles') || lowerLoc.includes('la')) return [34.0522, -118.2437];
  if (lowerLoc.includes('delhi') || lowerLoc.includes('new delhi')) return [28.6139, 77.2090];
  if (lowerLoc.includes('sydney')) return [-33.8688, 151.2093];
  if (lowerLoc.includes('toronto')) return [43.6532, -79.3832];
  
  // Deterministic string hashing to generate coordinate pins around SF within [-0.05, 0.05] offset
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = location.charCodeAt(i) + ((hash << 5) - hash);
  }
  const latOffset = ((hash & 0xFF) / 255 - 0.5) * 0.08;
  const lngOffset = (((hash >> 8) & 0xFF) / 255 - 0.5) * 0.08;
  
  return [37.7749 + latOffset, -122.4194 + lngOffset];
};

const SkeletonEvent: React.FC = () => (
  <div className="card event-card skeleton-event">
    <SkeletonRect height={160} borderRadius="16px 16px 0 0" />
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <SkeletonRect width={52} height={58} borderRadius="12px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonLine width="80%" height={16} />
          <SkeletonLine width="40%" height={12} />
        </div>
      </div>
      <SkeletonLine width="100%" height={14} style={{ marginBottom: '8px' }} />
      <SkeletonLine width="60%" height={14} style={{ marginBottom: '16px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonLine width="30%" height={12} />
        <SkeletonLine width="20%" height={24} />
      </div>
    </div>
  </div>
);

const Events: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { showToast } = useToast();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'calendar' | 'map'>('grid');
  
  // Create Modal & Event Inputs
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', coverImage: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Selection / Detail Drawer
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  
  // Calendar Navigation State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Dynamic Leaflet Loader State
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const miniMapRef = useRef<any>(null);

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch events list from server
  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      showToast('Could not fetch events. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Dynamically load Leaflet links/scripts to bypass compile conflicts
  useEffect(() => {
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    const jsId = 'leaflet-js';
    if (!document.getElementById(jsId)) {
      const script = document.createElement('script');
      script.id = jsId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.crossOrigin = '';
      script.async = true;
      script.onload = () => setLeafletLoaded(true);
      script.onerror = () => showToast('Failed to load interactive maps.', 'warning');
      document.head.appendChild(script);
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).L) {
          clearInterval(checkInterval);
          setLeafletLoaded(true);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  // Main interactive map mounting
  useEffect(() => {
    if (view !== 'map' || !leafletLoaded || !(window as any).L) return;

    const L = (window as any).L;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const timer = setTimeout(() => {
      const mapContainer = document.getElementById('events-map');
      if (!mapContainer) return;

      const map = L.map('events-map', {
        zoomControl: true,
        attributionControl: true
      }).setView([37.7749, -122.4194], 12);
      
      mapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);

      const bounds: any[] = [];

      events.forEach(event => {
        if (!event.location) return;
        const coords = getCoordinatesForLocation(event.location);
        bounds.push(coords);

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div class="marker-pin-outer">
              <div class="marker-pin-inner"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map);
        
        const popupContent = document.createElement('div');
        popupContent.className = 'map-popup-card';
        
        const eventDate = new Date(event.date);
        popupContent.innerHTML = `
          <h4>${event.title}</h4>
          <p>${eventDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at ${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p style="margin-bottom: 8px;">${event.location}</p>
          <button class="map-popup-btn">View Details</button>
        `;

        popupContent.querySelector('.map-popup-btn')?.addEventListener('click', () => {
          setSelectedEvent(event);
        });

        marker.bindPopup(popupContent);
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [view, leafletLoaded, events]);

  // Drawer mini-map mounting with transition delay safety
  useEffect(() => {
    if (!selectedEvent || !leafletLoaded || !(window as any).L) return;

    const L = (window as any).L;

    const mapTimer = setTimeout(() => {
      const miniMapContainer = document.getElementById('drawer-mini-map');
      if (!miniMapContainer) return;

      if (miniMapRef.current) {
        miniMapRef.current.remove();
        miniMapRef.current = null;
      }

      const coords = getCoordinatesForLocation(selectedEvent.location);

      const miniMap = L.map('drawer-mini-map', {
        zoomControl: false,
        attributionControl: false
      }).setView(coords, 13);

      miniMapRef.current = miniMap;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
      }).addTo(miniMap);

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="marker-pin-outer">
            <div class="marker-pin-inner"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker(coords, { icon: customIcon }).addTo(miniMap);
    }, 380);

    return () => {
      clearTimeout(mapTimer);
      if (miniMapRef.current) {
        miniMapRef.current.remove();
        miniMapRef.current = null;
      }
    };
  }, [selectedEvent, leafletLoaded]);

  // Image Upload helper
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Event Form Submission
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let coverImage = '';
      if (imageFile) {
        const res = await uploadFile(imageFile);
        coverImage = res.url;
      }
      await api.post('/events', { ...newEvent, coverImage });
      
      showToast('Event created successfully!', 'success');
      setShowCreateModal(false);
      setNewEvent({ title: '', description: '', date: '', location: '', coverImage: '' });
      setImageFile(null);
      setImagePreview(null);
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
      showToast('Failed to create event.', 'error');
    }
  };

  // RSVP triggers with confetti bursts
  const handleRSVP = async (eventId: string) => {
    try {
      const res = await api.put(`/events/${eventId}/rsvp`);
      const updatedEvent = res.data;
      
      const wasAttending = events.find(e => e._id === eventId)?.attendees.some(a => a._id === user?._id);
      const isAttending = updatedEvent.attendees.some((a: any) => a._id === user?._id);

      if (!wasAttending && isAttending) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#f7b928', '#ffffff', '#e0a824', '#ffdd6b']
        });
        showToast('Successfully registered for this event! 🎉', 'success');
      } else {
        showToast('Removed from attendees list.', 'info');
      }

      setEvents(prev => prev.map(e => e._id === eventId ? updatedEvent : e));
      if (selectedEvent && selectedEvent._id === eventId) {
        setSelectedEvent(updatedEvent);
      }
      fetchEvents();
    } catch (error) {
      console.error('Failed to RSVP:', error);
      showToast('Failed to update RSVP.', 'error');
    }
  };

  // Delete event handler
  const handleDelete = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${eventId}`);
        showToast('Event has been deleted.', 'success');
        if (selectedEvent?._id === eventId) {
          setSelectedEvent(null);
        }
        fetchEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
        showToast('Failed to delete event.', 'error');
      }
    }
  };

  // Calendar generators
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const cells = [];
    
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ day: null, date: null });
    }
    
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        day: d,
        date: new Date(year, month, d)
      });
    }
    
    return cells;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eDate = new Date(event.date);
      return (
        eDate.getFullYear() === date.getFullYear() &&
        eDate.getMonth() === date.getMonth() &&
        eDate.getDate() === date.getDate()
      );
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  // Compute calendar-view items
  const calendarCells = getDaysInMonth(currentMonth);
  const displayEvents = selectedDate 
    ? getEventsForDate(selectedDate)
    : events.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getMonth() === currentMonth.getMonth() && eDate.getFullYear() === currentMonth.getFullYear();
      });

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content-layout">
        <LeftSidebar />
        
        <main className="main-feed-area">
          <div className="events-page-container">
            
            {/* Page Header */}
            <div className="events-header animate__animated animate__fadeInDown">
              <h1>Events</h1>
              <button className="btn btn-primary create-event-btn" onClick={() => setShowCreateModal(true)}>
                <FiPlus size={18} /> Create Event
              </button>
            </div>

            {/* Three-Way View Toggles */}
            <div className="events-view-selector animate__animated animate__fadeIn">
              <button 
                className={`selector-tab ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid View"
              >
                <FiGrid size={16} /> Grid View
              </button>
              <button 
                className={`selector-tab ${view === 'calendar' ? 'active' : ''}`}
                onClick={() => setView('calendar')}
                aria-label="Calendar View"
              >
                <FiCalendar size={16} /> Calendar
              </button>
              <button 
                className={`selector-tab ${view === 'map' ? 'active' : ''}`}
                onClick={() => setView('map')}
                aria-label="Interactive Map"
              >
                <FiMap size={16} /> Map Dashboard
              </button>
            </div>

            {/* Loading Skeletons */}
            {loading ? (
              <div className="events-grid">
                {[1, 2, 3].map(n => <SkeletonEvent key={n} />)}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                
                {/* 1. MASONRY GRID VIEW */}
                {view === 'grid' && (
                  <motion.div 
                    key="grid"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    {events.length === 0 ? (
                      <div className="card" style={{ padding: '48px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <FiCalendar size={48} style={{ color: 'var(--brand-color)', marginBottom: '16px', opacity: 0.8 }} />
                        <h3>No upcoming events</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Gather your friends together by hosting a brand new event!</p>
                      </div>
                    ) : (
                      <div className="events-grid">
                        {events.map((event, index) => {
                          const eventDate = new Date(event.date);
                          const isAttending = event.attendees.some(a => a._id === user?._id);
                          const isCreator = event.creator?._id === user?._id;
                          
                          // Guards for deleted creators
                          const creatorName = event.creator?.name || 'Deleted User';
                          const creatorPic = event.creator?.profilePicture || '';

                          return (
                            <motion.div 
                              key={event._id} 
                              className="card event-card"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="event-cover-container">
                                {event.coverImage ? (
                                  <img src={event.coverImage} alt={event.title} className="event-cover" />
                                ) : (
                                  <div className="event-cover-placeholder">
                                    <FiCalendar size={44} />
                                  </div>
                                )}
                                <div className="creator-floating-badge">
                                  {creatorPic ? (
                                    <img src={creatorPic} alt={creatorName} className="creator-mini-pic" />
                                  ) : (
                                    <div className="drawer-attendee-initials" style={{ width: 16, height: 16, fontSize: 8 }}>
                                      {creatorName.substring(0, 1)}
                                    </div>
                                  )}
                                  <span>{creatorName}</span>
                                </div>
                              </div>

                              <div className="event-details">
                                <div className="event-main-info">
                                  <div className="event-date-badge">
                                    <span className="event-date-month">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                                    <span className="event-date-day">{eventDate.getDate()}</span>
                                  </div>
                                  <div className="event-info-right">
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-meta">
                                      <span className="event-meta-item">
                                        <FiCalendar size={13} />
                                        {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                      {event.location && (
                                        <span className="event-meta-item">
                                          <FiMapPin size={13} />
                                          {event.location}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {event.description && (
                                  <p className="event-description-preview">
                                    {event.description}
                                  </p>
                                )}

                                <div className="event-footer-section">
                                  <div className="event-attendees">
                                    <div className="attendees-avatars">
                                      {event.attendees.slice(0, 3).map((attendee, i) => (
                                        <div key={attendee._id} className="attendee-avatar" style={{ zIndex: 3 - i }}>
                                          {attendee.profilePicture ? (
                                            <img src={attendee.profilePicture} alt={attendee.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                          ) : (
                                            <div className="avatar-initials" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
                                              {getInitials(attendee.name || 'User')}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    <span className="attendees-count">
                                      {event.attendees.length} attending
                                    </span>
                                  </div>

                                  <div className="card-action-btns" onClick={e => e.stopPropagation()}>
                                    <button 
                                      className={`btn ${isAttending ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                                      onClick={() => handleRSVP(event._id)}
                                      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      {isAttending && <FiCheckCircle />}
                                      {isAttending ? 'Going' : 'RSVP'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. CUSTOM GRID CALENDAR VIEW */}
                {view === 'calendar' && (
                  <motion.div 
                    key="calendar"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="calendar-view-container"
                  >
                    <div className="calendar-top-bar">
                      <h2 className="calendar-month-year">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h2>
                      <div className="calendar-nav-buttons">
                        <button className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">
                          <FiChevronLeft size={20} />
                        </button>
                        <button className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next Month">
                          <FiChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="calendar-grid">
                      {WEEKDAYS.map(w => (
                        <div key={w} className="calendar-weekday">{w}</div>
                      ))}
                      
                      {calendarCells.map((cell, idx) => {
                        const isToday = cell.date && cell.date.toDateString() === new Date().toDateString();
                        const cellEvents = cell.date ? getEventsForDate(cell.date) : [];
                        const isSelected = selectedDate && cell.date && cell.date.toDateString() === selectedDate.toDateString();

                        if (!cell.day) {
                          return <div key={`empty-${idx}`} className="calendar-day-cell empty-day" />;
                        }

                        return (
                          <div 
                            key={`day-${cell.day}`} 
                            className={`calendar-day-cell ${cellEvents.length > 0 ? 'has-event' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => cell.date && setSelectedDate(cell.date)}
                          >
                            <span className="calendar-day-num">{cell.day}</span>
                            
                            <div className="calendar-event-indicators">
                              {cellEvents.slice(0, 3).map((ev) => (
                                <span key={ev._id} className="calendar-event-dot" title={ev.title} />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Filtered Calendar Event Details */}
                    <div className="day-events-panel">
                      <h3 className="day-events-title">
                        <FiCalendar size={18} style={{ color: 'var(--brand-color)' }} />
                        {selectedDate ? (
                          `Events for ${selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}`
                        ) : (
                          `All Events in ${currentMonth.toLocaleString('default', { month: 'long' })}`
                        )}
                      </h3>

                      {displayEvents.length === 0 ? (
                        <div className="card" style={{ padding: '30px', textAlign: 'center', background: 'rgba(255,255,255,0.01)', color: 'var(--text-secondary)' }}>
                          No events scheduled for this block.
                        </div>
                      ) : (
                        <div className="events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                          {displayEvents.map(event => (
                            <div key={event._id} className="card event-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedEvent(event)}>
                              <div style={{ padding: '16px' }}>
                                <h4 style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>{event.title}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FiCalendar size={12} style={{ color: 'var(--brand-color)' }} />
                                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                  {event.location && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <FiMapPin size={12} style={{ color: 'var(--brand-color)' }} />
                                      {event.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. INTERACTIVE MAP VIEW */}
                {view === 'map' && (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {!leafletLoaded ? (
                      <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div className="spinner" style={{ margin: '0 auto 16px' }} />
                        <p>Initializing Map Dashboard...</p>
                      </div>
                    ) : (
                      <div className="events-map-view-wrapper">
                        <div id="events-map" className="leaflet-container-events" />
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            )}
          </div>
        </main>
        
        <RightSidebar />
      </div>

      {/* --- SIDE-SLIDE EVENT DETAILS DRAWER --- */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="event-detail-drawer-overlay" onClick={() => setSelectedEvent(null)}>
            <motion.div 
              className="event-detail-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="drawer-close-btn" onClick={() => setSelectedEvent(null)} aria-label="Close Details">
                <FiX size={20} />
              </button>

              {selectedEvent.coverImage ? (
                <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="drawer-cover" />
              ) : (
                <div className="drawer-cover-placeholder">
                  <FiCalendar size={56} />
                </div>
              )}

              <div className="drawer-content">
                <div className="drawer-header-info">
                  <div className="event-date-badge">
                    <span className="event-date-month">{new Date(selectedEvent.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="event-date-day">{new Date(selectedEvent.date).getDate()}</span>
                  </div>
                  <div>
                    <h2 className="drawer-title">{selectedEvent.title}</h2>
                    <p style={{ fontSize: '13px', color: 'var(--brand-color)', marginTop: '4px', fontWeight: 500 }}>
                      Created by {selectedEvent.creator?.name || 'Deleted User'}
                    </p>
                  </div>
                </div>

                <div className="drawer-meta-list">
                  <div className="drawer-meta-item">
                    <FiCalendar size={16} />
                    <span>
                      {new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} at{' '}
                      {new Date(selectedEvent.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {selectedEvent.location && (
                    <div className="drawer-meta-item">
                      <FiMapPin size={16} />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="drawer-section-title">Description</h4>
                    <p className="drawer-description">{selectedEvent.description}</p>
                  </div>
                )}

                {/* Miniature Map */}
                {selectedEvent.location && (
                  <div>
                    <h4 className="drawer-section-title">Location Map</h4>
                    {!leafletLoaded ? (
                      <div className="drawer-map-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Loading Location Map...</span>
                      </div>
                    ) : (
                      <div className="drawer-map-container">
                        <div id="drawer-mini-map" style={{ width: '100%', height: '100%' }} />
                      </div>
                    )}
                  </div>
                )}

                {/* Attendees list grid */}
                <div className="drawer-attendees-section">
                  <h4 className="drawer-section-title">
                    Attendees ({selectedEvent.attendees.length})
                  </h4>
                  {selectedEvent.attendees.length === 0 ? (
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      No attendees yet. Be the first to RSVP!
                    </p>
                  ) : (
                    <div className="drawer-attendees-grid">
                      {selectedEvent.attendees.map(attendee => (
                        <div key={attendee._id} className="drawer-attendee-card">
                          {attendee.profilePicture ? (
                            <img src={attendee.profilePicture} alt={attendee.name} className="drawer-attendee-pic" />
                          ) : (
                            <div className="drawer-attendee-initials">
                              {getInitials(attendee.name || 'User')}
                            </div>
                          )}
                          <span className="drawer-attendee-name" title={attendee.name}>
                            {attendee.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RSVP and Creator actions */}
              <div className="drawer-actions-panel">
                <button 
                  className={`btn ${selectedEvent.attendees.some(a => a._id === user?._id) ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
                  onClick={() => handleRSVP(selectedEvent._id)}
                >
                  {selectedEvent.attendees.some(a => a._id === user?._id) && <FiCheckCircle size={16} />}
                  {selectedEvent.attendees.some(a => a._id === user?._id) ? 'Attending' : 'RSVP: I\'m Going'}
                </button>
                {selectedEvent.creator?._id === user?._id && (
                  <button 
                    className="btn btn-secondary"
                    style={{ border: '1px solid rgba(220, 38, 38, 0.4)', color: '#ef4444' }}
                    onClick={() => handleDelete(selectedEvent._id)}
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CREATE EVENT MODAL OVERLAY --- */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="event-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <motion.div 
              className="card event-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="event-modal-header">
                <h2>Create New Event</h2>
                <button className="close-modal-btn" onClick={() => setShowCreateModal(false)} aria-label="Close Creator">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} style={{ marginTop: '16px' }}>
                <div className="event-form-group">
                  <label htmlFor="event-name">Event Name *</label>
                  <input 
                    id="event-name"
                    type="text" 
                    className="event-form-input" 
                    placeholder="Enter event name..."
                    required 
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>

                <div className="event-form-group">
                  <label htmlFor="event-date">Date & Time *</label>
                  <input 
                    id="event-date"
                    type="datetime-local" 
                    className="event-form-input" 
                    required 
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>

                <div className="event-form-group">
                  <label htmlFor="event-location">Location Address *</label>
                  <input 
                    id="event-location"
                    type="text" 
                    className="event-form-input" 
                    placeholder="e.g. San Francisco, CA or 40.71, -74.00"
                    required
                    value={newEvent.location}
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                  />
                  <small style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                    Type standard addresses (e.g. London, Tokyo) or precise coordinates for high-fidelity pin mapping.
                  </small>
                </div>

                <div className="event-form-group">
                  <label htmlFor="event-desc">Description</label>
                  <textarea 
                    id="event-desc"
                    className="event-form-input" 
                    placeholder="Describe what guests can expect..."
                    rows={3}
                    value={newEvent.description}
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="event-form-group">
                  <label htmlFor="event-cover">Cover Image File</label>
                  <input 
                    id="event-cover"
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    style={{ background: 'transparent', border: 'none', padding: '4px 0' }}
                  />
                  {imagePreview && (
                    <div style={{ marginTop: '12px', width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <img src={imagePreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                <div className="event-modal-actions" style={{ marginTop: '24px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;

