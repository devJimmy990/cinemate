'use client'
import React, { createContext, useCallback, useMemo, useState, useContext } from "react";
import MovieType from "@/types/movie";

type MoviesContextType = {
    movies: MovieType[];
    addMovies: (movies: MovieType[] | MovieType) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [movies, setMovies] = useState<MovieType[]>([]);

    const addMovies = useCallback(
        (data: MovieType[] | MovieType): void =>
            setMovies((prev) =>
                Array.isArray(data) ? [...prev, ...data] : [...prev, data]
            ),
        []
    );

    const value = useMemo(() => ({ movies, addMovies }), [movies, addMovies]);

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error("useMovies must be used within a MoviesContextProvider");
    }
    return context;
};

export default MoviesContextProvider;
