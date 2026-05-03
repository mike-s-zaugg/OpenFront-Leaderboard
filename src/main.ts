import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

interface LeaderboardResponse {
    start: string
    end: string
    clans: Clan[]
}

interface Clan {
    clanTag: string
    games: number
    wins: number
    losses: number
    weightedWLRatio: number
}

// Daten holen
async function loadLeaderboard(): Promise<Clan[]> {
    const response = await fetch('/api/public/clans/leaderboard')

    if (!response.ok) {
        throw new Error('Unable to load clans')
    }
    const data = await response.json() as LeaderboardResponse
    return data.clans
}

// HTML Bauen
function displayClan(clan: Clan, rank: number):string {
    const answer = `<div class="card"><h1 class="card-title">#${rank} ${clan.clanTag}</h1><br><p>Games: ${clan.games}</p><br><p>Wins: ${clan.wins}</p><br><p>Losses: ${clan.losses}</p><br><p>W/L Ratio: ${clan.weightedWLRatio}</p></div>`
    return answer
}

// Daten darstellen -> Funktionen aufrufen
async function main() {
    try{
        const clan = await loadLeaderboard()
        const top10 = clan.slice(0, 10)

        top10.forEach((clans, index) => {
            const answer = displayClan(clans, index + 1)

            if (app) {
                app.innerHTML += answer
            }
        })
    } catch (error) {
        console.error(error)
    }
}

main()

