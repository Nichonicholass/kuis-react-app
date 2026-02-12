import { useMemo } from 'react';
import { CheckCircle, Clock, Hash, Home, RefreshCcw, Trophy, XCircle } from 'lucide-react';

import Button from '../../common/Button';

function QuizResult({ score, totalQuestions, category, timeSpent, onRestart, onHome }) {
  const correct = score.correct;
  const wrong = score.wrong;
  const answered = correct + wrong;
  const finalScore = correct * 20;

  const grade = useMemo(() => {
    const percentage = (correct / totalQuestions) * 100;
    if (percentage === 100)
      return { label: 'Perfect!', color: 'text-green-500', bg: 'bg-green-100' };
    if (percentage >= 80) return { label: 'Excellent!', color: 'text-blue-500', bg: 'bg-blue-100' };
    if (percentage >= 50)
      return { label: 'Good Job!', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { label: 'Keep Practice!', color: 'text-red-500', bg: 'bg-red-100' };
  }, [correct, totalQuestions]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <div
        className="max-w-lg w-full bg-white dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in-up opacity-0"
        style={{ animationDelay: '0s' }}
      >
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 text-center border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <div
              className={`w-24 h-24 ${grade.bg} ${grade.color} rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 animate-pop-in opacity-0`}
              style={{ animationDelay: '0.3s' }}
            >
              <Trophy size={48} className="animate-bounce" />
            </div>
          </div>
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <h2 className={`text-3xl font-extrabold mb-1 ${grade.color}`}>{grade.label}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You completed the{' '}
              <span className="font-bold text-gray-700 dark:text-gray-200">{category.name}</span>{' '}
              quiz!
            </p>
          </div>
        </div>

        <div className="p-8">
          <div
            className="text-center mb-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="text-6xl font-black text-gray-800 dark:text-white tracking-tighter">
              {finalScore}
            </span>
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest block mt-1">
              Total Score
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div
              className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="bg-green-200 text-green-700 p-2 rounded-lg">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-green-700 dark:text-green-400">{correct}</p>
                <p className="text-xs text-green-600/70 font-bold uppercase">Correct</p>
              </div>
            </div>

            <div
              className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.7s' }}
            >
              <div className="bg-red-200 text-red-700 p-2 rounded-lg">
                <XCircle size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-red-700 dark:text-red-400">{wrong}</p>
                <p className="text-xs text-red-600/70 font-bold uppercase">Wrong</p>
              </div>
            </div>

            <div
              className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="bg-blue-200 text-blue-700 p-2 rounded-lg">
                <Hash size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  {answered}
                  <span className="text-xs text-blue-400">/{totalQuestions}</span>
                </p>
                <p className="text-xs text-blue-600/70 font-bold uppercase">Answered</p>
              </div>
            </div>

            <div
              className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.9s' }}
            >
              <div className="bg-orange-200 text-orange-700 p-2 rounded-lg">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-orange-700 dark:text-orange-400">
                  {timeSpent}s
                </p>
                <p className="text-xs text-orange-600/70 font-bold uppercase">Time Spent</p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-3 animate-fade-in-up opacity-0"
            style={{ animationDelay: '1s' }}
          >
            <Button
              onClick={onRestart}
              className="py-4 text-base shadow-lg shadow-orange-500/20 flex justify-center items-center gap-2 transform transition-transform hover:scale-[1.02]"
            >
              <RefreshCcw size={18} /> Play Again
            </Button>
            <Button
              variant="outline"
              onClick={onHome}
              className="py-4 text-base border-gray-200 hover:bg-gray-50 flex justify-center items-center gap-2"
            >
              <Home size={18} /> Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
