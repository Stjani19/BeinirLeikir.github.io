var elapsedTime = document.querySelector("#elapsed");
var homeTeamLogo = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamLogo = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoals = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");

function addMatchTile(data) {
  var matchTile = document.createElement("div");
  matchTile.classList.add("match-tile");

  //Home team image and name
  var homeTeam = document.createElement("div");
  homeTeam.classList.add("team");

  var homeTileLogo = document.createElement("img");
  var homeTileName = document.createElement("p");

  homeTileLogo.src = data["teams"]["home"]["logo"];
  homeTileName.innerHTML = data["teams"]["home"]["name"];

  var awayTeam = document.createElement("div");
  awayTeam.classList.add("team");

  var awayTileLogo = document.createElement("img");
  var awayTileName = document.createElement("p");

  awayTileLogo.src = data["teams"]["away"]["logo"];
  awayTileName.innerHTML = data["teams"]["away"]["name"];

  homeTeam.appendChild(homeTileLogo);
  homeTeam.appendChild(homeTileName);

  awayTeam.appendChild(awayTileLogo);
  awayTeam.appendChild(awayTileName);

  var elapsed = document.createElement("p");
  elapsed.innerHTML = data["fixture"]["status"]["elapsed"] + "'";

  var score = document.createElement("p");
  score.innerHTML = data["goals"]["home"] + "  -  " + data["goals"]["away"];

  var details = document.createElement("div");
  details.classList.add("details");
  details.appendChild(elapsed);
  details.appendChild(score);

  matchTile.appendChild(homeTeam);
  matchTile.appendChild(details);
  matchTile.appendChild(awayTeam);

  matchTable.appendChild(matchTile);
}

//Hér kemur API og fleiri upplýsingar

fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
  method: "Get",
  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "b1cbc51beamsh103b44bb1677690p180983jsn08880f2c1598"
  }
})
  .then((response) =>
    response.json().then((data) => {
      var matchesList = data["response"];
      var fixture = matchesList[0]["fixture"];
      var goals = matchesList[0]["goals"];
      var teams = matchesList[0]["teams"];
      console.log(matchesList.length);

      //Now let's set our first match
      elapsedTime.innerHTML = fixture["status"]["elapsed"] + "'";
      homeTeamLogo.src = teams["home"]["logo"];
      homeTeamName.innerHTML = teams["home"]["name"];
      awayTeamLogo.src = teams["away"]["logo"];
      awayTeamName.innerHTML = teams["away"]["name"];
      lastMatchGoals.innerHTML = goals["home"] + " - " + goals["away"];

      for (var i = 1; i < matchesList.length; i++) {
        addMatchTile(matchesList[i]);
      }
    })
  )
  .catch((err) => {
    console.log(err);
  });




    



