import http from "../http-common";

class StatsDataService {
  getAll() {
    return http.get("/stats");
  }

  getAllByProject(project_id) {
    return http.get(`/stats/project_id/${project_id}`);
  }
}

export default new StatsDataService();