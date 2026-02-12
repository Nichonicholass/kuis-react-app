import { decodeHtml } from '../utils/decoder';

function QuizCard({ questionData, onAnswerClick, isExiting }) {
  if (!questionData) return null;

  const answers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer
  ];

  if (answers.length === 0) return null;

  return (
    <div 
      className={`w-full max-w-3xl mx-auto mt-6 transition-all duration-300 ease-in-out transform ${
        isExiting ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* Question Card */}
      <div className="bg-white dark:bg-dark-card p-8 rounded-3xl shadow-xl border-b-4 border-gray-100 dark:border-gray-700 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-white text-center">
          {decodeHtml(questionData.question)}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <button
            key={`answer-${index}`}
            onClick={() => onAnswerClick(answer)}
            className="group relative w-full p-5 rounded-2xl bg-white dark:bg-dark-card 
                       border-2 border-gray-200 dark:border-gray-700 
                       hover:border-orange-400 dark:hover:border-orange-500 
                       hover:bg-orange-50 dark:hover:bg-gray-800
                       active:scale-[0.98] transition-all duration-200 
                       text-left shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-lg 
                           bg-gray-100 dark:bg-gray-700 
                           text-gray-500 dark:text-gray-300 
                           font-bold flex items-center justify-center 
                           group-hover:bg-orange-500 group-hover:text-white 
                           transition-colors"
              >
                {String.fromCharCode(65 + index)}
              </div>
              
              <span 
                className="text-lg font-medium text-gray-700 dark:text-gray-200 
                           group-hover:text-orange-600 dark:group-hover:text-orange-400 
                           transition-colors"
              >
                {decodeHtml(answer)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizCard;