import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile({ user }) {
    console.log(user);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl text-center font-bold my-8"> My Profile</h1>
            <div className="flex justify-around gap-4">
                <div className="flex flex-col justify-center gap-6 ">
                    <img className="rounded-full w-40 h-40" src={user.avatar.url} alt="" />

                    <button
                        className="text-center mx-auto rounded text-white bg-sky-500 px-6 py-3"
                        type="button">
                        Edit Profile
                    </button>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="">
                        <h1 className="text-2xl font-bold">Full Name</h1>
                        <p>{user.name}</p>
                    </div>
                    <div className="">
                        <h1 className="text-2xl font-bold">Email</h1>
                        <p>{user.email}</p>
                    </div>
                    <div className="">
                        <h1 className="text-2xl font-bold">Join On</h1>
                        <p>{user.createdAt}</p>
                    </div>
                    <div className="">
                        <h1 className="text-2xl font-bold">Role</h1>
                        <p>{user.role}</p>
                    </div>
                    <NavLink
                        to="/order"
                        className="text-center  w-full  rounded text-white bg-sky-500 px-6 py-3"
                        type="button">
                        My Order
                    </NavLink>
                    <NavLink
                        to="/password/update"
                        className="text-center w-full rounded text-white bg-sky-500 px-6 py-3"
                        type="button">
                        change Password
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Profile;
