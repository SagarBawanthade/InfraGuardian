import axios from "axios";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;


console.log(
  "Slack webhook loaded:",
  !!process.env.SLACK_WEBHOOK_URL
);



export async function sendSlackAlert(payload) {
  if (!SLACK_WEBHOOK_URL) {
    console.warn("Slack webhook not configured");
    return;
  }

  try {
    await axios.post(SLACK_WEBHOOK_URL, payload);
  } catch (err) {
    console.error("Failed to send Slack alert:", err.message);
  }
}

