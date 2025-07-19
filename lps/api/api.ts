import axios from 'axios';

const BASE_URL = 'http://10.47.92.81:8000/api';  // Change with your IP

export const registerPatient = async (name: string, phone: string, doctorId: number) => {
  const response = await axios.post(`${BASE_URL}/register/`, {
    name,
    phone_number: phone,
    doctor: doctorId
  });
  return response.data;
};