const cooldownMinutes = Number(process.env.ALERT_COOLDOWN_MINUTES || 15);
const alertCache = new Map();


setInterval(() => {
  const now = Date.now();
  for (const [key, time] of alertCache.entries()) {
    if ((now - time) / (1000 * 60) > cooldownMinutes * 2) {
      alertCache.delete(key);
    }
  }
}, 10 * 60 * 1000);

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
