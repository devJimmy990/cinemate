import FilterTargetType from '@/types/filter_targets';
import React, { memo, useState } from 'react';

interface FilterBarProps {
    onSearch: (query: string) => void;
    onFilter: (genre: FilterTargetType) => void;
}

const targets = [
    { id: 'top', value: 'Top Rated' },
    { id: 'popular', value: 'Popular' },
    { id: 'adults', value: 'Adults Only' },
];

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilter }) => {
    const [hasFilter, setHasFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<FilterTargetType>('');

    const handleFilterChange = (value: FilterTargetType) => {
        setHasFilter(value !== ''); 
        setSelectedFilter(value);
        onFilter(value);
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by title or description..."
                className="p-2 border rounded w-full md:w-1/3"
                onChange={(e) => onSearch(e.target.value)}
            />

            {/* Filter Dropdown */}
            <select
                value={selectedFilter}
                className="p-2 border rounded w-full md:w-1/4"
                onChange={(e) => handleFilterChange(e.target.value as FilterTargetType)}
            >
                {/* Reset Option */}
                <option key="reset" value="" disabled={!hasFilter}>
                    {hasFilter ? 'Reset Filter' : 'Select Filter'}
                </option>

                {/* Filter Options {top, popular, adult}*/}
                {targets.map((target) => (
                    <option key={target.id} value={target.id}>
                        {target.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default memo(FilterBar);
