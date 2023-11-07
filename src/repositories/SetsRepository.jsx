import api from "../services/api";

class SetsRepository{
    async getSets(){
        const response = await api.get(`/set/getAllSets`);
        return response.data;
    }
    async getRequest(){
        const response = await api.get(`/set/getAllRequest`);
        return response.data;
    }
    async postSet(set){
        const response = await api.post(`/set`, set);
        return response.data;
    }
    async deleteSet(id){
        
        const response = await api.delete(`/set/deleteSet/${id}`);
        
        return response.data;
    }
    async getSetById(id) {
        const response = await api.get(`/set/getSet/${id}`);
        return response.data;
        
    }
      
}


export default new SetsRepository();