import { memo } from 'react';

const MovieCardSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded p-4 animate-pulse">
            {/* Placeholder for Image */}
            <div className="w-full h-64 bg-gray-300 rounded"></div>

            {/* Placeholder for Title */}
            <div className="mt-2 h-6 bg-gray-300 rounded"></div>

            {/* Placeholder for Release Date */}
            <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>

            {/* Placeholder for Rating */}
            <div className="mt-1 h-4 bg-yellow-300 rounded w-1/4"></div>
        </div>
    );
};

export default memo(MovieCardSkeleton);
