var dbPromised = idb.open('team', 1, upgradeDb => {
    var teamObjectStore = upgradeDb.createObjectStore('teamFav', {
        keyPath: 'id'
    });
    teamObjectStore.createIndex('namaTeam', 'name', { unique: false});
});

function simpanFavoriteTim(data) {
    dbPromised.then(function(db) {
        var tx = db.transaction('teamFav', 'readwrite');
        var dataSave = {
            id: data.id,
            name: data.name,
            address: data.address,
            website: data.website,
            email: data.email,
            phone: data.phone,
            clubColors: data.clubColors,
            crestUrl : data.crestUrl,
        };
        tx.objectStore('teamFav').put(dataSave);
        return tx.complete;
    }).then(function() {
        var options = {
            'body': `TIM ${data.name}`,
            'icon': 'img/icon.png'
        }
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Simpan ke Favoritku', options);
            });
            } else {
                console.error('Fitur notifikasi tidak diijinkan.');
            }
    }).catch(function(err) {
        console.log(err);
    })
}

function cekDataTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction('teamFav', "readonly");
            var store = tx.objectStore('teamFav');
            return store.get(id);
        })
        .then(function (data) {
            if (data != undefined) {
                resolve(true)
            }else {
                reject(false);
            }
        });
    });
}

function hapusFavoriteTim(data) {
    dbPromised.then(function(db) {
        var tx = db.transaction('teamFav', 'readwrite');
        var store = tx.objectStore('teamFav');        
        store.delete(data);
        return tx.complete;
    }).then(function() {
        var options = {
            'body': 'TIM Berhasil Dihapus :(',
            'icon': 'img/icon.png'
        }

        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Hapus dari Favoritku', options);
            });
        } else {
            console.error('Fitur notifikasi tidak diijinkan.');
        }
    }).catch(function(err) {
        console.log(err);
    })
}

function getAllDataFavorit() {
    return new Promise(function (resolve) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('teamFav', "readonly");
                var store = tx.objectStore('teamFav');
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}