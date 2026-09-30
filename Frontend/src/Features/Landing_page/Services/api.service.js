import axios from "axios";
import { API_BASE_URL } from "../../../config/api.config";

const ContactUs = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/contact`,
    formData
  );

  return response.data;
};

export default ContactUs;