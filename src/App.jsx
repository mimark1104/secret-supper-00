import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Room Data with Numeric Max Capacity and Mixed Media (Images + Videos)
const ROOMS_DATA = [
  {
    id: 'none',
    title: "I'LL HAVE MY OWN ACCOMMODATION",
    tag: 'SELF // STAY',
    price: 0,
    pax: 'N/A',
    maxCapacity: 999,
    description: 'Bringing your own camp setup or staying off-site. Standard port shuttle rates apply.',
    features: ['No room fee', 'Access to Secret Supper grounds', 'Standard shuttle rates apply'],
    media: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'garage',
    title: 'GARAGE ROOM',
    tag: 'SUITE // 01',
    price: 6000,
    pax: '2-4 PAX',
    maxCapacity: 4,
    description: 'Raw poured concrete aesthetic featuring an expansive open floor design, private en suite bathroom, and a structural balcony looking out over the nature canopy.',
    features: ['En suite bathroom', 'Private balcony', 'Raw aggregate finish', 'Natural ventilation', 'Free port shuttle service'],
    media: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/Garage/photo_2026-11-05_16-33-24.jpg?updatedAt=1795142952417'
      },
      {
        type: 'video',
        src: 'https://ik.imagekit.io/xbpqihuhq/Garage/videoplayback%20(1).mp4?updatedAt=1795142952955',
        poster: 'https://ik.imagekit.io/xbpqihuhq/Garage/photo_2026-11-05_16-33-24.jpg?updatedAt=1795142952417'
      },
      {
        type: 'video',
        src: 'https://ik.imagekit.io/xbpqihuhq/Garage/535AB113-9C84-4FA2-AF5C-AD5D75C5CC9E.MOV?updatedAt=1795142953005',
        poster: 'https://ik.imagekit.io/xbpqihuhq/Garage/photo_2026-11-05_16-33-24.jpg?updatedAt=1795142952417'
      },
      {
        type: 'video',
        src: 'https://ik.imagekit.io/xbpqihuhq/Garage/44EAE03B-CA94-4DD8-A991-01D97245C2CD.MOV?updatedAt=1795142953189',
        poster: 'https://ik.imagekit.io/xbpqihuhq/Garage/photo_2026-11-05_16-33-24.jpg?updatedAt=1795142952417'
      }
    ]
  },
  {
    id: 'bed1',
    title: 'BEDROOM 1',
    tag: 'SUITE // 02',
    price: 5000,
    pax: '2-3 PAX',
    maxCapacity: 3,
    description: 'Minimalist suite crafted with slate tiles and cedar accents. Fully climate-controlled with air conditioning and private en suite facilities.',
    features: ['En suite bathroom', 'Air conditioning', 'Slate floor tiles', 'Forest view framing', 'Free port shuttle service'],
    media: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed1/photo_2026-11-05_16-37-40.jpg?updatedAt=1795142982542'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed1/photo_2026-11-05_16-37-37.jpg?updatedAt=1795142982466'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed1/photo_2026-11-05_16-37-41.jpg?updatedAt=1795142982516'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed1/photo_2026-11-05_16-37-41%20(2).jpg?updatedAt=1795142982616'
      }
    ]
  },
  {
    id: 'bed2',
    title: 'BEDROOM 2',
    tag: 'SUITE // 03',
    price: 4000,
    pax: '2-3 PAX',
    maxCapacity: 3,
    description: 'A cozy brutalist shelter focusing on acoustic dampening and high-altitude rest. Equipped with air conditioning and shared facility access.',
    features: ['Air conditioning', 'Sound-dampened concrete walls', 'Integrated reading nook', 'Free port shuttle service'],
    media: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed2/photo_2026-11-05_16-52-22.jpg?updatedAt=1795143006102'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed2/photo_2026-11-05_16-52-21.jpg?updatedAt=1795143005364'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed2/photo_2026-11-05_16-52-22%20(3).jpg?updatedAt=1795143005462'
      },
      {
        type: 'video',
        src: 'https://ik.imagekit.io/xbpqihuhq/bed2/A6781D39-1051-4201-8A93-065F8281F2E0.MOV?updatedAt=1795143006283',
        poster: 'https://ik.imagekit.io/xbpqihuhq/bed2/photo_2026-11-05_16-52-22.jpg?updatedAt=1795143006102'
      }
    ]
  }
];

function getRoomPreviewImage(room) {
  const first = room.media?.[0];
  if (!first) return '';
  return first.type === 'video' ? first.poster || '' : first.src;
}

const SET_COURSE_PRICE = 5000;

const SET_COURSES = [
  {
    id: 'weed-infused-supper',
    brand: 'SECRET SUPPER CLUB 01',
    subtitle: '5-Course Vegetarian Weed-Infused Menu',
    price: SET_COURSE_PRICE,
    unit: '/ seat',
    spiceLevel: 'Mild',
    beverages: [
      'Mango Mint Tea',
      'Sparkling Cucumber Lemon Cooler'
    ],
    courses: [
      'Roasted Vegetables Bruschetta with Hot Honey',
      'Seaweed Pasta with Crushed Cheddar Bites',
      'Bang Bang Cauliflower and Tofu',
      'Breaded Oyster Mushroom and Chimichurri',
      'Turon Joint with Caramel and Coconut Ice Cream'
    ]
  }
];

const SHUTTLE_OPTIONS = [
  { id: 'none', label: 'No Shuttle Needed', price: 0, maxPax: '-' },
  { id: 'habal', label: 'Habal-Habal (Motorcycle)', price: 200, maxPax: '1 pax max' },
  { id: 'tuktuk', label: 'Tuktuk Transfer', price: 300, maxPax: '3 pax max' },
  { id: 'suv', label: 'Private SUV Transfer', price: 500, maxPax: '5 pax max' }
];

function getRoomAvailability(room, reservations) {
  if (room.id === 'none') {
    return { isDisabled: false, reason: '', remainingSlots: 999 };
  }

  const verifiedBookings = reservations.filter(
    r => r.roomId === room.id && r.paymentStatus === 'Paid' && r.fulfillmentStatus === 'Fulfilled'
  );

  const hasSoloLock = verifiedBookings.some(r => r.bookingType === 'Solo');
  if (hasSoloLock) {
    return { isDisabled: true, reason: 'BOOKED (SOLO)', remainingSlots: 0 };
  }

  const occupiedSlots = verifiedBookings.reduce((sum, r) => sum + (Number(r.paxCount) || 1), 0);
  const remainingSlots = Math.max(0, room.maxCapacity - occupiedSlots);

  if (remainingSlots <= 0) {
    return { isDisabled: true, reason: 'FULL (SHARED)', remainingSlots: 0 };
  }

  if (occupiedSlots > 0) {
    return {
      isDisabled: false,
      reason: `SHARED ONLY — ${remainingSlots} SLOT${remainingSlots > 1 ? 'S' : ''} LEFT`,
      remainingSlots
    };
  }

  return { isDisabled: false, reason: '', remainingSlots: room.maxCapacity };
}

// Helper to map Supabase snake_case rows to frontend camelCase objects
function mapDbRowToReservation(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || '',
    telegram: row.telegram || '-',
    roomId: row.room_id,
    room: row.room,
    bookingType: row.booking_type,
    paxCount: row.pax_count,
    shuttle: row.shuttle,
    totalCost: row.total_cost,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    date: row.event_date
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('00');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Clean empty initial state—populated from Supabase
  const [reservations, setReservations] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);

  const fetchReservations = async () => {
    setIsLoadingReservations(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reservations:', error.message);
    } else if (data) {
      setReservations(data.map(mapDbRowToReservation));
    }
    setIsLoadingReservations(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Keyboard shortcut only (Ctrl+Shift+A / Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={styles.appWrapper}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80"
        style={styles.bgVideo}
      >
        <source
          src="https://ik.imagekit.io/xbpqihuhq/171308-845439549.mp4"
          type="video/mp4"
        />
      </video>

      <div style={styles.bgOverlay} />

      <div style={styles.mainContainer}>
        <header style={styles.header}>
          <div style={styles.brandTitle} onClick={() => setActiveTab('00')}>
            {/* <span style={styles.brandBadge}>HP // MM</span> */}
            <span style={styles.brandText}>House Plant</span>
          </div>

          <button
            style={styles.menuToggleButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </header>

        {menuOpen && (
          <div style={styles.drawerOverlay}>
            <div style={styles.drawerContent}>
              <div style={styles.drawerHeader}>
                <span style={styles.drawerTitle}>NAVIGATION // SYSTEM</span>
                <button style={styles.closeDrawerBtn} onClick={() => setMenuOpen(false)}>✕</button>
              </div>
              <nav style={styles.drawerNav}>
                {[
                  { id: '00', label: 'OVERVIEW' },
                  { id: '01', label: 'ROOMS & RATES' },
                  { id: '02', label: 'SET COURSE' },
                  { id: '03', label: 'RESERVATION' }
                ].map(item => (
                  <button
                    key={item.id}
                    style={{
                      ...styles.drawerNavItem,
                      backgroundColor: activeTab === item.id ? '#345346' : '#DCD6CD',
                      color: activeTab === item.id ? '#DCD6CD' : '#594C3B'
                    }}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span>{item.id}.</span> {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {activeTab === '00' && <OverviewTab setActiveTab={setActiveTab} />}
        {activeTab === '01' && (
          <RoomsTab
            setSelectedGallery={setSelectedGallery}
            setActiveTab={setActiveTab}
            reservations={reservations}
          />
        )}
        {activeTab === '02' && <FoodMenuTab setActiveTab={setActiveTab} />}
        {activeTab === '03' && (
          <ReservationTab
            reservations={reservations}
            setReservations={setReservations}
            isLoadingReservations={isLoadingReservations}
          />
        )}

        {/* Public Footer (No Admin Button or Trigger) */}
        <footer style={styles.footer}>
          <div style={styles.footerMainBlock}>
            <div style={styles.footerEventDate}>November 28, Saturday | 4 PM</div>
            <div style={styles.footerNotice}>Limited seats. Serious inquiries only.</div>
            <div style={styles.footerDmLine}>
              For the curious and genuinely interested, DM <strong>@MunchkinMunchies</strong> for details and reservations
            </div>
            <div style={styles.footerExtraNotes}>
              <div>• Accommodation available for solo guests or those willing to share with fellow participants.</div>
              <div>• Complimentary port-to-venue transfer when you book your accommodation with us.</div>
            </div>
          </div>
          <div style={styles.footerBottomRow}>
            <span>SECRET SUPPER // 2026</span>
            <span>PUERTO GALERA</span>
          </div>
        </footer>
      </div>

      {selectedGallery && (
        <GalleryModal gallery={selectedGallery} onClose={() => setSelectedGallery(null)} />
      )}

      {isAdminOpen && (
        <AdminModal
          onClose={() => setIsAdminOpen(false)}
          adminPin={adminPin}
          setAdminPin={setAdminPin}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          reservations={reservations}
          setReservations={setReservations}
          refreshReservations={fetchReservations}
        />
      )}
    </div>
  );
}

// 00. Overview Tab
function OverviewTab({ setActiveTab }) {
  const [typewriterText, setTypewriterText] = useState('');
  const targetTitle = 'Secret Supper Club';

  useEffect(() => {
    let currentChar = 0;
    const timer = setInterval(() => {
      currentChar++;
      setTypewriterText(targetTitle.substring(0, currentChar));
      if (currentChar >= targetTitle.length) {
        clearInterval(timer);
      }
    }, 85);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.contentSection}>
      <div style={styles.heroCard}>
        <div style={styles.cardHeaderBadge}>SECRET SUPPER // 00</div>
        <h1 style={styles.typewriterHeader}>
          {typewriterText}<span style={styles.cursor}>|</span>
        </h1>
        <div style={styles.heroSubtitle}>
          House Plant, in collaboration with Munchkin Munchies, presents SECRET SUPPER CLUB 01.
        </div>
        <p style={styles.heroDescription}>
          An intimate gathering, a thoughtfully curated five-course infused menu, and a pretty damn good time! 😉
        </p>

        <div style={styles.heroActions}>
          <button style={styles.primaryButton} onClick={() => setActiveTab('03')}>
            MAKE RESERVATION →
          </button>
          <button style={styles.secondaryButton} onClick={() => setActiveTab('02')}>
            VIEW SET COURSE [02]
          </button>
        </div>
      </div>
    </div>
  );
}

// 01. Rooms & Rates Tab
function RoomsTab({ setSelectedGallery, setActiveTab, reservations }) {
  return (
    <div style={styles.contentSection}>
      <div style={styles.sectionHeaderCard}>
        <div style={styles.cardHeaderBadge}>ACCOMMODATIONS // 01</div>
        <h2 style={styles.sectionTitle}>ROOMS & RATES</h2>
        <p style={styles.bodyText}>All room stays include private mountain access and <strong>complimentary port-to-venue transfers</strong>.</p>
      </div>

      <div style={styles.gridContainer}>
        {ROOMS_DATA.filter(r => r.id !== 'none').map(room => {
          const availability = getRoomAvailability(room, reservations);
          const mediaCount = room.media?.length || 0;
          const hasVideo = room.media?.some(m => m.type === 'video');

          return (
            <div
              key={room.id}
              style={{
                ...styles.roomCard,
                opacity: availability.isDisabled ? 0.6 : 1
              }}
            >
              <div
                style={{
                  ...styles.imagePreviewWrapper,
                  backgroundImage: `url(${getRoomPreviewImage(room)})`,
                  filter: availability.isDisabled ? 'grayscale(100%)' : 'none'
                }}
                onClick={() => setSelectedGallery({ room, activeIndex: 0 })}
              >
                <div style={styles.galleryBadge}>
                  VIEW GALLERY ({mediaCount} {hasVideo ? 'MEDIA / VIDEO' : 'PHOTOS'}) 🔍
                </div>
              </div>
              <div style={styles.roomCardBody}>
                <div style={styles.roomHeaderRow}>
                  <span style={styles.cardHeaderBadge}>{room.tag}</span>
                  <span style={styles.paxTag}>
                    {availability.isDisabled ? availability.reason : room.pax}
                  </span>
                </div>
                <h3 style={styles.roomTitle}>{room.title}</h3>
                <div style={styles.priceTag}>
                  ₱{room.price.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>/ night</span>
                </div>
                <p style={styles.bodyText}>{room.description}</p>

                <ul style={styles.featureList}>
                  {room.features.map((feat, i) => (
                    <li key={i} style={styles.featureItem}>▪ {feat}</li>
                  ))}
                </ul>

                <button
                  disabled={availability.isDisabled}
                  style={{
                    ...styles.primaryButtonBlock,
                    backgroundColor: availability.isDisabled ? '#816E57' : '#345346',
                    cursor: availability.isDisabled ? 'not-allowed' : 'pointer',
                    opacity: availability.isDisabled ? 0.65 : 1
                  }}
                  onClick={() => setActiveTab('03')}
                >
                  {availability.isDisabled ? `UNAVAILABLE — ${availability.reason}` : 'BOOK THIS ROOM →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.cardHeaderBadge}>TRANSPORT // ADD-ON SERVICES</div>
        <h3 style={styles.sectionTitle}>PORT SHUTTLE TRANSFERS</h3>
        <p style={styles.bodyText}>Direct harbor pickup. <strong>100% FREE OF CHARGE</strong> when you book any room.</p>

        <div style={styles.shuttleGrid}>
          {SHUTTLE_OPTIONS.filter(s => s.id !== 'none').map(shuttle => (
            <div key={shuttle.id} style={styles.shuttleCard}>
              <div style={styles.shuttleName}>{shuttle.label}</div>
              <div style={styles.shuttlePrice}>₱{shuttle.price} <span style={{ fontSize: '12px' }}>(Free w/ Room)</span></div>
              <div style={styles.shuttleCap}>{shuttle.maxPax}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 02. Single Course Dining Tab
function FoodMenuTab({ setActiveTab }) {
  const menu = SET_COURSES[0];

  return (
    <div style={styles.contentSection}>
      <div style={styles.sectionHeaderCard}>
        <div style={styles.cardHeaderBadge}>GASTRONOMY // 02</div>
        <h2 style={styles.sectionTitle}>SET COURSE MENU</h2>
        <p style={styles.bodyText}>The only set course available for the evening gathering.</p>
      </div>

      <div style={styles.singleCourseCard}>
        <div style={styles.courseTopHeader}>
          <div>
            <div style={styles.courseBrandTitle}>{menu.brand}</div>
            <div style={styles.courseItalicSubtitle}>{menu.subtitle}</div>
          </div>
          <div style={styles.coursePriceBox}>
            <div style={styles.coursePriceAmount}>Php. {menu.price.toLocaleString()}</div>
            <div style={styles.coursePriceUnit}>{menu.unit}</div>
          </div>
        </div>

        <div style={styles.courseListSection}>
          {menu.courses.map((dish, idx) => (
            <div key={idx} style={styles.courseDishRow}>
              <div style={styles.courseDishName}>
                <span style={{ color: '#816E57', marginRight: '8px' }}>0{idx + 1}.</span>
                {dish}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.beverageSection}>
          <div style={styles.metaDetailRow}>
            <span style={styles.beverageLabel}>SPICE LEVEL:</span>
            <span style={styles.beverageItem}>{menu.spiceLevel}</span>
          </div>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #816E57' }}>
            <div style={{ ...styles.beverageLabel, marginBottom: '6px' }}>DRINKS AVAILABLE:</div>
            {menu.beverages.map((drink, i) => (
              <div key={i} style={styles.beverageItem}>• {drink}</div>
            ))}
          </div>
        </div>

        <div style={styles.courseBottomRow}>
          <span style={styles.locationStamp}>November 28 | 4 PM — Puerto Galera</span>
          <button style={styles.primaryButton} onClick={() => setActiveTab('03')}>
            RESERVE SEAT →
          </button>
        </div>
      </div>
    </div>
  );
}

// 03. Reservation Tab (Inserts directly into Supabase)
function ReservationTab({ reservations, setReservations }) {
  const getInitialRoom = () => {
    const firstOpen = ROOMS_DATA.find(r => r.id !== 'none' && !getRoomAvailability(r, reservations).isDisabled);
    return firstOpen ? firstOpen.id : 'none';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    telegram: '',
    room: getInitialRoom(),
    bookingType: 'Solo',
    paxCount: 1,
    shuttle: 'none'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedModalData, setConfirmedModalData] = useState(null);

  const selectedRoom = ROOMS_DATA.find(r => r.id === formData.room) || ROOMS_DATA[0];
  const roomAvailability = getRoomAvailability(selectedRoom, reservations);
  const selectedShuttle = SHUTTLE_OPTIONS.find(s => s.id === formData.shuttle) || SHUTTLE_OPTIONS[0];

  useEffect(() => {
    if (selectedRoom.id !== 'none' && roomAvailability.remainingSlots < selectedRoom.maxCapacity && formData.bookingType === 'Solo') {
      setFormData(prev => ({ ...prev, bookingType: 'Shared', paxCount: 1 }));
    }
  }, [formData.room, roomAvailability.remainingSlots]);

  const hasRoomSelected = selectedRoom.id !== 'none';
  const finalShuttlePrice = hasRoomSelected ? 0 : selectedShuttle.price;

  const seatQuantity = hasRoomSelected && formData.bookingType === 'Shared' ? Number(formData.paxCount) : 1;
  const setCourseTotal = SET_COURSE_PRICE * seatQuantity;

  const perSlotRate = Math.round(selectedRoom.price / selectedRoom.maxCapacity);
  const accommodationCost = !hasRoomSelected
    ? 0
    : formData.bookingType === 'Solo'
      ? selectedRoom.price
      : perSlotRate * seatQuantity;

  const totalCost = setCourseTotal + accommodationCost + finalShuttlePrice;

  const handleRoomChange = (newRoomId) => {
    const targetRoom = ROOMS_DATA.find(r => r.id === newRoomId);
    const avail = getRoomAvailability(targetRoom, reservations);
    const mustBeShared = targetRoom.id !== 'none' && avail.remainingSlots < targetRoom.maxCapacity;

    setFormData(prev => ({
      ...prev,
      room: newRoomId,
      bookingType: mustBeShared ? 'Shared' : 'Solo',
      paxCount: 1
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomAvailability.isDisabled) {
      alert('This room has already been fulfilled and paid. Please choose another option.');
      return;
    }

    setIsSubmitting(true);

    const reservationId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const eventDate = '2026-11-28';
    const shuttleSummary = `${selectedShuttle.label}${hasRoomSelected && selectedShuttle.id !== 'none' ? ' (FREE w/ Room)' : ''}`;
    const bookingTypeValue = hasRoomSelected ? formData.bookingType : 'N/A';

    const dbPayload = {
      id: reservationId,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || '',
      telegram: formData.telegram || '-',
      room_id: selectedRoom.id,
      room: selectedRoom.title,
      booking_type: bookingTypeValue,
      pax_count: seatQuantity,
      shuttle: shuttleSummary,
      total_cost: totalCost,
      payment_status: 'Unpaid',
      fulfillment_status: 'Pending',
      event_date: eventDate
    };

    const { data, error } = await supabase
      .from('reservations')
      .insert([dbPayload])
      .select()
      .single();

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase insert error:', error.message);
      alert(`Could not save reservation: ${error.message}`);
      return;
    }

    const savedReservation = mapDbRowToReservation(data);
    setReservations(prev => [savedReservation, ...prev]);
    setConfirmedModalData(savedReservation);

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      telegram: '',
      room: getInitialRoom(),
      bookingType: 'Solo',
      paxCount: 1,
      shuttle: 'none'
    });
  };

  return (
    <div style={styles.contentSection}>
      <div style={styles.sectionHeaderCard}>
        <div style={styles.cardHeaderBadge}>BOOKING ENGINE // 03</div>
        <h2 style={styles.sectionTitle}>RESERVE SECRET SUPPER STAY</h2>
        <p style={styles.bodyText}>Select a sanctuary room (solo or shared) or choose your own accommodation.</p>
      </div>

      <div style={styles.bookingLayoutGrid}>
        <form style={styles.formCard} onSubmit={handleSubmit}>
          <div style={styles.formSectionTitle}>[01] GUEST DETAILS</div>

          <label style={styles.label}>FULL NAME *</label>
          <input
            type="text"
            required
            style={styles.inputField}
            placeholder="e.g. Juan Dela Cruz"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />

          <label style={styles.label}>EMAIL ADDRESS *</label>
          <input
            type="email"
            required
            style={styles.inputField}
            placeholder="guest@email.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />

          <label style={styles.label}>TELEGRAM USERNAME *</label>
          <input
            type="text"
            required
            style={styles.inputField}
            placeholder="@username"
            value={formData.telegram}
            onChange={e => setFormData({ ...formData, telegram: e.target.value })}
          />

          <label style={styles.label}>PHONE NUMBER</label>
          <input
            type="tel"
            style={styles.inputField}
            placeholder="+63 900 000 0000"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />

          <div style={styles.formSectionTitle}>[02] ACCOMMODATION SELECTION</div>

          <label style={styles.label}>SELECT ROOM OR OWN ACCOMMODATION</label>
          <select
            style={styles.selectField}
            value={formData.room}
            onChange={e => handleRoomChange(e.target.value)}
          >
            {ROOMS_DATA.map(room => {
              const avail = getRoomAvailability(room, reservations);
              return (
                <option
                  key={room.id}
                  value={room.id}
                  disabled={avail.isDisabled}
                  style={{
                    color: avail.isDisabled ? '#999999' : '#594C3B',
                    backgroundColor: avail.isDisabled ? '#c4beb5' : '#DCD6CD'
                  }}
                >
                  {room.title}{' '}
                  {room.price > 0 ? `(₱${room.price.toLocaleString()} — ${room.pax})` : '(₱0)'}
                  {avail.reason ? ` [${avail.reason}]` : ''}
                </option>
              );
            })}
          </select>

          {hasRoomSelected && (
            <div style={styles.conditionalBox}>
              <label style={styles.label}>BOOKING OCCUPANCY TYPE *</label>
              <div style={styles.radioRow}>
                <button
                  type="button"
                  disabled={roomAvailability.remainingSlots < selectedRoom.maxCapacity}
                  onClick={() => setFormData({ ...formData, bookingType: 'Solo', paxCount: 1 })}
                  style={{
                    ...styles.toggleChip,
                    backgroundColor: formData.bookingType === 'Solo' ? '#345346' : '#DCD6CD',
                    color: formData.bookingType === 'Solo' ? '#DCD6CD' : '#594C3B',
                    opacity: roomAvailability.remainingSlots < selectedRoom.maxCapacity ? 0.45 : 1,
                    cursor: roomAvailability.remainingSlots < selectedRoom.maxCapacity ? 'not-allowed' : 'pointer'
                  }}
                >
                  SOLO ROOM (PRIVATE — ₱{selectedRoom.price.toLocaleString()})
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bookingType: 'Shared', paxCount: 1 })}
                  style={{
                    ...styles.toggleChip,
                    backgroundColor: formData.bookingType === 'Shared' ? '#345346' : '#DCD6CD',
                    color: formData.bookingType === 'Shared' ? '#DCD6CD' : '#594C3B'
                  }}
                >
                  SHARED ROOM (₱{perSlotRate.toLocaleString()} / PAX)
                </button>
              </div>

              {formData.bookingType === 'Shared' && (
                <div style={{ marginTop: '12px' }}>
                  <label style={styles.label}>
                    NUMBER OF SHARED SLOTS (MAX {roomAvailability.remainingSlots} AVAILABLE)
                  </label>
                  <select
                    style={{ ...styles.selectField, marginBottom: 0 }}
                    value={formData.paxCount}
                    onChange={e => setFormData({ ...formData, paxCount: Number(e.target.value) })}
                  >
                    {Array.from({ length: roomAvailability.remainingSlots }, (_, idx) => idx + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'Persons'} (₱{(perSlotRate * num).toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <div style={styles.formSectionTitle}>[03] PORT SHUTTLE TRANSFER</div>

          <label style={styles.label}>
            PORT SHUTTLE OPTION{' '}
            {hasRoomSelected && (
              <span style={{ color: '#816E57', fontWeight: 'bold' }}>— FREE WITH ROOM BOOKING</span>
            )}
          </label>
          <select
            style={styles.selectField}
            value={formData.shuttle}
            onChange={e => setFormData({ ...formData, shuttle: e.target.value })}
          >
            {SHUTTLE_OPTIONS.map(s => {
              const displayPrice = hasRoomSelected && s.id !== 'none' ? 0 : s.price;
              return (
                <option key={s.id} value={s.id}>
                  {s.label}{' '}
                  {displayPrice > 0
                    ? `(+₱${displayPrice})`
                    : s.id !== 'none' && hasRoomSelected
                      ? '(FREE ₱0)'
                      : ''}{' '}
                  [{s.maxPax}]
                </option>
              );
            })}
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.primaryButtonBlock,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'wait' : 'pointer'
            }}
          >
            {isSubmitting ? 'SAVING RESERVATION...' : 'CONFIRM RESERVATION →'}
          </button>
        </form>

        <div style={styles.summaryCard}>
          <div style={styles.formSectionTitle}>COST SUMMARY</div>

          <div style={styles.summaryRow}>
            <span>
              5-Course Infused Set Menu
              <div style={{ fontSize: '12px', color: '#816E57', fontWeight: 'bold' }}>
                ₱{SET_COURSE_PRICE.toLocaleString()} × {seatQuantity} {seatQuantity === 1 ? 'seat' : 'seats'}
              </div>
            </span>
            <span>₱{setCourseTotal.toLocaleString()}</span>
          </div>

          <div style={styles.summaryRow}>
            <span>
              {selectedRoom.title}
              {hasRoomSelected && (
                <div style={{ fontSize: '12px', color: '#816E57', fontWeight: 'bold' }}>
                  Mode: {formData.bookingType}
                  {formData.bookingType === 'Shared' ? ` (${formData.paxCount} pax)` : ''}
                </div>
              )}
            </span>
            <span>₱{accommodationCost.toLocaleString()}</span>
          </div>

          <div style={styles.summaryRow}>
            <span>
              Port Shuttle ({selectedShuttle.label})
              {hasRoomSelected && selectedShuttle.id !== 'none' && (
                <div style={{ fontSize: '11px', color: '#816E57', fontWeight: 'bold' }}>
                  Room promo: Free shuttle applied!
                </div>
              )}
            </span>
            <span>{finalShuttlePrice === 0 ? 'FREE (₱0)' : `₱${finalShuttlePrice.toLocaleString()}`}</span>
          </div>

          <div style={styles.summaryTotalRow}>
            <span>ESTIMATED TOTAL</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>₱{totalCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {confirmedModalData && (
        <div style={styles.modalBackdrop} onClick={() => setConfirmedModalData(null)}>
          <div style={styles.confirmationModalBox} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span>RESERVATION // COMPLETED ({confirmedModalData.id})</span>
              <button style={styles.closeBtn} onClick={() => setConfirmedModalData(null)}>[ CLOSE ✕ ]</button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={styles.cardHeaderBadge}>STATUS // SUBMITTED (UNPAID)</div>
              <h3 style={styles.sectionTitle}>YOU HAVE COMPLETED THE RESERVATION</h3>
              <p style={styles.bodyText}>
                Thank you, <strong>{confirmedModalData.fullName}</strong>. Your booking reference is{' '}
                <strong>{confirmedModalData.id}</strong> ({confirmedModalData.room} — {confirmedModalData.bookingType}).
              </p>

              <div style={styles.importantNoticeBox}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '13px' }}>
                  ⚠ IMPORTANT RESERVATION NOTICE:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: '1.6' }}>
                  <li>
                    <strong>First-Come, First-Served Basis:</strong> Slots and rooms are strictly allocated on a first-come, first-served basis upon payment verification.
                  </li>
                  <li>
                    <strong>Shared Rooms Not Guaranteed:</strong> Shared room selections are not guaranteed right away—please wait for official confirmation from the host via Telegram (<strong>{confirmedModalData.telegram}</strong>) or email.
                  </li>
                </ul>
              </div>

              <button
                style={{ ...styles.primaryButtonBlock, marginTop: '16px' }}
                onClick={() => setConfirmedModalData(null)}
              >
                ACKNOWLEDGE & CLOSE →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Lightbox Gallery Modal supporting both Images and Videos
function GalleryModal({ gallery, onClose }) {
  const [index, setIndex] = useState(gallery.activeIndex || 0);
  const mediaList = gallery.room.media || [];
  const current = mediaList[index];

  if (!current) return null;

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span>
            {gallery.room.title} // {current.type === 'video' ? 'VIDEO' : 'PHOTO'} ({index + 1}/{mediaList.length})
          </span>
          <button style={styles.closeBtn} onClick={onClose}>[ ✕ ]</button>
        </div>
        <div style={styles.modalImageWrapper}>
          {current.type === 'video' ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              playsInline
              style={styles.modalImg}
            />
          ) : (
            <img src={current.src} alt="Room View" style={styles.modalImg} />
          )}
        </div>
        <div style={styles.modalNavRow}>
          <button
            style={styles.navBtn}
            onClick={() => setIndex((index - 1 + mediaList.length) % mediaList.length)}
          >
            ← PREV
          </button>
          <button
            style={styles.navBtn}
            onClick={() => setIndex((index + 1) % mediaList.length)}
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}

// Secret PIN Admin Modal (Persists Payment & Fulfillment updates to Supabase)
function AdminModal({
  onClose,
  adminPin,
  setAdminPin,
  isAuthenticated,
  setIsAuthenticated,
  reservations,
  setReservations,
  refreshReservations
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'admin123') {
      setIsAuthenticated(true);
      refreshReservations();
    } else {
      alert('INVALID SECURITY PIN');
    }
  };

  const toggleField = async (id, field, nextValue) => {
    setUpdatingId(id);
    const dbColumn = field === 'paymentStatus' ? 'payment_status' : 'fulfillment_status';

    const { error } = await supabase
      .from('reservations')
      .update({ [dbColumn]: nextValue })
      .eq('id', id);

    setUpdatingId(null);

    if (error) {
      console.error('Supabase update error:', error.message);
      alert(`Failed to update status: ${error.message}`);
      return;
    }

    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: nextValue } : r))
    );
  };

  const filteredReservations = reservations.filter(r =>
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.telegram && r.telegram.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCSV = () => {
    const headers = [
      'Reservation ID',
      'Full Name',
      'Email',
      'Telegram',
      'Phone',
      'Room',
      'Booking Type',
      'Pax Count',
      'Shuttle',
      'Total Cost (PHP)',
      'Payment Status',
      'Fulfillment Status',
      'Date'
    ];

    const rows = filteredReservations.map(r => [
      r.id,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.telegram || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.room || '').replace(/"/g, '""')}"`,
      r.bookingType || 'N/A',
      r.paxCount || 1,
      `"${(r.shuttle || '').replace(/"/g, '""')}"`,
      r.totalCost,
      r.paymentStatus,
      r.fulfillmentStatus,
      r.date
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `secret_supper_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.adminModalBox} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span>SYS // SECRET SUPPER ADMIN CONSOLE</span>
          <button style={styles.closeBtn} onClick={onClose}>[ CLOSE ✕ ]</button>
        </div>

        {!isAuthenticated ? (
          <form style={{ padding: '24px' }} onSubmit={handleLogin}>
            <p style={styles.bodyText}>RESTRICTED ACCESS. ENTER SECURITY PIN:</p>
            <input
              type="password"
              style={styles.inputField}
              placeholder="PIN"
              value={adminPin}
              onChange={e => setAdminPin(e.target.value)}
            />
            <button type="submit" style={styles.primaryButtonBlock}>AUTHENTICATE →</button>
          </form>
        ) : (
          <div style={{ padding: '24px' }}>
            <p style={{ ...styles.bodyText, fontSize: '13px', marginBottom: '12px' }}>
              Synced with Supabase. Tagging a room reservation as <strong>PAID</strong> and <strong>FULFILLED</strong> automatically locks out that room (for Solo, or once Shared slots reach max capacity) in the public booking form.
            </p>

            <div style={styles.adminToolbar}>
              <input
                type="text"
                style={{ ...styles.inputField, marginBottom: 0, flex: 1 }}
                placeholder="Search by guest, ID, room, or Telegram..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button type="button" style={styles.exportCsvButton} onClick={handleExportCSV}>
                EXPORT CSV 📥
              </button>
            </div>

            {filteredReservations.length === 0 ? (
              <div style={{ padding: '24px', border: '1px dashed #816E57', textAlign: 'center', fontWeight: 'bold' }}>
                NO RESERVATIONS FOUND YET
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>GUEST / TELEGRAM</th>
                      <th style={styles.th}>ROOM & TYPE</th>
                      <th style={styles.th}>SHUTTLE</th>
                      <th style={styles.th}>TOTAL</th>
                      <th style={styles.th}>PAYMENT</th>
                      <th style={styles.th}>FULFILLMENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map(res => (
                      <tr key={res.id} style={{ opacity: updatingId === res.id ? 0.6 : 1 }}>
                        <td style={styles.td}>{res.id}</td>
                        <td style={styles.td}>
                          <strong>{res.fullName}</strong>
                          <br />
                          <small>{res.telegram || '-'}</small>
                          <br />
                          <small>{res.email}</small>
                        </td>
                        <td style={styles.td}>
                          {res.room}
                          <br />
                          <small style={{ color: '#816E57', fontWeight: 'bold' }}>
                            {res.bookingType} {res.bookingType === 'Shared' ? `(${res.paxCount} pax)` : ''}
                          </small>
                        </td>
                        <td style={styles.td}>{res.shuttle}</td>
                        <td style={styles.td}>₱{res.totalCost.toLocaleString()}</td>
                        <td style={styles.td}>
                          <select
                            disabled={updatingId === res.id}
                            value={res.paymentStatus}
                            onChange={e => toggleField(res.id, 'paymentStatus', e.target.value)}
                            style={{
                              ...styles.adminSelect,
                              backgroundColor: res.paymentStatus === 'Paid' ? '#345346' : '#816E57',
                              color: '#DCD6CD'
                            }}
                          >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </td>
                        <td style={styles.td}>
                          <select
                            disabled={updatingId === res.id}
                            value={res.fulfillmentStatus}
                            onChange={e => toggleField(res.id, 'fulfillmentStatus', e.target.value)}
                            style={{
                              ...styles.adminSelect,
                              backgroundColor: res.fulfillmentStatus === 'Fulfilled' ? '#345346' : '#816E57',
                              color: '#DCD6CD'
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Fulfilled">Fulfilled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- STYLES OBJECT ---
   Palette:
   #DCD6CD - Background & Panel Color
   #594C3B - Font Color
   #816E57 - Element & Accent Color
   #345346 - Button & Active Toggle Fill Color
*/

const styles = {
  appWrapper: {
    position: 'relative',
    width: '100vw',
    minHeight: '100vh',
    overflowX: 'hidden',
    backgroundColor: '#DCD6CD',
    color: '#594C3B',
    fontFamily: "'Space Grotesk', sans-serif"
  },
  bgVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: 0,
    pointerEvents: 'none'
  },
  bgOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(5, 65, 15, 0.75)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  mainContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'rgba(220, 214, 205, 0.9)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    marginBottom: '20px'
  },
  brandTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  brandBadge: {
    backgroundColor: '#345346',
    color: '#DCD6CD',
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  brandText: {
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    color: '#594C3B'
  },
  menuToggleButton: {
    backgroundColor: '#DCD6CD',
    color: '#594C3B',
    border: '2px solid #816E57',
    padding: '8px 16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '2px 2px 0px #816E57'
  },
  drawerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(89, 76, 59, 0.65)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawerContent: {
    width: '320px',
    height: '100%',
    backgroundColor: '#DCD6CD',
    borderLeft: '2px solid #816E57',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  drawerTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#594C3B'
  },
  closeDrawerBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#594C3B',
    cursor: 'pointer'
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  drawerNavItem: {
    textAlign: 'left',
    padding: '16px',
    border: '2px solid #816E57',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '3px 3px 0px #816E57'
  },
  contentSection: {
    marginBottom: '20px'
  },
  heroCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.9)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '6px 6px 0px #816E57',
    padding: '40px'
  },
  typewriterHeader: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '12px',
    minHeight: '48px'
  },
  cursor: {
    fontWeight: 'normal',
    color: '#816E57',
    opacity: 0.9
  },
  heroSubtitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#816E57',
    marginBottom: '14px',
    lineHeight: '1.4'
  },
  heroDescription: {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#594C3B',
    marginBottom: '24px'
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  cardContainer: {
    backgroundColor: 'rgba(220, 214, 205, 0.9)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    padding: '32px',
    marginBottom: '24px'
  },
  sectionHeaderCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.9)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    padding: '24px',
    marginBottom: '24px'
  },
  singleCourseCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.93)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '6px 6px 0px #816E57',
    padding: '36px',
    maxWidth: '680px',
    margin: '0 auto',
    color: '#594C3B'
  },
  courseTopHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    flexWrap: 'wrap',
    paddingBottom: '20px',
    borderBottom: '2px solid #816E57',
    marginBottom: '24px'
  },
  courseBrandTitle: {
    fontSize: '26px',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    color: '#594C3B'
  },
  courseItalicSubtitle: {
    fontStyle: 'italic',
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#816E57',
    marginTop: '4px'
  },
  coursePriceBox: {
    border: '2px solid #816E57',
    padding: '10px 16px',
    backgroundColor: '#345346',
    color: '#DCD6CD',
    textAlign: 'right'
  },
  coursePriceAmount: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  coursePriceUnit: {
    fontSize: '12px',
    color: '#DCD6CD',
    opacity: 0.9
  },
  courseListSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '24px'
  },
  courseDishRow: {
    paddingBottom: '10px',
    borderBottom: '1px dashed #816E57'
  },
  courseDishName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#594C3B'
  },
  beverageSection: {
    backgroundColor: 'rgba(129, 110, 87, 0.14)',
    border: '2px solid #816E57',
    padding: '16px 20px',
    marginBottom: '24px'
  },
  metaDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  beverageLabel: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#816E57'
  },
  beverageItem: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '4px'
  },
  courseBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    paddingTop: '12px'
  },
  locationStamp: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#594C3B'
  },
  cardHeaderBadge: {
    display: 'inline-block',
    backgroundColor: '#816E57',
    color: '#DCD6CD',
    fontSize: '12px',
    padding: '4px 8px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '12px'
  },
  bodyText: {
    lineHeight: '1.6',
    color: '#594C3B'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  roomCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.93)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    overflow: 'hidden'
  },
  imagePreviewWrapper: {
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    cursor: 'pointer'
  },
  galleryBadge: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    backgroundColor: '#345346',
    color: '#DCD6CD',
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  roomCardBody: {
    padding: '24px'
  },
  roomHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  paxTag: {
    border: '1px solid #816E57',
    color: '#594C3B',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  roomTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '8px'
  },
  priceTag: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '12px'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '16px 0 24px 0'
  },
  featureItem: {
    fontSize: '14px',
    color: '#594C3B',
    marginBottom: '6px'
  },
  shuttleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '20px'
  },
  shuttleCard: {
    border: '2px solid #816E57',
    padding: '16px',
    backgroundColor: '#DCD6CD',
    color: '#594C3B'
  },
  shuttleName: {
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  shuttlePrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  shuttleCap: {
    fontSize: '12px',
    color: '#816E57',
    fontWeight: 'bold'
  },
  bookingLayoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px'
  },
  formCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.93)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    padding: '24px'
  },
  formSectionTitle: {
    backgroundColor: '#816E57',
    color: '#DCD6CD',
    padding: '6px 12px',
    fontWeight: 'bold',
    marginBottom: '16px',
    fontSize: '14px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#594C3B',
    marginBottom: '6px'
  },
  inputField: {
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '100%',
    padding: '12px',
    border: '2px solid #816E57',
    backgroundColor: '#DCD6CD',
    color: '#594C3B',
    marginBottom: '16px',
    fontWeight: 'bold'
  },
  selectField: {
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '100%',
    padding: '12px',
    border: '2px solid #816E57',
    backgroundColor: '#DCD6CD',
    color: '#594C3B',
    marginBottom: '16px',
    fontWeight: 'bold'
  },
  conditionalBox: {
    border: '2px dashed #816E57',
    padding: '14px',
    marginBottom: '16px',
    backgroundColor: 'rgba(129, 110, 87, 0.1)'
  },
  radioRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  toggleChip: {
    flex: 1,
    minWidth: '140px',
    padding: '10px 12px',
    border: '2px solid #816E57',
    fontWeight: 'bold',
    fontSize: '12px',
    textAlign: 'center'
  },
  summaryCard: {
    backgroundColor: 'rgba(220, 214, 205, 0.93)',
    backdropFilter: 'blur(6px)',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    padding: '24px',
    height: 'fit-content'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #816E57',
    fontSize: '14px',
    color: '#594C3B'
  },
  summaryTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    marginTop: '12px',
    borderTop: '2px solid #816E57',
    color: '#594C3B'
  },
  primaryButton: {
    backgroundColor: '#345346',
    color: '#DCD6CD',
    border: '2px solid #816E57',
    padding: '12px 24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  primaryButtonBlock: {
    width: '100%',
    backgroundColor: '#345346',
    color: '#DCD6CD',
    border: '2px solid #816E57',
    padding: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '3px 3px 0px #816E57'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#594C3B',
    border: '2px solid #816E57',
    padding: '12px 24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    border: '2px solid #816E57',
    boxShadow: '4px 4px 0px #816E57',
    fontSize: '13px',
    color: '#594C3B',
    backgroundColor: 'rgba(220, 214, 205, 0.92)',
    backdropFilter: 'blur(6px)'
  },
  footerMainBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  footerEventDate: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#594C3B'
  },
  footerNotice: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#816E57'
  },
  footerDmLine: {
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#594C3B'
  },
  footerExtraNotes: {
    marginTop: '6px',
    paddingTop: '8px',
    borderTop: '1px dashed #816E57',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#594C3B'
  },
  footerBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px dashed #816E57',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(89, 76, 59, 0.85)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  confirmationModalBox: {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: '#DCD6CD',
    border: '2px solid #816E57',
    boxShadow: '6px 6px 0px #816E57',
    color: '#594C3B'
  },
  importantNoticeBox: {
    marginTop: '16px',
    padding: '14px 16px',
    backgroundColor: 'rgba(129, 110, 87, 0.16)',
    border: '2px solid #816E57',
    color: '#594C3B'
  },
  modalBox: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#DCD6CD',
    border: '2px solid #816E57',
    padding: '20px',
    color: '#594C3B'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '2px solid #816E57',
    fontWeight: 'bold',
    color: '#594C3B'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    color: '#594C3B',
    cursor: 'pointer'
  },
  modalImageWrapper: {
    width: '100%',
    height: '400px',
    backgroundColor: '#345346',
    marginTop: '16px',
    marginBottom: '16px'
  },
  modalImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  modalNavRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  navBtn: {
    backgroundColor: '#345346',
    color: '#DCD6CD',
    border: '2px solid #816E57',
    padding: '10px 20px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  adminModalBox: {
    width: '100%',
    maxWidth: '980px',
    backgroundColor: '#DCD6CD',
    border: '2px solid #816E57',
    maxHeight: '90vh',
    overflowY: 'auto',
    color: '#594C3B'
  },
  adminToolbar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  exportCsvButton: {
    backgroundColor: '#345346',
    color: '#DCD6CD',
    border: '2px solid #816E57',
    padding: '12px 18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '2px 2px 0px #816E57',
    whiteSpace: 'nowrap'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '8px'
  },
  th: {
    border: '2px solid #816E57',
    padding: '10px',
    backgroundColor: '#345346',
    color: '#DCD6CD',
    textAlign: 'left',
    fontSize: '12px'
  },
  td: {
    border: '1px solid #816E57',
    padding: '10px',
    fontSize: '14px',
    color: '#594C3B'
  },
  adminSelect: {
    padding: '6px 8px',
    border: '1px solid #345346',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  }
};