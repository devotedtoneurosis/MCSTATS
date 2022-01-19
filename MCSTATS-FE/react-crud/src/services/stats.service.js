import http from "../http-common";

class StatsDataService {
  getAll() {
    return http.get("/stats");
  }

  findByProject(project_id) {
    console.log("Checking api for proj:"+project_id);
    return http.get(`/stats/project_id/${project_id}`);
  }
}

export default new StatsDataService();