import http from "../http-common";

class CriteriasDataService {
  getAll() {
    return http.get("/social_criterias");
  }

  get(id) {
    return http.get(`/social_criterias/${id}`);
  }

  create(data) {
    return http.post(`/social_criterias/`, data);
  }

  update(id, data) {
    return http.put(`/social_criterias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/social_criterias/${id}`);
  }

  deleteAll(project_id) {
    return http.delete(`/social_criterias/project_id/${project_id}`);
  }

  findByProjectId(project_id) {
    console.log("Checking api for proj:"+project_id);
    return http.get(`/social_criterias/project_id/${project_id}`);
  }
}

export default new CriteriasDataService();