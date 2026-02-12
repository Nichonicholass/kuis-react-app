import { AlertTriangle, Clock, Hash } from 'lucide-react';
import Button from './Button';
import { CATEGORIES } from '../constants/categories';

function ResumeModal({ isOpen, data, onResume, onGiveUp }) {
  if (!isOpen || !data) return null;

  const category = CATEGORIES.find(c => c.id === data.categoryId); 
  const currentQuestion = data.currentIndex + 1;
  const totalQuestions = data.questions.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-card w-full max-w-md p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all scale-100 animate-bounce-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-3 animate-pulse">
            <AlertTriangle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
            Unfinished Quiz Found!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Would you like to continue?
          </p>
          <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color.replace('text-', 'text-opacity-80 text-')}`}>
                {category.icon} 
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Topic</p>
                <p className="font-bold text-gray-800 dark:text-white">{category.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Hash size={18} className="text-blue-500" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Question</p>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">
                    {currentQuestion} <span className="text-gray-400 font-normal">/ {totalQuestions}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={18} className={data.timeLeft < 10 ? "text-red-500" : "text-green-500"} />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Time Left</p>
                  <p className={`font-bold text-sm ${data.timeLeft < 10 ? "text-red-500" : "text-green-600"}`}>
                    {data.timeLeft}s
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <Button 
              onClick={onGiveUp} 
              variant="outline" 
              className="flex-1 border-red-200 text-red-500 hover:bg-red-50 text-sm"
            >
              Give Up
            </Button>
            <Button 
              onClick={onResume} 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm"
            >
              Resume Quiz
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ResumeModal;