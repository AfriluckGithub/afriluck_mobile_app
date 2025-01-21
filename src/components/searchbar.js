import React from 'react';
import '../output.css';

const SearchBar = () => {
    return (
        <div class="font-sans bg-gray-200 rounded-xl flex items-center p-2 mt-24 mr-5 ml-5 mb-1 h-16">
            <svg class="h-6 w-6 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input type="text" class="font-semibold flex-grow ml-2 bg-transparent text-gray-600 placeholder-gray-500 focus:outline-none" placeholder="Search games" />
        </div>
    );
};

export default SearchBar;