import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { FaDashcube, FaList, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';

function UserNavUtils({ user }) {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        { icon: <FaUserAlt />, name: 'Profile', func: profile },
        { icon: <FaList />, name: 'Order', func: order },
        { icon: <FaSignOutAlt />, name: 'Log out', func: logoutFunc }
    ];

    if (user.role === 'admin') {
        options.unshift({ icon: <FaDashcube />, name: 'Dashboard', func: dashboard });
    }
    function dashboard() {
        navigate('/dashboard');
    }
    function logoutFunc() {
        dispatch(logout());
        alert.success('Logout successful');
    }
    function order() {
        navigate('/order');
    }
    function profile() {
        navigate('/account');
    }

    return (
        <div className="group border relative p-2  sm:py-7 transition-all flex flex-row items-center gap-2">
            <img className="w-8 h-8 rounded-full" src={user.avatar.url} alt="" />
            <div className="group-hover:top-full sm:absolute duration-300 sm:w-52 rounded-md sm:bg-slate-300 sm:right-1/2 -top-[400%] sm:-z-20 sm:translate-x-1/2  flex flex-row sm:flex-col sm:gap-4 gap-2 sm:py-4 ">
                <div className="hidden sm:block sm:absolute w-8 h-8 bg-slate-300 rotate-45 left-1/2 top-0 -translate-x-1/2 -z-10" />
                {options.map(({ icon, name, func }) => (
                    <Fragment key={name}>
                        <button type="button" className="sm:px-4 flex sm:gap-3" onClick={func}>
                            {icon}
                            <span className="hidden sm:block">{name}</span>
                        </button>

                        <hr />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default UserNavUtils;
