/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useState } from 'react';
import { FaRegHeart, FaShoppingCart, FaSistrix, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../../asset/logo.webp';
import UserNavUtils from '../../utils/UserNavUtils';
import Loading from '../Loading';

const route = [
    {
        uri: '/',
        text: 'HOME'
    },
    {
        uri: '/products',
        text: 'PRODUCTS'
    },
    {
        uri: '/blog',
        text: 'BLOG'
    }
];

const icons = [
    {
        uri: '/search',
        icon: (
            <div className="px-4 sm:py-7 transition-all">
                <FaSistrix />
            </div>
        )
    },
    {
        uri: '/auth',
        icon: (
            <div className="px-4 sm:py-7 transition-all">
                <FaUserAlt />
            </div>
        )
    },
    {
        uri: '/blog',
        icon: (
            <div className="px-4 sm:py-7 transition-all">
                <FaRegHeart />{' '}
            </div>
        )
    },
    {
        uri: '/card',
        icon: (
            <div className="px-4 sm:py-7 transition-all">
                {' '}
                <FaShoppingCart />{' '}
            </div>
        )
    }
];

function NavBar() {
    const [isClose, setIsClose] = useState(true);
    const handleToggle = () => {
        setIsClose((prev) => !prev);
    };
    const { loading, user, isAuthenticate } = useSelector((state) => state.user);

    // console.log(user);
    return loading ? (
        <Loading />
    ) : (
        <div className="container mx-auto px-4">
            <div className="relative z-10 flex justify-between items-center sm:flex-nowrap flex-wrap ">
                <div className="py-2">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                {/* toggler */}
                <div className="toggler sm:hidden z-10" onClick={handleToggle}>
                    <span
                        className={`block duration-500 -m-[1px] w-6 h-[2px] bg-sky-700 ${
                            isClose ? 'rotate-0' : 'rotate-45'
                        }`}
                    />
                    <span
                        className={`${
                            isClose ? 'block' : 'hidden'
                        } duration-500 my-1 -m-[1px] w-6 h-[2px] bg-sky-700`}
                    />
                    <span
                        className={`block duration-500 -m-[1px] w-6 h-[2px] bg-sky-700 ${
                            isClose ? 'rotate-0' : '-rotate-45'
                        }`}
                    />
                </div>

                <div
                    className={`absolute -z-10 sm:static ${
                        isClose ? '-top-[16rem]' : 'top-full'
                    } duration-500 w-full flex items-start sm:justify-between sm:flex-row flex-col py-4 sm:py-0 sm:items-center bg-slate-400 sm:bg-white`}>
                    <div className="" />
                    <div className="midNav  -z-10 flex flex-col sm:flex-row   justify-between items-start sm:items-center ">
                        {route.map(({ uri, text }) => (
                            <NavLink
                                key={text}
                                className="px-4 py-3 sm:py-7 block transition-all hover:text-sky-600"
                                to={uri}>
                                {text}
                            </NavLink>
                        ))}
                    </div>
                    <div className="iconsNav flex text-2xl items-center">
                        {icons.map(({ uri, icon }) => {
                            return (
                                <Fragment key={uri}>
                                    <hr className="hidden sm:block h-auto w-[1px] border-0 bg-gray-200" />
                                    {isAuthenticate && uri === '/auth' ? (
                                        <UserNavUtils user={user} />
                                    ) : (
                                        <NavLink className="" to={uri}>
                                            {icon}
                                        </NavLink>
                                    )}
                                </Fragment>
                            );
                        })}
                        <hr className="hidden sm:block h-auto w-[1px] border-0 bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
