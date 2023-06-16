// Register the service worker
export function register() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
            .then(reg => console.log("Registered service worker with scope: ", reg.scope));
    }
}
