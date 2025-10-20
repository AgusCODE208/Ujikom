import { getFilms } from '../utils/filmStorage';

export const DUMMY_FILMS = getFilms();

// Backup data jika localStorage kosong
export const INITIAL_FILMS = [{
        id: 1,
        judul: "Guardians of the Galaxy Vol. 3",
        genre: "Action, Adventure, Sci-Fi",
        durasi: 150,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        status: "now_playing",
        rating: 8.5
    },

    {
        id: 2,
        judul: "The Little Mermaid",
        genre: "Fantasy, Musical, Romance",
        durasi: 135,
        rating_usia: "SU",
        poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
        status: "now_playing",
        rating: 7.8
    },
    {
        id: 3,
        judul: "Fast X",
        genre: "Action, Crime, Thriller",
        durasi: 141,
        rating_usia: "17+",
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        status: "now_playing",
        rating: 8.2
    },
    {
        id: 4,
        judul: "Spider-Man: Across the Spider-Verse",
        genre: "Animation, Action, Adventure",
        durasi: 140,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
        status: "coming_soon",
        rating: 9.1
    },
    {
        id: 5,
        judul: "Indiana Jones: Dial of Destiny",
        genre: "Action, Adventure",
        durasi: 154,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        status: "coming_soon",
        rating: 8.0
    },
    {
        id: 6,
        judul: "The Avengers",
        genre: "Action, Sci-Fi",
        durasi: 143,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
        status: "ended",
        rating: 8.9
    },
    {
        id: 7,
        judul: "Interstellar",
        genre: "Sci-Fi, Drama, Adventure",
        durasi: 169,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
        status: "ended",
        rating: 9.3
    },
    {
        id: 8,
        judul: "The Dark Knight",
        genre: "Action, Crime, Drama",
        durasi: 152,
        rating_usia: "17+",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
        status: "ended",
        rating: 9.0
    },
    {
        id: 9,
        judul: "Inception",
        genre: "Action, Sci-Fi, Thriller",
        durasi: 148,
        rating_usia: "13+",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        status: "ended",
        rating: 8.8
    }

];