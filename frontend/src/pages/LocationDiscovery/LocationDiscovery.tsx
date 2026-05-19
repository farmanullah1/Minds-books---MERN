/**
 * CodeDNA
 * LocationDiscovery.tsx — High-Fidelity Geolocation Check-In & Local Discovery (PROMPT-53)
 * exports: default LocationDiscovery
 * used_by: App.tsx
 * rules: Yellow marker highlights, OpenStreetMap simulator, live radius filters, nearby events trays
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiNavigation, FiSearch, FiSliders, 
  FiShoppingBag, FiCalendar, FiUsers, FiCompass, 
  FiCheckCircle, FiCrosshair, FiGrid, FiClock 
} from 'react-icons/fi';
import './LocationDiscovery.css';

interface LocalItem {
  id: string;
  name: string;
  category: 'restaurant' | 'cafe' | 'hotel' | 'stadium' | 'airport' | 'work' | 'home';
  distance: number; // in km
  address: string;
  coordinates: [number, number];
}

const LocationDiscovery: React.FC = () => {
  // Discovery mode tabs: discover | check-ins | local-friends
  const [activeTab, setActiveTab] = useState<'discover' | 'check-ins' | 'local-friends'>('discover');
  
  // Interactive radius filter
  const [radius, setRadius] = useState<number>(5); // in km
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Current user coordinate
  const [userCoords, setUserCoords] = useState<[number, number]>([34.0522, -118.2437]); // Default LA
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locatedSuccess, setLocatedSuccess] = useState<boolean>(false);

  // Selected place pin
  const [selectedPin, setSelectedPin] = useState<LocalItem | null>(null);

  // Mocked local items list
  const localPlaces: LocalItem[] = [
    { id: 'loc_1', name: 'Golden Brew Premium Café', category: 'cafe', distance: 1.2, address: '742 Accent Blvd, Tech District', coordinates: [34.0532, -118.2447] },
    { id: 'loc_2', name: 'The Byte Burger House', category: 'restaurant', distance: 2.8, address: '12 Spring Loop St, Metro Center', coordinates: [34.0502, -118.2407] },
    { id: 'loc_3', name: 'Silicon Arena Stadium', category: 'stadium', distance: 4.5, address: '88 Vector Way, Olympics Zone', coordinates: [34.0592, -118.2487] },
    { id: 'loc_4', name: 'Apex Tech Workspace', category: 'work', distance: 0.5, address: '22 Hydration Lane, Gold Plaza', coordinates: [34.0512, -118.2427] },
    { id: 'loc_5', name: 'International Airport Hub', category: 'airport', distance: 12.0, address: 'Terminal 4, Airport Access Road', coordinates: [34.0622, -118.2337] },
    { id: 'loc_6', name: 'Premium HSL Glass Suites', category: 'hotel', distance: 3.4, address: '99 Eased Progress Ave', coordinates: [34.0542, -118.2457] }
  ];

  // Checkins history list
  const [checkins, setCheckins] = useState([
    { id: 'chk_1', user: 'Farmanullah Ansari', place: 'Golden Brew Premium Café', time: '10 mins ago', category: 'cafe' },
    { id: 'chk_2', user: 'Sarah Jenkins', place: 'Apex Tech Workspace', time: '2 hours ago', category: 'work' }
  ]);
  const [customCheckinPlace, setCustomCheckinPlace] = useState('');

  // Geolocation trigger
  const requestLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      // Simulate reverse geocoding to LA Accent Valley coordinates
      setUserCoords([34.0522, -118.2437]);
      setIsLocating(false);
      setLocatedSuccess(true);
      setTimeout(() => setLocatedSuccess(false), 3000);
    }, 1500);
  };

  const handleCustomCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCheckinPlace) return;

    setCheckins(prev => [
      {
        id: `chk_${Date.now()}`,
        user: 'Farmanullah Ansari',
        place: customCheckinPlace,
        time: 'Just now',
        category: 'cafe'
      },
      ...prev
    ]);
    setCustomCheckinPlace('');
  };

  // Filter local items
  const filteredPlaces = localPlaces.filter((place) => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesDistance = place.distance <= radius;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDistance && matchesSearch;
  });

  return (
    <div className="location-page-container">
      
      {/* Top Header Block */}
      <div className="location-top-hero">
        <div className="hero-text-block">
          <span className="location-pill">📍 MAPS & CHECK-IN</span>
          <h1>MindBook Location Discovery</h1>
          <p>Discover trending spots, view local events near you, filter local items, and check-in to share with friends.</p>
        </div>

        <button 
          className={`locate-gps-btn ${locatedSuccess ? 'success' : ''}`} 
          onClick={requestLocation}
          disabled={isLocating}
        >
          <FiCrosshair className={isLocating ? 'spin-icon' : ''} />
          <span>{isLocating ? 'Locating User GPS...' : locatedSuccess ? 'Location Synchronized' : 'Synchronize Location'}</span>
        </button>
      </div>

      {/* Tabs navigation list */}
      <div className="location-tabs-bar">
        {[
          { id: 'discover', label: 'Discover Places', icon: <FiCompass /> },
          { id: 'check-ins', label: 'Active Check-Ins', icon: <FiCheckCircle /> },
          { id: 'local-friends', label: 'Friends Nearby', icon: <FiUsers /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            className={`location-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main split viewport layout */}
      <div className="location-main-layout">
        
        {/* LEFT COLUMN: Controls and results lists */}
        <div className="location-control-panel">
          
          {activeTab === 'discover' && (
            <>
              {/* Distance radius control */}
              <div className="panel-card card">
                <h3><FiSliders /> Local Area Radius Filter</h3>
                <div className="radius-slider-box">
                  <div className="slider-label-row">
                    <span>Radius distance:</span>
                    <span className="radius-highlight">{radius} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    value={radius} 
                    onChange={(e) => setRadius(parseInt(e.target.value))} 
                    className="accent-range-slider"
                  />
                  <div className="slider-range-span">
                    <span>1 km</span>
                    <span>15 km</span>
                  </div>
                </div>
              </div>

              {/* Category selector grid */}
              <div className="panel-card card">
                <h3>🏷️ Place Categories</h3>
                <div className="categories-badge-grid">
                  {['all', 'cafe', 'restaurant', 'stadium', 'work', 'hotel', 'airport'].map((cat) => (
                    <button 
                      key={cat} 
                      className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Local Search input */}
              <div className="panel-card card">
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search cafes, restaurants..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Local Places list container */}
              <div className="local-list-container">
                <h3>📍 Nearby Spots ({filteredPlaces.length})</h3>
                <div className="spots-scroll-tray">
                  {filteredPlaces.map((place) => (
                    <div 
                      key={place.id} 
                      className={`spot-row-item ${selectedPin?.id === place.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPin(place)}
                    >
                      <div className="spot-header-line">
                        <h4>{place.name}</h4>
                        <span className="distance-badge">{place.distance} km away</span>
                      </div>
                      <p className="address-text">{place.address}</p>
                      <span className={`cat-label-pill ${place.category}`}>{place.category}</span>
                    </div>
                  ))}
                  {filteredPlaces.length === 0 && (
                    <div className="no-spots-card card">
                      <p>No spots found within {radius} km. Try expanding your search radius!</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'check-ins' && (
            <>
              {/* Check-in custom post */}
              <div className="panel-card card">
                <h3>📌 Check-In to Share</h3>
                <p>Register your check-in tag instantly! This sends a localized beacon update notifying friends in the same city.</p>
                <form onSubmit={handleCustomCheckin} className="checkin-form">
                  <input 
                    type="text" 
                    placeholder="Where are you right now? (e.g. Starbucks Valley)" 
                    value={customCheckinPlace}
                    onChange={(e) => setCustomCheckinPlace(e.target.value)}
                    required
                  />
                  <button type="submit" className="checkin-submit-btn">
                    Check-In Now
                  </button>
                </form>
              </div>

              {/* Checkins timeline */}
              <div className="local-list-container">
                <h3>⏳ Recent Check-Ins Activity</h3>
                <div className="spots-scroll-tray">
                  {checkins.map((chk) => (
                    <div key={chk.id} className="spot-row-item">
                      <div className="spot-header-line">
                        <h4>{chk.user}</h4>
                        <span className="time-badge">{chk.time}</span>
                      </div>
                      <p className="checked-in-place">checked in at 📍 <strong>{chk.place}</strong></p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'local-friends' && (
            <div className="panel-card card">
              <h3>👥 Nearby Friends</h3>
              <p>Opt-in to local synchronization feeds. The nearby radius maps friends within 10 km boundaries with customizable notifications controls.</p>
              
              <div className="local-friends-list">
                <div className="friend-row-card">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Sarah" />
                  <div className="friend-info">
                    <h4>Sarah Jenkins</h4>
                    <p>📍 Golden Brew Premium Café (1.2 km away)</p>
                  </div>
                </div>

                <div className="friend-row-card">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Michael" />
                  <div className="friend-info">
                    <h4>Michael Rover</h4>
                    <p>📍 Apex Tech Workspace (0.5 km away)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Map rendering stage */}
        <div className="location-map-viewport card">
          <div className="map-view-header">
            <FiNavigation size={18} className="nav-accent-icon animate-pulse" />
            <span>OpenStreetMap Sandbox Map</span>
          </div>

          <div className="map-embed-container">
            {/* Interactive styled simulation rendering */}
            <div className="simulated-map-stage">
              
              {/* Map background grid lines */}
              <div className="map-grid-layer" />

              {/* Selected spot details popup */}
              <AnimatePresence>
                {selectedPin && (
                  <motion.div 
                    className="map-spot-popup card"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <button className="popup-close-btn" onClick={() => setSelectedPin(null)}>✕</button>
                    <h4>{selectedPin.name}</h4>
                    <p className="popup-addr">{selectedPin.address}</p>
                    <span className="popup-distance">{selectedPin.distance} km away</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User location dot GPS */}
              <div className="user-gps-dot">
                <div className="ping-ring" />
              </div>

              {/* Simulated Map Markers from active place cards */}
              {filteredPlaces.map((place, index) => {
                // Generate absolute styled placements from virtual mock locations coordinates
                const leftPercent = 50 + (place.coordinates[1] - userCoords[1]) * 10000;
                const topPercent = 50 - (place.coordinates[0] - userCoords[0]) * 10000;

                return (
                  <button 
                    key={place.id}
                    className={`map-marker-pin ${selectedPin?.id === place.id ? 'active' : ''}`}
                    style={{ 
                      left: `${Math.max(10, Math.min(90, leftPercent))}%`, 
                      top: `${Math.max(10, Math.min(90, topPercent))}%` 
                    }}
                    onClick={() => setSelectedPin(place)}
                    title={place.name}
                  >
                    <FiMapPin size={24} />
                    <span className="marker-tooltip">{place.name}</span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Map interactive instructions footer */}
          <div className="map-view-footer">
            <span>💡 Click spots in the left directory to highlight and pinpoint their custom location coordinates on the map.</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LocationDiscovery;
