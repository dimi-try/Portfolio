import axios from 'axios';

export const getTranslations = async (lang) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/translations/${lang}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch translations for ${lang}`);
  }
};