document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get("detail"));
    getDetailTim(id);

    let isFavorit = false

    let btnSimpan = document.getElementById("simpan");
    let btnHapus = document.getElementById("hapus");

    cekDataTeam(id).then((msg) => {
        isFavorit = true
        btnHapus.style.display = "block"
        btnSimpan.style.display = "none"
    }).catch((msg) => {
        isFavorit = false
        btnHapus.style.display = "none"
        btnSimpan.style.display = "block"
    })

    btnSimpan.onclick = function () {
        if (isFavorit) {
            hapusFavoriteTim(id);
            isFavorit = false
            btnHapus.style.display = "none"
            btnSimpan.style.display = "block"
        } else {
            team = getTimIdDetail(id);   
            team.then(function (team) {
                simpanFavoriteTim(team);
            });
            isFavorit = true
            btnHapus.style.display = "block"
            btnSimpan.style.display = "none"
        }
    };

    btnHapus.onclick = function () {
        if (isFavorit) {
            hapusFavoriteTim(id);
            isFavorit = false
            btnHapus.style.display = "none"
            btnSimpan.style.display = "block"
        } else {
            team = getTeamsIdDetail(id);   
            team.then(function (team) {
                simpanFavoriteTim(team);
            });
            isFavorit = true
            btnHapus.style.display = "block"
            btnSimpan.style.display = "none"
        }
    };
});