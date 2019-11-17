const base_url ="https://api.football-data.org/";

let fetchApi = url => {
    return fetch(url, {
        method: "get",
        mode: "cors",
        headers: {
            'X-Auth-Token': '59d84e6753fc4c48a3cb6c983731a581'
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getKlassemen() {
    if ('caches' in window) {
        caches.match(`${base_url}v2/competitions/2021/standings`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    dataKlasemen(data);
                });
            }
        });
    }

    fetchApi(`${base_url}v2/competitions/2021/standings`)
        .then(status)
        .then(json)
        .then(function(data) {
            dataKlasemen(data)   
        })
    .catch(error);
}

function getGol() {
    if ('caches' in window) {
        caches.match(`${base_url}v2/competitions/2021/scorers?limit=10`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    dataGol(data);
                });
            }
        });
    }

    fetchApi(`${base_url}v2/competitions/2021/scorers?limit=10`)
        .then(status)
        .then(json)
        .then(function(data) {
            dataGol(data);
        })
    .catch(error);
}

function getDetailTim(teamid) {
    if ('caches' in window) {
        caches.match(`${base_url}v2/teams/`+teamid).then(function (response) {
        if (response) {
            response.json().then(function (data) {
                dataDetailTim(data);
            });
        }
        });
    }
    fetchApi(`${base_url}v2/teams/`+teamid)
        .then(status)
        .then(json)
        .then(function(data) {
            dataDetailTim(data);
        })
    .catch(error);
}

function getTimIdDetail(teamid) {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(`${base_url}v2/teams/`+teamid).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resolve(data);
                    });
                }
            });
        }
        fetchApi(`${base_url}v2/teams/`+teamid)
            .then(status)
            .then(json)
            .then(function(data) {
                resolve(data);
            })
            .catch(error);
    });
}

function getFavorit() {
    var dataIndexDb = getAllDataFavorit();
    dataIndexDb.then(function (data) {    
        var timFavorit = '';
        data.forEach(function(tim) {
            timFavorit +=`
                        <div class="card">
                            <div style="text-align: center; display: block; background-color: #0155EB; padding-top: 5px;">
                                <a href="#"><img style="width: 100px; height: 100px;" src="${tim.crestUrl.replace(/^http:\/\//i, 'https://')}" /></a>
                            </div>
                            <div class="">
                                <span style="text-align: center; font-weight: 500;" class="card-title truncate"><h4>${tim.name}</h4></span>
                                <table>
                                    <tr>
                                        <td style="text-align: center;" width="50px"><b>Alamat</b> : ${tim.address}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><b>Website</b> : ${tim.website}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><b>Email</b> : ${tim.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><b>Telp</b> : ${tim.phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><b>Warna Tim</b> : ${tim.clubColors}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    `;
        });
        document.getElementById("timFavorit").innerHTML = timFavorit;                  
    });
}

function dataDetailTim(data){
    var detailHTML = '';

    detailHTML=`
                <div class="card">
                    <div style="text-align: center; display: block; background-color: #0155EB; padding-top: 5px;">
                        <a href="#"><img style="width: 100px; height: 100px;" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" /></a>
                    </div>
                    <div class="">
                        <span style="text-align: center; font-weight: 500;" class="card-title truncate"><h4>${data.name}</h4></span>
                        <table>
                            <tr>
                                <td style="text-align: center;" width="50px"><b>Alamat</b> : ${data.address}</td>
                            </tr>
                            <tr>
                                <td style="text-align: center;"><b>Website</b> : ${data.website}</td>
                            </tr>
                            <tr>
                                <td style="text-align: center;"><b>Email</b> : ${data.email}</td>
                            </tr>
                            <tr>
                                <td style="text-align: center;"><b>Telp</b> : ${data.phone}</td>
                            </tr>
                            <tr>
                                <td style="text-align: center;"><b>Warna Tim</b> : ${data.clubColors}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                `;
    document.getElementById("detailHTML").innerHTML = detailHTML;
}

function dataKlasemen(data){
    let klasemenHTML = '';
    data.standings[0].table.forEach(function(team) {
    klasemenHTML += `
                    <div class="card">
                        <div style="text-align: center; display: block; background-color: #0155EB; padding-top: 5px;">
                            <a href="./detail.html?detail=${team.team.id}"><img style="width: 100px; height: 100px;" src="${ team.team.crestUrl}" /></a>
                        </div>
                        <div class="card-content">
                            <span style="text-align: center; font-weight: 400;" class="card-title truncate">${team.team.name}</span>
                            <table>
                                <tr>
                                    <td>Posisi</td>
                                    <td>Main</td>
                                    <td>Menang</td>
                                    <td>Seri</td>
                                    <td>Kalah</td>
                                    <td>Poin</td>
                                </tr>
                                <tr>
                                    <td>${team.position}</td>
                                    <td>${team.playedGames}</td>
                                    <td>${team.won}</td>
                                    <td>${team.draw}</td>
                                    <td>${team.lost}</td>
                                    <td>${team.points}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;
    });
    document.getElementById("klasemen").innerHTML = klasemenHTML;
}

function dataGol(data){
    var gol = '';
    data.scorers.forEach(function(player) {
    gol += `
            <div class="card">
                <div style="text-align: center; display: block; background-color: #0155EB; padding-top: 5px;">
                    <a href="#">
                        <img style="width: 100px; height: 100px;" src="img/latar-baju.png" />
                        <div style="position: absolute;top: 40px;left: 50%;transform: translate(-50%, -50%);"><h4 style="color: white;">${player.player.shirtNumber ||'-'}</h4></div>
                    </a>
                </div>
                <div class="card-content">
                    <span style="text-align: center; font-weight: bold;" class="card-title truncate">${player.player.name}</span>
                    <div style="text-align: center; margin-top: -10px;">(${player.team.name})</div>
                    <div style="text-align: center;"><h5>${player.numberOfGoals} Gol</h5></div>
                </div>
            </div>
        `;
    });

    document.getElementById("gol").innerHTML = gol;
}
