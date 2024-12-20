import axios from "axios";

const API_URL = "http://localhost:8080/api/chat/ask";

export const fetchChatResponse = async (question) => {
  try {
    const reponse = await axios.post(API_URL, { question });

    return reponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
