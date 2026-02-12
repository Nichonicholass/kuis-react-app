import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (amount = 10, difficulty = 'medium', category = '9') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount: amount,
        category: category,
        difficulty: difficulty,
        type: 'multiple',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};