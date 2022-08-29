import React, { useEffect, useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearError, login, register } from '../../actions/userActions';
import noImage from '../../asset/Profile.png';
import Loading from '../Layout/Loading';

function LoginSignup() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { loading, error, isAuthenticate } = useSelector((state) => state.user);

    const alert = useAlert();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isAuthenticate) {
            navigation('/account');
        }
    }, [alert, error, dispatch, isAuthenticate, navigation]);

    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState(noImage);
    const [avatarPreview, setAvatarPreview] = useState(noImage);

    const loginRef = useRef();
    const signupRef = useRef();

    const loginFromRef = useRef();
    const signupFromRef = useRef();

    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            loginRef.current.classList.add('bg-sky-500', 'text-white');
            loginRef.current.classList.remove('bg-white', 'text-sky-500');

            signupRef.current.classList.remove('bg-sky-500', 'text-white');
            signupRef.current.classList.add('bg-white', 'text-sky-500');

            loginFromRef.current.classList.remove('-translate-x-[110%]');
            loginFromRef.current.classList.add('translate-x-0');

            signupFromRef.current.classList.add('translate-x-[110%]');
            signupFromRef.current.classList.remove('translate-x-0');
        }
        if (tab === 'signup') {
            signupRef.current.classList.add('bg-sky-500', 'text-white');
            signupRef.current.classList.remove('bg-white', 'text-sky-500');

            loginRef.current.classList.remove('bg-sky-500', 'text-white');
            loginRef.current.classList.add('bg-white', 'text-sky-500');

            loginFromRef.current.classList.add('-translate-x-[110%]');
            loginFromRef.current.classList.remove('translate-x-0');

            signupFromRef.current.classList.remove('translate-x-[110%]');
            signupFromRef.current.classList.add('translate-x-0');
        }
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword));
    };
    const signupSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            avatar
        };
        dispatch(register(userData));
    };

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return loading ? (
        <Loading />
    ) : (
        <div className="container mx-auto p-4">
            <div className="flex justify-center ">
                <div className="w-[65vw] sm:w-[55vw] md:w-[30vw] h-[75vh] flex flex-col bg-slate-500  overflow-hidden relative border-2 rounded border-slate-500 ">
                    <div className="w-full">
                        <button
                            onClick={(e) => switchTabs(e, 'login')}
                            ref={loginRef}
                            type="button"
                            className="w-1/2 duration-300 py-3 px-8 hover:bg-sky-400 hover:text-white bg-sky-500 text-white">
                            Login
                        </button>
                        <button
                            ref={signupRef}
                            type="button"
                            onClick={(e) => switchTabs(e, 'signup')}
                            className="w-1/2 duration-300 py-3 px-8 hover:bg-sky-400 hover:text-white bg-white text-sky-500">
                            Signup
                        </button>
                    </div>
                    <div className="p-4">
                        <form
                            className="duration-300 flex flex-col gap-y-8 py-4"
                            ref={loginFromRef}
                            onSubmit={loginSubmit}>
                            <div className="flex items-center gap-4 bg-slate-500 border-2 rounded border-white p-2 ">
                                <FaEnvelope className="text-white" size="1.8rem" />
                                <input
                                    type="email"
                                    name="loginEmail"
                                    id="loginEmail"
                                    value={loginEmail}
                                    className="w-[90%] bg-transparent focus:outline-none text-white"
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4 bg-slate-500 border-2 rounded border-white p-2">
                                <FaLock className="text-white" size="1.8rem" />
                                <input
                                    type="password"
                                    name="loginPassword"
                                    id="loginPassword"
                                    value={loginPassword}
                                    placeholder="******"
                                    className="w-[90%] bg-transparent focus:outline-none text-white"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <NavLink to="#" className="text-right text-slate-300">
                                Forget password
                            </NavLink>
                            <input
                                className="bg-sky-500 p-2 text-white rounded"
                                type="submit"
                                value="submit"
                            />
                        </form>
                        <form
                            onSubmit={signupSubmit}
                            encType="multipart/form-data"
                            className="duration-300 translate-x-[110%] -translate-y-[85%] flex flex-col gap-y-6  py-4"
                            ref={signupFromRef}>
                            <div className="flex items-center gap-4 bg-slate-500 border-2 rounded border-white p-2 ">
                                <FaUserAlt className="text-white" size="1.8rem" />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    className="w-[90%] bg-transparent focus:outline-none text-white"
                                    placeholder="Your name"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="flex items-center gap-4 bg-slate-500 border-2 rounded border-white p-2 ">
                                <FaEnvelope className="text-white" size="1.8rem" />
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={email}
                                    className="w-[90%] bg-transparent focus:outline-none text-white"
                                    placeholder="example@gmail.com"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="flex items-center gap-4 bg-slate-500 border-2 rounded border-white p-2 ">
                                <FaLock className="text-white" size="1.8rem" />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    className="w-[90%] bg-transparent focus:outline-none text-white"
                                    placeholder="Password"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="flex items-center gap-4 bg-slate-500 ">
                                <img src={avatarPreview} className="w-8 h-8 rounded-full" alt="" />

                                <div className="flex justify-center items-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col justify-center items-center w-full  bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col justify-center items-center ">
                                            <p className="py-1 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>
                                            </p>
                                        </div>
                                        <input
                                            name="avatar"
                                            accept="image/*"
                                            id="dropzone-file"
                                            onChange={registerDataChange}
                                            type="file"
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                            <input
                                className="bg-sky-500 p-2 text-white rounded"
                                type="submit"
                                value="submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
