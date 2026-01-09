
import axios from "axios";

const PROM_URL = process.env.PROM_URL;

export async function getPodRestartCounts() {
  if (!PROM_URL) {
    console.warn("Prometheus not configured, skipping metrics");
    return [];
  }

  try {
    const query =
      "sum by (pod) (kube_pod_container_status_restarts_total)";

    const res = await axios.get(`${PROM_URL}/api/v1/query`, {
      params: { query }
    });

    return res?.data?.data?.result || [];
  } catch (err) {
    console.error("Failed to fetch Prometheus metrics:", err.message);
    return [];
  }
}
