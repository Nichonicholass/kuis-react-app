import { useEffect } from 'react';

function Timer({ duration, onTimeUp, timeUsed }) {
  // Format detik ke MM:SS (Contoh: 65 -> 01:05)
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Persentase waktu berjalan (untuk progress bar merah)
  // Asumsi durasi total adalah 'duration' awal
  const progress = (duration / 60) * 100; // Contoh visualisasi sederhana

  return (
    <div className="flex flex-col items-center mb-6">
      <div className={`text-2xl font-bold font-mono tracking-widest
        ${duration < 10 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-200'}`}>
        {formatTime(duration)}
      </div>
      <p className="text-xs text-gray-500 mt-1">Sisa Waktu</p>
    </div>
  );
}

export default Timer;