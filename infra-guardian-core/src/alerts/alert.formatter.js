export function formatSlackMessage(insight) {
  const recs =
    insight.recommendations?.length > 0
      ? insight.recommendations
      : ["Investigate pod logs and recent changes"];

  return {
    text: `🚨 Infra Guardian Alert`,
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
          text: `*Recommendations:*\n• ${recs.join("\n• ")}`
        }
      }
    ]
  };
}
