export function correlate(events, metrics) {
  const restartMap = {};

  metrics.forEach(m => {
    restartMap[m.metric.pod] = Number(m.value[1]);
  });

  return events.map(e => ({
    pod: e.involvedObject?.name,
    namespace: e.involvedObject?.namespace,
    issue: e.reason,
    restarts: restartMap[e.involvedObject?.name] || 0,
    severity:
      (restartMap[e.involvedObject?.name] || 0) > 5
        ? "HIGH"
        : "MEDIUM"
  }));
}
