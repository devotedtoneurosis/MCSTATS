import http from "../http-common";

class StatsDataService {
  getAll() {
    return http.get("/stats");
  }
}

export default new StatsDataService();