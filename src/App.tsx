import { MemoryCard } from './components/MemoryCard/MemoryCard';
import { ScoreCard } from './components/ScoreCard/ScoreCard';
import { CardContainer } from './components/CardContainer/CardContainer';
import { useState, useEffect } from 'react';

function App() {
	const [players, setPlayers] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	useEffect(() => {
		// Accessing the Vite environment variable
		const apiKey = import.meta.env.VITE_API_KEY;

		const options = {
			method: 'GET',
			headers: { 'x-apisports-key': `${apiKey}` },
		};

		fetch(
			`https://v3.football.api-sports.io/players/topscorers?league=1&season=2022`,
			options,
		)
			.then((res) => res.json())
			.then((data) => {
				const resPlayersData = data.response
					.slice(0, 10)
					.map((res, index: number) => {
						return {
							name: res.player.name,
							photo: res.player.photo,
							team: res.statistics[0].team.name,
						};
					});
				console.log(resPlayersData);
				setPlayers(resPlayersData);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<header>
				<h1>memory game</h1>
				<p>Top Scorers in the 2022 World Cup</p>
			</header>
			<main>
				<ScoreCard currentScore={currentScore} bestScore={bestScore} />
				<CardContainer>
					{players.length > 0 &&
						players.map((p) => (
							<MemoryCard
								key={p.name}
								imgUrl={p.photo}
								name={p.name}
								team={p.team}
							/>
						))}
				</CardContainer>
			</main>
		</>
	);
}

export default App;
