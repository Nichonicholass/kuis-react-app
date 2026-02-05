import { useMemo } from 'react';
import Button from './Button';
import { decodeHtml } from '../utils/decoder'; // Import lagi decodernya

function QuizCard({ questionData, onAnswerClick }) {
  
  // 1. Gabungkan & Acak Jawaban
  const shuffledAnswers = useMemo(() => {
    const answers = [
      ...questionData.incorrect_answers,
      questionData.correct_answer
    ];
    return answers.sort(() => Math.random() - 0.5);
  }, [questionData]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 rounded-xl shadow-lg transition-colors duration-300 
                    bg-white dark:bg-dark-card dark:border dark:border-gray-700">
      
      {/* Header Kategori */}
      <div className="flex justify-between text-sm mb-4 font-bold tracking-wide">
        <span className="text-primary dark:text-orange-300">
           {/* DECODE DISINI */}
           {decodeHtml(questionData.category)}
        </span>
        
        <span className={`px-2 py-1 rounded text-white text-xs capitalize ${
          questionData.difficulty === 'easy' ? 'bg-green-500' : 
          questionData.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          {questionData.difficulty}
        </span>
      </div>

      {/* Soal */}
      <h2 className="text-xl font-semibold mb-6 leading-relaxed text-gray-800 dark:text-white">
        {/* DECODE DISINI (Penting banget karena soal sering ada tanda kutip) */}
        {decodeHtml(questionData.question)}
      </h2>

      {/* Pilihan Jawaban */}
      <div className="grid grid-cols-1 gap-3">
        {shuffledAnswers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => onAnswerClick(answer)}
            variant="outline"
            className="w-full text-left justify-start !font-medium py-4 border-2 hover:bg-orange-50 dark:hover:bg-gray-700"
          >
            {/* DECODE DISINI JUGA */}
            {decodeHtml(answer)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default QuizCard;