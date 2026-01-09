import axios from "axios";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

console.log("Slack webhook loaded:", !!SLACK_WEBHOOK_URL);

const slackClient = axios.create({
  timeout: 5000, // 5 seconds
  headers: {
    "Content-Type": "application/json"
  }
});

export async function sendSlackAlert(payload, attempt = 1) {
  if (!SLACK_WEBHOOK_URL) {
    console.warn("Slack webhook not configured");
    return;
  }

  try {
    await slackClient.post(SLACK_WEBHOOK_URL, payload);
  } catch (err) {
    if (attempt <= 3) {
      console.warn(
        `Slack alert failed (attempt ${attempt}), retrying...`
      );
      await new Promise(r => setTimeout(r, 1000 * attempt));
      return sendSlackAlert(payload, attempt + 1);
    }

    console.error(
      "Failed to send Slack alert after retries:",
      err.code || err.message
    );
  }
}
