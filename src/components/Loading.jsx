import React from 'react';

function Loading() {
  return (
    // Container utama: min-h-[60vh] agar posisinya di tengah layar vertikal & horizontal
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* --- SPINNER AREA --- */}
      <div className="relative flex justify-center items-center mb-8">
        
        {/* 1. Efek Ping (Lingkaran membesar & menghilang di belakang) - Opsional biar keren */}
        <div className="absolute animate-ping inline-flex h-24 w-24 rounded-full bg-orange-500 opacity-10"></div>

        {/* 2. Spinner Utama */}
        {/* border-orange-100 = track (jalur) */}
        {/* border-t-orange-500 = head (bagian yang muter) */}
        <div className="w-16 h-16 rounded-full border-4 border-orange-100 dark:border-gray-700 border-t-orange-500 animate-spin"></div>
      
      </div>

      {/* --- TEXT INDICATOR --- */}
      <div className="text-center animate-pulse">
        <span className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] text-sm uppercase">
          Preparing Your Challenge...
        </span>
      </div>

    </div>
  );
}

export default Loading;