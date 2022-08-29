/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [keyword, setKeyword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products?keyword=${keyword}`, { replace: true });
        } else {
            navigate(`/products`);
        }
    };

    return (
        <div className="container mx-auto p-8 h-[59vh] flex items-center justify-center">
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex border border-sky-500 items-center justify-center">
                <input
                    onChange={(e) => setKeyword(e.target.value)}
                    type="text"
                    className="w-[80%] focus:outline-none  px-4 py-2"
                />

                <input
                    type="submit"
                    value="Search"
                    className="bg-sky-500 cursor-pointer px-4 py-3"
                />
            </form>
        </div>
    );
}

export default Search;
