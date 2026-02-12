function Timer({ duration }) {
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div 
        className={`text-2xl font-bold font-mono tracking-widest transition-colors ${
          duration < 10 
            ? 'text-red-500 animate-pulse' 
            : 'text-gray-700 dark:text-gray-200'
        }`}
      >
        {formatTime(duration)}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Remaining Time
      </p>
    </div>
  );
}

export default Timer;