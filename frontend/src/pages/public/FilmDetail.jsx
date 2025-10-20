import React, { useState } from 'react';
import { Film, Calendar, Clock, Star, MapPin, Users, Play, Share2, Heart, ChevronLeft, Award } from 'lucide-react';
import Footer from '../../components/Footer';

// Dummy Data untuk Detail Film
const FILM_DETAIL = {
  id: 1,
  judul: "Guardians of the Galaxy Vol. 3",
  deskripsi: "In Marvel Studios' Guardians of the Galaxy Vol. 3, our beloved band of misfits are settling into life on Knowhere. But it isn't long before their lives are upended by the echoes of Rocket's turbulent past. Peter Quill, still reeling from the loss of Gamora, must rally his team around him on a dangerous mission to save Rocket's life—a mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
  genre: "Action, Adventure, Sci-Fi",
  durasi: 150,
  rating_usia: "13+",
  poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop",
  backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
  rating: 8.5,
  total_reviews: 2845,
  release_date: "2024-05-05",
  director: "James Gunn",
  cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Karen Gillan", "Pom Klementieff"],
  trailer_url: "https://youtube.com/watch?v=example",
  status: "now_playing"
};

// Dummy Data Jadwal Film
const JADWAL_TAYANG = [
  {
    id: 1,
    tanggal: "2024-10-20",
    hari: "Sunday",
    jadwal: [
      { id: 1, jam: "10:00", studio: "Studio 1", tipe: "Regular", harga: 35000, tersedia: 45 },
      { id: 2, jam: "13:00", studio: "Studio 2", tipe: "Premium", harga: 50000, tersedia: 28 },
      { id: 3, jam: "16:00", studio: "Studio 1", tipe: "Regular", harga: 35000, tersedia: 12 },
      { id: 4, jam: "19:00", studio: "Studio 3", tipe: "IMAX", harga: 75000, tersedia: 8 },
      { id: 5, jam: "21:30", studio: "Studio 2", tipe: "Premium", harga: 50000, tersedia: 35 }
    ]
  },
  {
    id: 2,
    tanggal: "2024-10-21",
    hari: "Monday",
    jadwal: [
      { id: 6, jam: "11:00", studio: "Studio 1", tipe: "Regular", harga: 30000, tersedia: 52 },
      { id: 7, jam: "14:00", studio: "Studio 2", tipe: "Premium", harga: 45000, tersedia: 38 },
      { id: 8, jam: "17:00", studio: "Studio 1", tipe: "Regular", harga: 30000, tersedia: 41 },
      { id: 9, jam: "20:00", studio: "Studio 3", tipe: "IMAX", harga: 70000, tersedia: 15 }
    ]
  },
  {
    id: 3,
    tanggal: "2024-10-22",
    hari: "Tuesday",
    jadwal: [
      { id: 10, jam: "12:00", studio: "Studio 2", tipe: "Premium", harga: 45000, tersedia: 30 },
      { id: 11, jam: "15:00", studio: "Studio 1", tipe: "Regular", harga: 30000, tersedia: 48 },
      { id: 12, jam: "18:00", studio: "Studio 3", tipe: "IMAX", harga: 70000, tersedia: 22 },
      { id: 13, jam: "21:00", studio: "Studio 2", tipe: "Premium", harga: 45000, tersedia: 19 }
    ]
  }
];

const FilmDetail = ({ setCurrentView, setBookingData, isLoggedIn, bookedSeatsCount = {} }) => {
  const [selectedDate, setSelectedDate] = useState(JADWAL_TAYANG[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getAvailableSeats = (jadwalId) => {
    const jadwal = JADWAL_TAYANG.flatMap(d => d.jadwal).find(j => j.id === jadwalId);
    const booked = bookedSeatsCount[jadwalId] || 0;
    return jadwal ? jadwal.tersedia - booked : 0;
  };

  const handleBooking = (jadwal) => {
    if (!isLoggedIn) {
      alert('Please login first to book tickets');
      setCurrentView('login');
      return;
    }
    setBookingData({
      selectedJadwal: jadwal,
      selectedDate: selectedDate,
      filmDetail: FILM_DETAIL
    });
    setCurrentView('pilihkursi');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar Simple */}
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 hover:text-red-500 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">MyCinema</span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Backdrop */}
      <div className="relative h-96 lg:h-screen-50" data-aos="fade-in">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FILM_DETAIL.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img 
                src={FILM_DETAIL.poster} 
                alt={FILM_DETAIL.judul}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Info Film */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                  {FILM_DETAIL.rating_usia}
                </span>
                <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">
                  {FILM_DETAIL.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{FILM_DETAIL.judul}</h1>
              
              <div className="flex items-center gap-6 mb-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold text-white">{FILM_DETAIL.rating}</span>
                  <span className="text-sm">({FILM_DETAIL.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{FILM_DETAIL.durasi} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{FILM_DETAIL.release_date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition">
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border-2 transition ${
                    isFavorite 
                      ? 'bg-red-600 border-red-600' 
                      : 'border-gray-600 hover:border-red-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`} />
                </button>
                <button className="p-3 rounded-lg border-2 border-gray-600 hover:border-red-600 transition">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {FILM_DETAIL.genre.split(', ').map((g, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{FILM_DETAIL.deskripsi}</p>
            </div>

            {/* Director & Cast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-500" />
                  Director
                </h3>
                <p className="text-gray-300">{FILM_DETAIL.director}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  Cast
                </h3>
                <ul className="text-gray-300 space-y-1">
                  {FILM_DETAIL.cast.map((actor, i) => (
                    <li key={i}>{actor}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Showtimes */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Showtime</h2>
              
              {/* Date Selector */}
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                {JADWAL_TAYANG.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-6 py-4 rounded-lg border-2 transition ${
                      selectedDate.id === date.id
                        ? 'bg-red-600 border-red-600'
                        : 'bg-gray-800 border-gray-700 hover:border-red-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm text-gray-400">{date.hari}</div>
                      <div className="text-xl font-bold">
                        {new Date(date.tanggal).getDate()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(date.tanggal).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                {selectedDate.jadwal.map((slot, index) => (
                  <div 
                    key={slot.id}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition"
                    data-aos="fade-left"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-500">{slot.jam}</div>
                        </div>
                        <div className="border-l-2 border-gray-700 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">{slot.studio}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                              {slot.tipe}
                            </span>
                            <span className="text-green-500">
                              {getAvailableSeats(slot.id)} seats available
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Price</div>
                          <div className="text-xl font-bold text-red-500">
                            {formatCurrency(slot.harga)}
                          </div>
                        </div>
                        <button
                          onClick={() => handleBooking(slot)}
                          disabled={slot.tersedia === 0}
                          className={`px-6 py-3 rounded-lg font-semibold transition ${
                            slot.tersedia === 0
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {slot.tersedia === 0 ? 'Sold Out' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Similar Movies (Optional) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Movie Info</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Genre</div>
                  <div className="font-semibold">{FILM_DETAIL.genre}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Duration</div>
                  <div className="font-semibold">{FILM_DETAIL.durasi} minutes</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Release Date</div>
                  <div className="font-semibold">{FILM_DETAIL.release_date}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Rating</div>
                  <div className="font-semibold">{FILM_DETAIL.rating_usia}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Director</div>
                  <div className="font-semibold">{FILM_DETAIL.director}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FilmDetail;
