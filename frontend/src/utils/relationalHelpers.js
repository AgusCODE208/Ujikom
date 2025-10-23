// ============================================
// RELATIONAL HELPERS
// Fungsi untuk mengelola relasi antar entity
// ============================================

import { getFilms } from './filmStorage';
import { getStudios, getKursis } from './studioStorage';
import { getJadwals, deleteJadwal } from './jadwalStorage';
import { getHargaTikets } from './hargaStorage';

// ============================================
// POPULATE FUNCTIONS
// ============================================

/**
 * Populate jadwal dengan data film, studio, dan harga
 */
export const populateJadwal = (jadwal) => {
  const films = getFilms();
  const studios = getStudios();
  const hargas = getHargaTikets();

  return {
    ...jadwal,
    film: films.find(f => f.id == jadwal.film_id) || null,
    studio: studios.find(s => s.id == jadwal.studio_id) || null,
    harga: hargas.find(h => h.id == jadwal.harga_id) || null
  };
};

/**
 * Populate multiple jadwals
 */
export const populateJadwals = (jadwals) => {
  return jadwals.map(populateJadwal);
};

/**
 * Get jadwals by film_id
 */
export const getJadwalsByFilm = (filmId) => {
  const jadwals = getJadwals();
  return jadwals.filter(j => j.film_id == filmId);
};

/**
 * Get jadwals by studio_id
 */
export const getJadwalsByStudio = (studioId) => {
  const jadwals = getJadwals();
  return jadwals.filter(j => j.studio_id == studioId);
};

/**
 * Get kursis by studio_id
 */
export const getKursisByStudio = (studioId) => {
  const kursis = getKursis();
  return kursis.filter(k => k.studio_id == studioId);
};

// ============================================
// CASCADE DELETE FUNCTIONS
// ============================================

/**
 * Cascade delete jadwals when film is deleted
 */
export const cascadeDeleteFilmJadwals = (filmId) => {
  const jadwals = getJadwalsByFilm(filmId);
  let deletedCount = 0;

  jadwals.forEach(jadwal => {
    deleteJadwal(jadwal.id);
    deletedCount++;
  });

  return {
    success: true,
    deletedJadwals: deletedCount,
    message: `Deleted ${deletedCount} related jadwal(s)`
  };
};

/**
 * Cascade delete jadwals when studio is deleted
 */
export const cascadeDeleteStudioJadwals = (studioId) => {
  const jadwals = getJadwalsByStudio(studioId);
  let deletedCount = 0;

  jadwals.forEach(jadwal => {
    deleteJadwal(jadwal.id);
    deletedCount++;
  });

  return {
    success: true,
    deletedJadwals: deletedCount,
    message: `Deleted ${deletedCount} related jadwal(s)`
  };
};

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate if film exists and is playable
 */
export const validateFilmForJadwal = (filmId) => {
  const films = getFilms();
  const film = films.find(f => f.id == filmId);

  if (!film) {
    return {
      valid: false,
      message: 'Film tidak ditemukan'
    };
  }

  if (film.status !== 'now_playing') {
    return {
      valid: false,
      message: 'Film harus berstatus "Now Playing" untuk dijadwalkan'
    };
  }

  return {
    valid: true,
    film
  };
};

/**
 * Validate if studio exists and is active
 */
export const validateStudioForJadwal = (studioId) => {
  const studios = getStudios();
  const studio = studios.find(s => s.id == studioId);

  if (!studio) {
    return {
      valid: false,
      message: 'Studio tidak ditemukan'
    };
  }

  if (studio.status !== 'active') {
    return {
      valid: false,
      message: 'Studio harus berstatus "Active" untuk dijadwalkan'
    };
  }

  return {
    valid: true,
    studio
  };
};

/**
 * Validate if harga exists and is active
 */
export const validateHargaForJadwal = (hargaId) => {
  const hargas = getHargaTikets();
  const harga = hargas.find(h => h.id == hargaId);

  if (!harga) {
    return {
      valid: false,
      message: 'Harga tidak ditemukan'
    };
  }

  if (harga.status && harga.status !== 'active') {
    return {
      valid: false,
      message: 'Harga harus berstatus "Active" untuk digunakan'
    };
  }

  return {
    valid: true,
    harga
  };
};

/**
 * Validate all references for jadwal
 */
export const validateJadwalReferences = (filmId, studioId, hargaId) => {
  const filmValidation = validateFilmForJadwal(filmId);
  if (!filmValidation.valid) return filmValidation;

  const studioValidation = validateStudioForJadwal(studioId);
  if (!studioValidation.valid) return studioValidation;

  const hargaValidation = validateHargaForJadwal(hargaId);
  if (!hargaValidation.valid) return hargaValidation;

  return {
    valid: true,
    film: filmValidation.film,
    studio: studioValidation.studio,
    harga: hargaValidation.harga
  };
};

// ============================================
// STATISTICS FUNCTIONS
// ============================================

/**
 * Get film statistics
 */
export const getFilmStats = (filmId) => {
  const jadwals = getJadwalsByFilm(filmId);
  
  return {
    totalJadwal: jadwals.length,
    jadwalAktif: jadwals.filter(j => j.status === 'available').length,
    studios: [...new Set(jadwals.map(j => j.studio_id))].length
  };
};

/**
 * Get studio statistics
 */
export const getStudioStats = (studioId) => {
  const jadwals = getJadwalsByStudio(studioId);
  const kursis = getKursisByStudio(studioId);
  
  return {
    totalJadwal: jadwals.length,
    jadwalAktif: jadwals.filter(j => j.status === 'available').length,
    totalKursi: kursis.length,
    kursiTersedia: kursis.filter(k => k.status === 'tersedia').length
  };
};

/**
 * Check if entity can be deleted
 */
export const canDeleteFilm = (filmId) => {
  const jadwals = getJadwalsByFilm(filmId);
  const activeJadwals = jadwals.filter(j => j.status === 'available');

  return {
    canDelete: true, // Always can delete with cascade
    hasActiveJadwals: activeJadwals.length > 0,
    totalJadwals: jadwals.length,
    warning: activeJadwals.length > 0 
      ? `Film ini memiliki ${activeJadwals.length} jadwal aktif yang akan ikut terhapus`
      : null
  };
};

/**
 * Check if studio can be deleted
 */
export const canDeleteStudio = (studioId) => {
  const jadwals = getJadwalsByStudio(studioId);
  const kursis = getKursisByStudio(studioId);
  const activeJadwals = jadwals.filter(j => j.status === 'available');

  return {
    canDelete: true, // Always can delete with cascade
    hasActiveJadwals: activeJadwals.length > 0,
    totalJadwals: jadwals.length,
    totalKursi: kursis.length,
    warning: activeJadwals.length > 0 
      ? `Studio ini memiliki ${activeJadwals.length} jadwal aktif dan ${kursis.length} kursi yang akan ikut terhapus`
      : `Studio ini memiliki ${kursis.length} kursi yang akan ikut terhapus`
  };
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get recommended harga based on studio type and date
 */
export const getRecommendedHarga = (studioId, tanggal) => {
  const studios = getStudios();
  const hargas = getHargaTikets();
  const studio = studios.find(s => s.id == studioId);

  if (!studio) return null;

  const date = new Date(tanggal);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const tipeStudio = studio.tipe; // reguler, vip, imax
  const tipeHari = isWeekend ? 'weekend' : 'weekday';
  const tipeHarga = `${tipeHari}_${tipeStudio}`;

  const recommendedHarga = hargas.find(h => 
    h.tipe === tipeHarga && 
    (!h.status || h.status === 'active')
  );

  return recommendedHarga || hargas.find(h => 
    h.tipe.includes(tipeStudio) && 
    (!h.status || h.status === 'active')
  );
};

/**
 * Format jadwal for display
 */
export const formatJadwalDisplay = (jadwal) => {
  const populated = populateJadwal(jadwal);
  
  return {
    ...populated,
    displayText: `${populated.film?.judul || 'Unknown'} - ${populated.studio?.nama_studio || 'Unknown'} - ${jadwal.tanggal} ${jadwal.jam_mulai}`,
    isValid: populated.film && populated.studio && populated.harga
  };
};
