'use client';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MovieType from '@/types/movie';
import useAxios from '@/hooks/useAxios';
import RequestError from '@errors/request';
import MovieCard from '@/components/MovieCard';
import FilterBar from '@/components/FilterBar';
import FilterTargetType from '@/types/filter_targets';
import SkeletonMovieCard from '@components/SkeletonMovieCard';

interface MoviesClientProps {
    initialMovies: MovieType[];
}

const MoviesClient: FC<MoviesClientProps> = ({ initialMovies }) => {
    const { getRequest, loading } = useAxios();
    const [page, setPage] = useState(2);
    const [error, setError] = useState('');
    const [querySearch, setQuerySearch] = useState('');
    const lastViewRef = useRef<HTMLDivElement | null>(null);
    const [movies, setMovies] = useState<MovieType[]>(initialMovies);
    const [filterTarget, setFilteredTarget] = useState<FilterTargetType>('');


    // Fetch additional movies on scroll
    const loadMoreMovies = useCallback(async () => {
        try {
            const res = await getRequest({ page });
            setMovies((prevMovies) => [...prevMovies, ...res]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            setError(
                error instanceof RequestError
                    ? error.message
                    : 'An unexpected error occurred while loading more movies.'
            );
        }
    }, [getRequest, page]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !filterTarget && !querySearch) {
                    loadMoreMovies();
                }
            },
            { threshold: 1.0 }
        );

        const currentLastViewRef = lastViewRef.current;
        if (currentLastViewRef) observer.observe(currentLastViewRef);

        return () => {
            if (currentLastViewRef) observer.unobserve(currentLastViewRef);
        };
    }, [loadMoreMovies, filterTarget, querySearch]);

    // Filter and search logic
    const filteredMovies = useMemo(() => {
        let filtered = movies;
        if (querySearch) {
            const lowerQuery = querySearch.toLowerCase();
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(lowerQuery)
            );
        }
        if (filterTarget) {
            switch (filterTarget) {
                case 'popular':
                    filtered = filtered.filter((movie) => movie.popularity > 3500);
                    break;
                case 'top':
                    filtered = filtered.filter((movie) => movie.vote_average > 8.1);
                    break;
                case 'adults':
                    filtered = filtered.filter((movie) => movie.adults);
                    break;
                default:
                    break;
            }
        }
        return filtered;
    }, [movies, querySearch, filterTarget]);

    return (
        <div className="container mx-auto px-1 md:px-2 lg:px-4">
            <FilterBar
                onSearch={(query) => setQuerySearch(query)}
                onFilter={(target) => setFilteredTarget(target)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="movies-container">
                {filteredMovies.length > 0 && (
                    filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                )}

                {loading &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonMovieCard key={index} />
                    ))}
                <div ref={lastViewRef} />

            </div>
        </div>
    );
};

export default MoviesClient;
