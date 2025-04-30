import { api } from "../utils/FetchConfig";

class Authentication {
  async register(data) {
    try {
      const response = await api.post("/v1/auth/register", data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async login(data) {
    try {
      const response = await api.post("/v1/auth/login", data);
      return response;
    } catch (error) {
      return error;
    }
  }
    
    async logout() {
        try {
            // const response = await api.
        } catch (error) {
            
        }
    }
}
