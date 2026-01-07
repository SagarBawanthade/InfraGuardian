const cooldownMinutes = Number(process.env.ALERT_COOLDOWN_MINUTES || 15);
const alertCache = new Map();

export function canSendAlert(key) {
  const now = Date.now();
  const lastSent = alertCache.get(key);

  if (!lastSent) {
    alertCache.set(key, now);
    return true;
  }

  const diffMinutes = (now - lastSent) / (1000 * 60);

  if (diffMinutes >= cooldownMinutes) {
    alertCache.set(key, now);
    return true;
  }

  return false;
}
