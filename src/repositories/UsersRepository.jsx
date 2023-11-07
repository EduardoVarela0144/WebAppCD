import api from "../services/api";

class UsersRepository {
  async getUsers(page, search) {
    const response = await api.get(`/users?page=${page}&q=${search}`);
    return response.data;
  }
  async postUser(user) {
    const response = await api.post(`/users`, user);
    return response.data;
  }

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`, id);
    return response.data;
  }
  async getUserById(id) {
    const response = await api.get(`/users/getUser/${id}`, id);
    return response.data;
  }

  async putUserById(user) {
    console.log(user);
    const response = await api.put(`/users/editUser/${user.id}`, user.info);
    return response.data;
  }

  async login(user) {
    const response = await api.post("/users/login", user);
    return response.data;
  }
  async loginWithLinkedIn(email) {
    const response = await api.get(`/users/loginLinkedIn/${email}`, email);
    return response.data;
  }
  async getRoleByName(rol) {
    const response = await api.get(`/rol/getRolByName/${rol}`, rol);
    return response.data;
  }
  async getToken(params) {
    const response = await api.get(`/users/loginLinkedInToken?code=${params}`, params);
    return response.data;
  }
}

export default new UsersRepository();
