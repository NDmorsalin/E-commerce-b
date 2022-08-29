import React from 'react';
import { NavLink } from 'react-router-dom';

const route = [
    {
        uri: 'auth',
        text: 'Login / Register'
    },
    {
        uri: 'me',
        text: 'My account'
    },
    {
        uri: 'contact',
        text: 'Contact with us'
    }
];

function TopNav() {
    return (
        <div className="border-b-[1px] border-gray-300">
            <div className="hidden md:flex container mx-auto px-4 justify-between items-center">
                <a
                    href="tel:016466-53053"
                    className="text-gray-600 hover:text-sky-600 transition-all">
                    CALL US: 016466-53053
                </a>

                <div className="py-2">
                    {route.map(({ uri, text }) => (
                        <NavLink
                            key={text}
                            className="text-gray-600 hover:text-sky-600 border-r-[1px] border-gray-300 px-2 last:border-r-[0px] last:pr-0 last:m-0 transition-all"
                            to={uri}>
                            {text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopNav;
