import React from 'react';

function Loading() {
    return (
        <div className="w-full h-screen bg-slate-500 flex items-center justify-center">
            <div className="w-20 h-20 border-r-2 border-dotted animate-spin	 rounded-full bg-transparent " />
        </div>
    );
}

export default Loading;
