import idb from "./idb.js"

let dbPromised = idb.open("team-favorite",1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('team')) {
        upgradeDb.createObjectStore("team");
        
    }
})

function saveForLatter(data) {
    console.log("SaveForLatter dipanggil")
    dbPromised
    .then(function (db) {
        let tx = db.transaction("team","readwrite");
        let store = tx.objectStore("team");
        store.put(data,data.id)

        return tx.complete;
    })
    .then(function () {
        console.log("Club berhasil di simpan: ");
        M.toast({html: 'Berhasil disimpan'})
    })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("team","readonly")
                let store = tx.objectStore("team");

                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles)
            })
    })
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("team","readonly");
                let store = tx.objectStore("team");

                return store.get(id);
            })
            .then(function(article) {
                resolve(article);
            })
    })
}

function deleteByid(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("team","readwrite");
                let store = tx.objectStore("team");
                store.delete(parseInt(id));
                
                return tx.complete;
            })
            .then(function(article) {
                resolve(article);
                M.toast({html: 'Berhasil di Hapus'})
            })
    })
}

export {saveForLatter,getAll,getById,deleteByid}