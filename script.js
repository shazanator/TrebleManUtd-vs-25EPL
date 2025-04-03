document.addEventListener("DOMContentLoaded", async function () {
    const teamSelect = document.getElementById("team-select");
    const simulateBtn = document.getElementById("simulate-btn");
    const matchResult = document.getElementById("match-result");
    const finalScore = document.getElementById("final-score");
    const goalScorersList = document.getElementById("goal-scorers");
    const cardEventsList = document.getElementById("card-events");

    const united98_99 = {
        name: "Manchester United 98/99",
        attack: 90,
        midfield: 88,
        defense: 85,
        keyPlayers: ["Dwight Yorke", "Andy Cole", "David Beckham", "Roy Keane", "Ryan Giggs"],
        goalProbability: { "Dwight Yorke": 30, "Andy Cole": 25, "David Beckham": 15, "Ryan Giggs": 15, "Roy Keane": 10 },
        yellowCardProbability: { "Roy Keane": 40, "Jaap Stam": 30, "Dennis Irwin": 20 },
        redCardProbability: { "Roy Keane": 10, "Jaap Stam": 5 }
    };

    async function fetchPremierLeagueTeams() {
        try {
            const response = await fetch("https://api.football-data.org/v4/competitions/PL/teams", {
                headers: { "X-Auth-Token": "YOUR_API_KEY" }
            });
            const data = await response.json();
            teamSelect.innerHTML = "";
            data.teams.forEach(team => {
                let option = document.createElement("option");
                option.value = team.id;
                option.textContent = team.name;
                teamSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching Premier League teams:", error);
        }
    }

    function getRandomWeightedPlayer(probabilityDict) {
        let totalWeight = Object.values(probabilityDict).reduce((a, b) => a + b, 0);
        let randomNum = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let player in probabilityDict) {
            cumulativeWeight += probabilityDict[player];
            if (randomNum < cumulativeWeight) return player;
        }
        return null;
    }

    function simulateMatch(currentTeamStats) {
        let unitedGoals = Math.floor(Math.random() * 4);
        let opponentGoals = Math.floor(Math.random() * (currentTeamStats.attack > 80 ? 3 : 2));

        let goalScorers = [];
        for (let i = 0; i < unitedGoals; i++) {
            goalScorers.push(getRandomWeightedPlayer(united98_99.goalProbability));
        }

        let yellowCards = [];
        let redCards = [];

        if (Math.random() < 0.5) {
            yellowCards.push(getRandomWeightedPlayer(united98_99.yellowCardProbability));
        }

        if (Math.random() < 0.2) {
            redCards.push(getRandomWeightedPlayer(united98_99.redCardProbability));
        }

        return { unitedGoals, opponentGoals, goalScorers, yellowCards, redCards };
    }

    async function startMatchSimulation() {
        const selectedTeamId = teamSelect.value;
        if (!selectedTeamId) return alert("Please select a team!");

        try {
            const response = await fetch(`https://api.football-data.org/v4/teams/${selectedTeamId}`, {
                headers: { "X-Auth-Token": "YOUR_API_KEY" }
            });
            const teamData = await response.json();

            let currentTeamStats = {
                attack: Math.floor(Math.random() * 20) + 75,  
                defense: Math.floor(Math.random() * 20) + 70  
            };

            let matchOutcome = simulateMatch(currentTeamStats);

            finalScore.textContent = `Manchester United 98/99 ${matchOutcome.unitedGoals} - ${matchOutcome.opponentGoals} ${teamData.name}`;
            
            goalScorersList.innerHTML = matchOutcome.goalScorers.map(player => `<li>${player}</li>`).join("");
            cardEventsList.innerHTML = matchOutcome.yellowCards.concat(matchOutcome.redCards).map(player => `<li>${player}</li>`).join("");

            matchResult.classList.remove("hidden");
        } catch (error) {
            console.error("Error simulating match:", error);
        }
    }

    simulateBtn.addEventListener("click", startMatchSimulation);
    fetchPremierLeagueTeams();
});