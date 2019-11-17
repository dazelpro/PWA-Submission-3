if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
            requestPermission();
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
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

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (reg) {
                    // reg.showNotification('Notifikasi diijinkan guys!', {icon: 'img/icon.png'});
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BPEh1gf_wiwiSEMuxw749sUE15Uw22CX8HIT75_NTzEW_HSsIjnJTkJMC1KdcyNDiaBWmkuI1RE4nDeODSJ-H3k")
                    }).then(function (sub) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(sub.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(sub.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e);
                    });
                });
            }

        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// $ web-push generate-vapid-keys --json
// {"publicKey":"BPEh1gf_wiwiSEMuxw749sUE15Uw22CX8HIT75_NTzEW_HSsIjnJTkJMC1KdcyNDiaBWmkuI1RE4nDeODSJ-H3k","privateKey":"Z8zRtOMLiRW5uic3i-rhILvJUOBR7dJTE-gZs254oqs"}