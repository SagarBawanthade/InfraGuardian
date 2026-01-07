import axios from "axios";

const PROM_URL = process.env.PROM_URL || "http://localhost:9090";

export async function getPodRestartCounts() {
  const query =
    "sum by (pod) (kube_pod_container_status_restarts_total)";

  const res = await axios.get(`${PROM_URL}/api/v1/query`, {
    params: { query }
  });

  return res.data.data.result;
}