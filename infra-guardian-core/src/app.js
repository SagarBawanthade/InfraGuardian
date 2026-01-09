import "dotenv/config";
import express from "express";
import { sendSlackAlert } from "./alerts/slack.alert.js";
import { canSendAlert } from "./alerts/alert.cache.js";
import { formatSlackMessage } from "./alerts/alert.formatter.js";
import { getProblematicPodEvents } from "./collectors/events.collector.js";
import { getPodRestartCounts } from "./collectors/metrics.collector.js";
import { correlate } from "./correlator/correlation.engine.js";
import { recommend } from "./recommender/recommendations.js";



const app = express();
const PORT = 3000;


async function runMonitoringCycle() {
  const alertsEnabled = process.env.ALERTS_ENABLED === "true";

  const events = await getProblematicPodEvents();
  const metrics = await getPodRestartCounts();
  const analysis = correlate(events, metrics);

  const insights = analysis.map(a => ({
    ...a,
    recommendations: recommend(a)
  }));

  if (alertsEnabled) {
    for (const insight of insights) {
      const alertKey = `${insight.namespace}/${insight.pod}/${insight.issue}`;

      if (canSendAlert(alertKey)) {
        const payload = formatSlackMessage(insight);
        await sendSlackAlert(payload);
      }
    }
  }
}


// HEALTH
app.get("/health", (req, res) => {
  res.json({ status: "Infra Guardian running" });
});

// EVENTS
app.get("/events", async (req, res) => {
  const events = await getProblematicPodEvents();

  res.json(
    events.map(e => ({
      pod: e.involvedObject?.name,
      namespace: e.involvedObject?.namespace,
      reason: e.reason,
      message: e.message,
      time: e.lastTimestamp || e.eventTime
    }))
  );
});

// METRICS
app.get("/metrics/restarts", async (req, res) => {
  const data = await getPodRestartCounts();
  res.json(data);
});

// ANALYSIS
app.get("/analysis", async (req, res) => {
  const events = await getProblematicPodEvents();
  const metrics = await getPodRestartCounts();

  res.json(correlate(events, metrics));
});

// INSIGHTS
app.get("/insights", async (req, res) => {
  const events = await getProblematicPodEvents();
  const metrics = await getPodRestartCounts();
  const analysis = correlate(events, metrics);

  const insights = analysis.map(a => ({
    ...a,
    recommendations: recommend(a)
  }));

  res.json(insights);
});



app.listen(PORT, () => {
  console.log(`Infra Guardian listening on port ${PORT}`);
});

setInterval(() => {
  runMonitoringCycle().catch(err =>
    console.error("Monitoring cycle failed:", err.message)
  );
}, 30000); //30 sec


