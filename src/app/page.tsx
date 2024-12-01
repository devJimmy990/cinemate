// app/page.tsx
import { FC, Suspense } from 'react';
import { getRequest } from '@/hooks/axios';
import MovieType from '@/types/movie';
import MoviesClient from '@components/client/MoviesClient';
import SkeletonMovieCard from '@components/SkeletonMovieCard';

// Mark component as async to enable server-side data fetching
const MoviePage: FC = async () => {
  // Fetch initial movies server-side
  let initialMovies: MovieType[] = [];

  try {
    const response = await getRequest({});
    initialMovies = response;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    // Error handling can be more sophisticated here
  }

  return (
    <Suspense fallback={fallback}>
      <main>
        <MoviesClient initialMovies={initialMovies} />
      </main>
    </Suspense >
  );
}

export default MoviePage;

const fallback = (
  Array.from({ length: 6 }).map((_, index) => (
    <SkeletonMovieCard key={`skeleton-${index}`} />
  ))
)
