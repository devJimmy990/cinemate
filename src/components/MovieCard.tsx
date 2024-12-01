import Image from 'next/image';
import { FC, memo } from 'react';
import MovieType from '@/types/movie';



const MovieCard: FC<MovieType> = ({ title, poster_path, backdrop_path, vote_average, release_date }: MovieType) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <Image width={500} height={500} alt={title} className="w-full h-64 object-cover rounded"
                loading='lazy' src={`https://image.tmdb.org/t/p/original${poster_path || backdrop_path}`}
            />
            <h3 className="text-lg font-bold mt-2">{title}</h3>
            <p className="text-sm text-gray-600">Release: {release_date}</p>
            <p className="text-sm text-yellow-500">Rating: {vote_average}</p>
        </div>
    );
};

export default memo(MovieCard);
