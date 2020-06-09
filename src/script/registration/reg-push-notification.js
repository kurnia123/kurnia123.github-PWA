function registrationServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
                console.log("pendaftaran service worker berhasil")
                return registration;
            })
            .catch(function (err) {  
                console.log("pendaftaran service worker gagal: ",err)
            })
        });
    }
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            
            // navigator.serviceWorker.getRegistration().then(function(reg) {
            //     reg.showNotification('Notifikasi diijinkan!');
            // });

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (registration) {  
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:urlBase64ToUnit8Array("BNyoaDUH960xEc3KIbVSSapF93vCkorQAdiW-1IT-Yu3kAX-mexeftPF_gZTuCz5W6eZDhHrzM16Zm8pEZguvhY"),
                    }).then(function (subscribe) {  
                        console.log("berhasil melakukan subscribe dengan endpoint: ",subscribe.endpoint);
                        console.log("berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log("berhasil melakukan subscribe dengan auth key: ",btoa(String.fromCharCode.apply(
                            null,new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {  
                        console.error("tidak dapat melkukan subscribe ", e.message);
                    });
                });
            }

        });
    }
}

function urlBase64ToUnit8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for(let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export {
    registrationServiceWorker,
    requestPermission,
}