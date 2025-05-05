import axios from 'axios';

export const sendEmail = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/email', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};