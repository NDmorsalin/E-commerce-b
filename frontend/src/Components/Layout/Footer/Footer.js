import React from 'react';

function Footer() {
    return (
        <div className="bg-slate-800 text-slate-200 ">
            <div className="container mx-auto p-4 flex items-center justify-between text-center flex-col sm:flex-row gap-3">
                <div className="flex gap-4 flex-col">
                    <h3 className="">Download Our App</h3>
                    <p>
                        Download Apps for Android and <br /> ios Mobile phone
                    </p>
                </div>
                <div className="">
                    <h2 className="text-4xl text-rose-600 mb-5">E-commerce.</h2>
                    <p>Heigh Quality is our First priority</p>
                    <p>Copyright 2022 &copy; NDM </p>
                </div>
                <div className="flex gap-2 flex-col">
                    <h3 className="text-2xl underline">Follow us </h3>

                    <a href="https://facebook.com/ndmorsalin" target="_blank" rel="noreferrer">
                        Facebook
                    </a>
                    <a href="https://Instagram.com/ndmorsalin" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
