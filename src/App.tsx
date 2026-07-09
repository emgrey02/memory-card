import { MemoryCard } from './components/MemoryCard/MemoryCard';
import { ScoreCard } from './components/ScoreCard/ScoreCard';
import { CardContainer } from './components/CardContainer/CardContainer';
import { useState, useEffect } from 'react';
import { useWindowSize } from './hooks/useWindowSize.ts';
import Confetti from 'react-confetti';

type Player = {
	name: string;
	team: string;
	photo: string;
	clicked: boolean;
};

function App() {
	const [players, setPlayers] = useState<Player[] | undefined>();
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [goConfetti, setGoConfetti] = useState(false);
	const { width, height } = useWindowSize();
	const [showResult, setShowResult] = useState(false);
	const [resultText, setResultText] = useState('');

	const shufflePlayers = (arr: Player[] | undefined) => {
		if (!arr) return;
		const copy = [...arr];
		let currEl, randomElIndex;
		let length = copy.length;

		while (length) {
			// pick a random element
			randomElIndex = Math.floor(Math.random() * length--);

			// swap with current element
			currEl = copy[length];
			copy[length] = copy[randomElIndex];
			copy[randomElIndex] = currEl;
		}

		return copy;
	};

	const handleCardClick = (name: string) => {
		const playerInfo = players?.find((p) => p.name === name);

		if (!playerInfo) return;

		if (playerInfo?.clicked) {
			resetScore();
			setResultText('Oops! Try again.');
			setShowResult(true);
			setTimeout(() => {
				setShowResult(false);
			}, 2000);
		} else {
			setPlayers((currentPlayers) => {
				const updatedPlayers = currentPlayers?.map((player) =>
					player.name === name
						? { ...player, clicked: true }
						: player,
				);

				return shufflePlayers(updatedPlayers);
			});
			scoreOne();
		}
	};

	const resetCardClicks = () => {
		setPlayers((currentPlayers) =>
			currentPlayers?.map((player) => ({
				...player,
				clicked: false,
			})),
		);
	};

	const resetScore = () => {
		setCurrentScore(0);
		if (currentScore > bestScore) {
			setBestScore(currentScore);
		}
		resetCardClicks();
	};

	const scoreOne = () => {
		setCurrentScore((currentScore) => {
			if (currentScore + 1 === 10) {
				setGoConfetti(true);
				setResultText('You did it!!');
				setShowResult(true);
			}
			return currentScore + 1;
		});
	};

	useEffect(() => {
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
					.map(
						(res: {
							player: { name: string; photo: string };
							statistics: { team: { name: string } }[];
						}) => {
							return {
								name: res.player.name,
								photo: res.player.photo,
								team: res.statistics[0].team.name,
								clicked: false,
							};
						},
					);
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
				{goConfetti && <Confetti width={width} height={height} />}
				{showResult && (
					<p
						style={{
							color: 'blue',
							position: 'absolute',
							right: '50%',
							transform: 'translate(50%)',
							marginBlockStart: '125px',
						}}
					>
						{resultText}
					</p>
				)}
				<ScoreCard currentScore={currentScore} bestScore={bestScore} />
				<CardContainer>
					{players &&
						players.length > 0 &&
						players.map((p) => (
							<MemoryCard
								key={p.name}
								imgUrl={p.photo}
								name={p.name}
								team={p.team}
								handleCardClick={handleCardClick}
							/>
						))}
				</CardContainer>
			</main>
		</>
	);
}

export default App;
