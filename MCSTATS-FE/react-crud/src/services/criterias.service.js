import http from "../http-common";

class CriteriasDataService {
  getAll() {
    return http.get("/criterias");
  }

  get(id) {
    return http.get(`/criterias/${id}`);
  }

  create(data) {
    return http.post("/criterias", data);
  }

  update(id, data) {
    return http.put(`/criterias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/criterias/${id}`);
  }

  deleteAll() {
    return http.delete(`/criterias`);
  }

  findByProjectId(projectid) {
    return http.get(`/criterias?project_id=${projectid}`);
  }
}

export default new CriteriasDataService();