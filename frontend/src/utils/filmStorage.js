// Utility untuk manage film data di localStorage

const STORAGE_KEY = 'cinema_films';
const DELETED_KEY = 'cinema_films_deleted';

// Initial dummy data
const INITIAL_FILMS = [
  {
    id: 1,
    judul: "Guardians of the Galaxy Vol. 3",
    deskripsi: "In Marvel Studios' Guardians of the Galaxy Vol. 3, our beloved band of misfits are settling into life on Knowhere.",
    genre: "Action, Adventure, Sci-Fi",
    durasi: 150,
    rating_usia: "13+",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    trailer_url: "https://www.youtube.com/watch?v=u3V5KDHRQvk",
    director: "James Gunn",
    cast: "Chris Pratt, Zoe Saldana, Dave Bautista, Karen Gillan",
    status: "now_playing",
    rating: 8.5,
    publishStatus: "publish"
  },
  {
    id: 2,
    judul: "The Little Mermaid",
    deskripsi: "The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid.",
    genre: "Fantasy, Musical, Romance",
    durasi: 135,
    rating_usia: "SU",
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    trailer_url: "https://www.youtube.com/watch?v=kpGo2_d3oYE",
    director: "Rob Marshall",
    cast: "Halle Bailey, Jonah Hauer-King, Melissa McCarthy, Javier Bardem",
    status: "now_playing",
    rating: 7.8,
    publishStatus: "publish"
  },
  {
    id: 3,
    judul: "Spider-Man: Across the Spider-Verse",
    deskripsi: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
    genre: "Animation, Action, Adventure",
    durasi: 140,
    rating_usia: "13+",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    trailer_url: "https://www.youtube.com/watch?v=shW9i6k8cB0",
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson",
    status: "coming_soon",
    rating: 9.1,
    publishStatus: "publish"
  }
];

export const getFilms = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FILMS));
      return INITIAL_FILMS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading films:', error);
    localStorage.removeItem(STORAGE_KEY);
    return INITIAL_FILMS;
  }
};

export const addFilm = (filmData) => {
  try {
    if (!filmData.judul || !filmData.poster) {
      throw new Error('Judul dan poster wajib diisi');
    }
    const films = getFilms();
    const newFilm = {
      ...filmData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      durasi: parseInt(filmData.durasi) || 0,
      rating: parseFloat(filmData.rating) || 0,
      publishStatus: 'draft'
    };
    films.push(newFilm);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
    return newFilm;
  } catch (error) {
    console.error('Error adding film:', error);
    throw error;
  }
};

export const updateFilm = (id, filmData) => {
  try {
    const films = getFilms();
    const index = films.findIndex(f => f.id === id || f.id == id);
    if (index !== -1) {
      films[index] = {
        ...films[index],
        ...filmData,
        id,
        durasi: parseInt(filmData.durasi) || films[index].durasi,
        rating: parseFloat(filmData.rating) || films[index].rating
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
      return films[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating film:', error);
    throw error;
  }
};

export const deleteFilm = (id) => {
  try {
    const films = getFilms();
    const film = films.find(f => f.id === id || f.id == id);
    if (film) {
      const deleted = getDeletedFilms();
      deleted.push({ ...film, deletedAt: new Date().toISOString() });
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
    }
    const filtered = films.filter(f => f.id !== id && f.id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting film:', error);
    throw error;
  }
};

export const getDeletedFilms = () => {
  try {
    const stored = localStorage.getItem(DELETED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading deleted films:', error);
    return [];
  }
};

export const restoreFilm = (id) => {
  try {
    const deleted = getDeletedFilms();
    const film = deleted.find(f => f.id === id || f.id == id);
    if (film) {
      const films = getFilms();
      const { deletedAt, ...filmData } = film;
      films.push(filmData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
      
      const filtered = deleted.filter(f => f.id !== id && f.id != id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring film:', error);
    throw error;
  }
};

export const getFilmById = (id) => {
  try {
    const films = getFilms();
    return films.find(f => f.id === id || f.id == id);
  } catch (error) {
    console.error('Error getting film by id:', error);
    return null;
  }
};

export const getPublishedFilms = () => {
  try {
    const films = getFilms();
    return films.filter(f => f.publishStatus === 'publish');
  } catch (error) {
    console.error('Error getting published films:', error);
    return [];
  }
};

export const updatePublishStatus = (id, publishStatus) => {
  try {
    const films = getFilms();
    const index = films.findIndex(f => f.id === id || f.id == id);
    if (index !== -1) {
      films[index].publishStatus = publishStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
      return films[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating publish status:', error);
    throw error;
  }
};
