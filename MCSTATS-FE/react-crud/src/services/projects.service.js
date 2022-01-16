import http from "../http-common";

class ProjectsDataService {
  getAll() {
    return http.get("/projects");
  }

  get(project_id) {
    return http.get(`/projects/${project_id}`);
  }

  create(data) {
    return http.post("/projects", data);
  }

  update(project_id, data) {
    return http.put(`/projects/${project_id}`, data);
  }

  delete(project_id) {
    return http.delete(`/projects/${project_id}`);
  }

  deleteAll() {
    return http.delete(`/projects`);
  }

  findByTitle(project_name) {
    return http.get(`/projects?project_name=${project_name}`);
  }
}

export default new ProjectsDataService();