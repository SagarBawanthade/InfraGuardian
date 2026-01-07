export function formatSlackMessage(insight) {
  return {
    text: `🚨 *Infra Guardian Alert*`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Issue:* ${insight.issue}\n*Severity:* ${insight.severity}`
        }
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Pod:*\n${insight.pod}` },
          { type: "mrkdwn", text: `*Namespace:*\n${insight.namespace}` }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Recommendations:*\n• ${insight.recommendations.join("\n• ")}`
        }
      }
    ]
  };
}
