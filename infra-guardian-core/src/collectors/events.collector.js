import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();

if (process.env.KUBERNETES_SERVICE_HOST) {
  kc.loadFromCluster();
} else {
  kc.loadFromDefault();
}

const coreApi = kc.makeApiClient(k8s.CoreV1Api);

export async function getProblematicPodEvents() {
  try {
    const res = await coreApi.listEventForAllNamespaces();

    // 🔒 Normalize response shape (VERY IMPORTANT)
    const items =
      res?.body?.items ||
      res?.items ||
      res?.response?.body?.items ||
      [];

    return items.filter(e =>
      ["BackOff", "OOMKilled", "FailedScheduling"].includes(e.reason)
    );
  } catch (err) {
    console.error("Failed to fetch pod events:", err.message);
    return [];
  }
}
