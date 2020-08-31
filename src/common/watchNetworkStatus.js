export default function watchNetworkStatus(isOnline, isOffline) {
  navigator.onLine ? isOnline() : isOffline();

  window.addEventListener('online', () => isOnline(), false);
  window.addEventListener('offline', () => isOffline(), false);
}
