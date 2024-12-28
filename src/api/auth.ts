import axios from "../lib/axios";

export const getNewAccessToken = async () => {
  try {
    const response = await axios.post("/api/auth/refresh");
    return response.data.result.access_token;
  } catch (e) {
    console.error(e);
    return null;
  }
};
