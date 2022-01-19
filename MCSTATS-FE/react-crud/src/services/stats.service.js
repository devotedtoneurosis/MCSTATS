import http from "../http-common";

class StatsDataService {
  getAll() {
    return http.get("/stats");
  }

  findByProject(id) {
    return http.get(`/stats/project_id/${id}`);
  }
}

export default new StatsDataService();