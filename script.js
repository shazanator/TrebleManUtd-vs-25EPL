<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.4">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">document.addEventListener("DOMContentLoaded", async function () {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const teamSelect = document.getElementById("team-select");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const simulateBtn = document.getElementById("simulate-btn");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const matchResult = document.getElementById("match-result");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const finalScore = document.getElementById("final-score");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const goalScorersList = document.getElementById("goal-scorers");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const cardEventsList = document.getElementById("card-events");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const united98_99 = {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>name: "Manchester United 98/99",</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>attack: 90,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>midfield: 88,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>defense: 85,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>keyPlayers: ["Dwight Yorke", "Andy Cole", "David Beckham", "Roy Keane", "Ryan Giggs"],</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>goalProbability: { "Dwight Yorke": 30, "Andy Cole": 25, "David Beckham": 15, "Ryan Giggs": 15, "Roy Keane": 10 },</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>yellowCardProbability: { "Roy Keane": 40, "Jaap Stam": 30, "Dennis Irwin": 20 },</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>redCardProbability: { "Roy Keane": 10, "Jaap Stam": 5 }</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>async function fetchPremierLeagueTeams() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>try {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>const response = await fetch("https://api.football-data.org/v4/competitions/PL/teams", {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>headers: { "X-Auth-Token": "YOUR_API_KEY" }</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>const data = await response.json();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>teamSelect.innerHTML = "";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>data.teams.forEach(team =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>let option = document.createElement("option");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>option.value = team.id;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>option.textContent = team.name;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>teamSelect.appendChild(option);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>} catch (error) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>console.error("Error fetching Premier League teams:", error);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>function getRandomWeightedPlayer(probabilityDict) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let totalWeight = Object.values(probabilityDict).reduce((a, b) =&gt; a + b, 0);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let randomNum = Math.random() * totalWeight;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let cumulativeWeight = 0;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>for (let player in probabilityDict) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>cumulativeWeight += probabilityDict[player];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>if (randomNum &lt; cumulativeWeight) return player;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>return null;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>function simulateMatch(currentTeamStats) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let unitedGoals = Math.floor(Math.random() * 4);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let opponentGoals = Math.floor(Math.random() * (currentTeamStats.attack &gt; 80 ? 3 : 2));</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let goalScorers = [];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>for (let i = 0; i &lt; unitedGoals; i++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>goalScorers.push(getRandomWeightedPlayer(united98_99.goalProbability));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let yellowCards = [];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let redCards = [];</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (Math.random() &lt; 0.5) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>yellowCards.push(getRandomWeightedPlayer(united98_99.yellowCardProbability));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (Math.random() &lt; 0.2) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>redCards.push(getRandomWeightedPlayer(united98_99.redCardProbability));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>return { unitedGoals, opponentGoals, goalScorers, yellowCards, redCards };</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>async function startMatchSimulation() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const selectedTeamId = teamSelect.value;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (!selectedTeamId) return alert("Please select a team!");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>try {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>const response = await fetch(`https://api.football-data.org/v4/teams/${selectedTeamId}`, {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>headers: { "X-Auth-Token": "YOUR_API_KEY" }</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>const teamData = await response.json();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>let currentTeamStats = {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>attack: Math.floor(Math.random() * 20) + 75, <span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>defense: Math.floor(Math.random() * 20) + 70 <span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>let matchOutcome = simulateMatch(currentTeamStats);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>finalScore.textContent = `Manchester United 98/99 ${matchOutcome.unitedGoals} - ${matchOutcome.opponentGoals} ${teamData.name}`;</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">            </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>goalScorersList.innerHTML = matchOutcome.goalScorers.map(player =&gt; `&lt;li&gt;${player}&lt;/li&gt;`).join("");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>cardEventsList.innerHTML = matchOutcome.yellowCards.concat(matchOutcome.redCards).map(player =&gt; `&lt;li&gt;${player}&lt;/li&gt;`).join("");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>matchResult.classList.remove("hidden");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>} catch (error) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>console.error("Error simulating match:", error);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>simulateBtn.addEventListener("click", startMatchSimulation);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>fetchPremierLeagueTeams();</span></p>
<p class="p1"><span class="s1">});</span></p>
</body>
</html>
