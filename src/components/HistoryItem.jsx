import { Clock } from 'lucide-react';

function HistoryItem({ game }) {
  const total = game.correct + game.wrong;
  const percentage = total > 0 ? (game.correct / total) * 100 : 0;
  const isHighScore = game.score >= 50;

  return (
    <div className="group flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/40 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-md border border-transparent hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-1 uppercase tracking-wider">
          <Clock size={12} />
          {new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold ${isHighScore ? 'text-green-600' : 'text-orange-500'}`}
          >
            {game.score}
          </span>
          <span className="text-xs text-gray-400 font-medium">pts</span>
        </div>
      </div>
      <div className="text-right w-1/3">
        <div className="flex justify-end gap-3 text-xs font-bold mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="text-green-600 flex items-center gap-1">✔ {game.correct}</span>
          <span className="text-red-400 flex items-center gap-1">✖ {game.wrong}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${isHighScore ? 'bg-green-500' : 'bg-orange-400'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
export default HistoryItem;
