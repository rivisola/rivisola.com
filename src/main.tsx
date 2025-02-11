import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import allData from './data.json' with { type: 'json' };
import { Pie, PieChart, Tooltip } from 'recharts';

const genders = [
	{ label: 'Male (♂)', code: '♂', color: 'rgb(96 165 250)' },
	{ label: 'Female (♀)', code: '♀', color: 'rgb(244 114 182)' },
];
const races = [
	{ label: 'Hyur', color: 'rgb(248 113 113)' },
	{ label: 'Elezen', color: 'rgb(251 146 60)' },
	{ label: 'Lalafell', color: 'rgb(250 204 21)' },
	{ label: "Miqo'te", color: 'rgb(74 222 128)' },
	{ label: 'Roegadyn', color: 'rgb(34 211 238)' },
	{ label: 'Au Ra', color: 'rgb(96 165 250)' },
	{ label: 'Hrothgar', color: 'rgb(167 139 250)' },
	{ label: 'Viera', color: 'rgb(232 121 249)' },
];
const clans = [
	{ label: 'Midlander', color: 'rgb(248 113 113)' },
	{ label: 'Highlander', color: 'rgb(220 38 38)' },
	{ label: 'Wildwood', color: 'rgb(251 146 60)' },
	{ label: 'Duskwight', color: 'rgb(234 88 12)' },
	{ label: 'Plainsfolk', color: 'rgb(250 204 21)' },
	{ label: 'Dunesfolk', color: 'rgb(202 138 4)' },
	{ label: 'Seeker of the Sun', color: 'rgb(74 222 128)' },
	{ label: 'Keeper of the Moon', color: 'rgb(22 163 74)' },
	{ label: 'Sea Wolf', color: 'rgb(34 211 238)' },
	{ label: 'Hellsguard', color: 'rgb(8 145 178)' },
	{ label: 'Raen', color: 'rgb(96 165 250)' },
	{ label: 'Xaela', color: 'rgb(37 99 235)' },
	{ label: 'Helions', color: 'rgb(167 139 250)' },
	{ label: 'The Lost', color: 'rgb(124 58 237)' },
	{ label: 'Rava', color: 'rgb(232 121 249)' },
	{ label: 'Veena', color: 'rgb(192 38 211)' },
];
const guardians = [
	{ label: 'Halone, the Fury', short: 'Halone', color: 'rgb(34 211 238)' },
	{ label: 'Menphina, the Lover', short: 'Menphina', color: 'rgb(8 145 178)' },
	{ label: 'Thaliak, the Scholar', short: 'Thaliak', color: 'rgb(96 165 250)' },
	{ label: 'Nymeia, the Spinner', short: 'Nymeia', color: 'rgb(37 99 235)' },
	{
		label: 'Llymlaen, the Navigator',
		short: 'Llymlaen',
		color: 'rgb(74 222 128)',
	},
	{ label: 'Oschon, the Wanderer', short: 'Oschon', color: 'rgb(22 163 74)' },
	{
		label: 'Byregot, the Builder',
		short: 'Byregot',
		color: 'rgb(192 132 252)',
	},
	{ label: 'Rhalgr, the Destroyer', short: 'Rhalgr', color: 'rgb(147 51 234)' },
	{ label: 'Azeyma, the Warden', short: 'Azeyma', color: 'rgb(248 113 113)' },
	{
		label: "Nald'thal, the Traders",
		short: "Nald'thal",
		color: 'rgb(220 38 38)',
	},
	{ label: 'Nophica, the Matron', short: 'Nophica', color: 'rgb(250 204 21)' },
	{ label: 'Althyk, the Keeper', short: 'Althyk', color: 'rgb(202 138 4)' },
];
const startingCities = [
	{ label: 'Limsa Lominsa', color: 'rgb(248 113 113)' },
	{ label: "Ul'dah", color: 'rgb(96 165 250)' },
	{ label: 'Gridania', color: 'rgb(250 204 21)' },
];
const grandCompanies = [
	{ label: 'Maelstrom', color: 'rgb(248 113 113)' },
	{ label: 'Immortal Flames', color: 'rgb(96 165 250)' },
	{ label: 'Order of the Twin Adder', color: 'rgb(250 204 21)' },
	{ label: 'No Affiliation', color: 'rgb(156 163 175)' },
];
const roles = [
	{ label: 'Tank', startIndex: 0, endIndex: 4, color: '#38bdf8' },
	{ label: 'Healer', startIndex: 4, endIndex: 8, color: '#22c55e' },
	{ label: 'Melee', startIndex: 8, endIndex: 14, color: '#f87171' },
	{ label: 'Phys Ranged', startIndex: 14, endIndex: 17, color: '#f472b6' },
	{ label: 'Magic Ranged', startIndex: 17, endIndex: 22, color: '#fb923c' },
	{ label: 'DoH', startIndex: 22, endIndex: 30, color: '#a78bfa' },
	{ label: 'DoL', startIndex: 30, endIndex: 33, color: '#facc15' },
];
const jobs = [
	{ label: 'PLD/GLA', index: 0, color: '#93c5fd' },
	{ label: 'WAR/MRD', index: 1, color: '#60a5fa' },
	{ label: 'DRK', index: 2, color: '#3b82f6' },
	{ label: 'GNB', index: 3, color: '#2563eb' },
	{ label: 'WHM/CNJ', index: 4, color: '#86efac' },
	{ label: 'SCH', index: 5, color: '#4ade80' },
	{ label: 'AST', index: 6, color: '#22c55e' },
	{ label: 'SGE', index: 7, color: '#16a34a' },
	{ label: 'MNK/PGL', index: 8, color: '#fecaca' },
	{ label: 'DRG/LNC', index: 9, color: '#fca5a5' },
	{ label: 'NIN/ROG', index: 10, color: '#f87171' },
	{ label: 'SAM', index: 11, color: '#ef4444' },
	{ label: 'RPR', index: 12, color: '#dc2626' },
	{ label: 'VPR', index: 13, color: '#b91c1c' },
	{ label: 'BRD/ARC', index: 14, color: '#f9a8d4' },
	{ label: 'MCH', index: 15, color: '#f472b6' },
	{ label: 'DNC', index: 16, color: '#ec4899' },
	{ label: 'BLM/THM', index: 17, color: '#fed7aa' },
	{ label: 'SMN/ARC', index: 18, color: '#fdba74' },
	{ label: 'RDM', index: 19, color: '#fb923c' },
	{ label: 'PCT', index: 20, color: '#f97316' },
	{ label: 'BLU', index: 21, color: '#ea580c' },
	{ label: 'CRP', index: 22, color: '#ddd6fe' },
	{ label: 'BSM', index: 23, color: '#c4b5fd' },
	{ label: 'ARM', index: 24, color: '#a78bfa' },
	{ label: 'GSM', index: 25, color: '#8b5cf6' },
	{ label: 'LTW', index: 26, color: '#7c3aed' },
	{ label: 'WVR', index: 27, color: '#6d28d9' },
	{ label: 'ALC', index: 28, color: '#5b21b6' },
	{ label: 'CUL', index: 29, color: '#4c1d95' },
	{ label: 'MIN', index: 30, color: '#fde047' },
	{ label: 'BTN', index: 31, color: '#eab308' },
	{ label: 'FSH', index: 32, color: '#ca8a04' },
];
const CHART_WIDTH = 400;
const CHART_HEIGHT = 400;
const ANIMATION_DURATION = 1000;
let OUTER_RADIUS = 140;

function getLabel({
	x,
	y,
	value,
	name,
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: {
	x: number;
	y: number;
	cx: number;
	cy: number;
	name: string;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
	value: number;
}) {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const newX = cx + radius * Math.cos(-midAngle * RADIAN);
	const newY = cy + radius * Math.sin(-midAngle * RADIAN);
	if (value === 0) {
		return <></>;
	}
	return (
		<>
			<text
				x={x}
				y={y}
				dy={-14}
				fill="#444"
				fontFamily="Arial, Helvetica, sans-serif"
				fontSize={18}
				textAnchor="middle"
			>
				{name}
			</text>
			<text
				x={newX}
				y={newY}
				fill="white"
				fontFamily="Arial, Helvetica, sans-serif"
				fontSize={20}
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		</>
	);
}

function makeChartTitle(title: string) {
	return (
		<text
			x="50%"
			y="10"
			fontFamily="Arial, Helvetica, sans-serif"
			fontSize="20"
			fill="black"
			textAnchor="middle"
			dominantBaseline="central"
		>
			{title}
		</text>
	);
}

function filterData(selectedFilter: {
	gender: string;
	race: string;
	clan: string;
	guardian: string;
	startingCity: string;
	grandCompany: string;
	role: string;
}) {
	return allData
		.filter(
			(data) =>
				(!selectedFilter.gender || data.gender === selectedFilter.gender) &&
				(!selectedFilter.race || data.race === selectedFilter.race) &&
				(!selectedFilter.clan || data.clan === selectedFilter.clan) &&
				(!selectedFilter.guardian ||
					data.guardian === selectedFilter.guardian) &&
				(!selectedFilter.startingCity ||
					data.startingCity === selectedFilter.startingCity) &&
				(!selectedFilter.grandCompany ||
					data.grandCompany === selectedFilter.grandCompany),
		)
		.map((x) => {
			if (!selectedFilter.role) {
				return x;
			}
			const selectedRole = roles.find((x) => x.label === selectedFilter.role);
			if (!selectedRole) {
				return x;
			}
			return {
				...x,
				levels: [
					...Array(selectedRole.startIndex).fill(0),
					...x.levels.slice(selectedRole.startIndex, selectedRole.endIndex),
					...Array(33 - selectedRole.endIndex).fill(0),
				],
			};
		});
}

function getMostPopularRace(
	additionalFilter: ({
		race,
		clan,
		gender,
		guardian,
		startingCity,
		grandCompany,
		levels,
	}: {
		race: string;
		clan: string;
		gender: string;
		guardian: string;
		startingCity: string;
		grandCompany: string;
		levels: number[];
	}) => boolean = () => true,
) {
	const raceStats = races.map(({ label }) => ({
		race: label,
		count: allData.filter(({ race }) => race === label).filter(additionalFilter)
			.length,
	}));
	const totalCount = raceStats.map((x) => x.count).reduce((a, b) => a + b);
	const maxValue = Math.max.apply(
		null,
		raceStats.map(({ count }) => count),
	);
	const mostPopularRaces = raceStats.filter(({ count }) => count === maxValue);

	function convertToReadableFormat(
		race: { race: string; count: any },
		total: number,
	) {
		return `${race.race} (${Math.round((race.count / total) * 100)}%)`;
	}

	if (mostPopularRaces.length === 1)
		return convertToReadableFormat(mostPopularRaces[0], totalCount);

	return `a tie between ${mostPopularRaces.map((race) => convertToReadableFormat(race, totalCount)).join(' & ')}`;
}

function getMostPopularGuardian(
	additionalFilter: ({
		race,
		clan,
		gender,
		guardian,
		startingCity,
		grandCompany,
		levels,
	}: {
		race: string;
		clan: string;
		gender: string;
		guardian: string;
		startingCity: string;
		grandCompany: string;
		levels: number[];
	}) => boolean = () => true,
) {
	const guardianStats = guardians.map(({ label }) => ({
		guardian: label,
		count: allData
			.filter(({ guardian }) => guardian === label)
			.filter(additionalFilter).length,
	}));
	const totalCount = guardianStats.map((x) => x.count).reduce((a, b) => a + b);
	const maxValue = Math.max.apply(
		null,
		guardianStats.map(({ count }) => count),
	);
	const mostPopularGuardians = guardianStats.filter(
		({ count }) => count === maxValue,
	);

	function convertToReadableFormat(
		guardian: { guardian: string; count: any },
		total: number,
	) {
		return `${guardian.guardian} (${Math.round((guardian.count / total) * 100)}%)`;
	}

	if (mostPopularGuardians.length === 1)
		return convertToReadableFormat(mostPopularGuardians[0], totalCount);

	return `a tie between ${mostPopularGuardians.map((race) => convertToReadableFormat(race, totalCount)).join(' & ')}`;
}

const mostPopularRace = getMostPopularRace();
const mostPopularMaleRace = getMostPopularRace(({ gender }) => gender === '♂');
const mostPopularFemaleRace = getMostPopularRace(
	({ gender }) => gender === '♀',
);
const mostPopularGuardian = getMostPopularGuardian();
const mostPopularMaleGuardian = getMostPopularGuardian(
	({ gender }) => gender === '♂',
);
const mostPopularFemaleGuardian = getMostPopularGuardian(
	({ gender }) => gender === '♀',
);
const missingClans = clans
	.filter(({ label }) => !allData.map(({ clan }) => clan).includes(label))
	.map(({ label }) => label)
	.join(' & ');
const endangeredSpecies = races
	.filter(
		({ label }) => allData.filter(({ race }) => race === label).length === 1,
	)
	.map(({ label }) => label)
	.join(' & ');

function App() {
	const [selectedFilter, setSelectedFilter] = useState({
		gender: '',
		race: '',
		clan: '',
		guardian: '',
		startingCity: '',
		grandCompany: '',
		role: '',
	});

	const data = filterData(selectedFilter);

	return (
		<>
			<h1>Dawn's Respite Census</h1>
			<p>There are {allData.length} members in the FC.</p>
			<p>
				{data.length === allData.length ? (
					<>Showing all results.</>
				) : (
					<>
						{data.length} of {allData.length} members match the current filter
						criteria.
					</>
				)}
			</p>
			<h2>Filters</h2>
			<div id="filter-options">
				<div>
					<label htmlFor="gender-select">Gender</label>
					<select
						id="gender-select"
						value={selectedFilter.gender}
						onChange={(e) =>
							setSelectedFilter({ ...selectedFilter, gender: e.target.value })
						}
					>
						<option value="">All</option>
						{genders.map(({ code, label }) => (
							<option
								key={code}
								value={code}
								disabled={
									!filterData({ ...selectedFilter, gender: '' }).find(
										({ gender }) => gender === code,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="race-select">Race</label>
					<select
						id="race-select"
						value={selectedFilter.race}
						onChange={(e) =>
							setSelectedFilter({ ...selectedFilter, race: e.target.value })
						}
					>
						<option value="">All</option>
						{races.map(({ label }) => (
							<option
								key={label}
								value={label}
								disabled={
									!filterData({ ...selectedFilter, race: '' }).find(
										({ race }) => race === label,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="clan-select">Clan</label>
					<select
						id="clan-select"
						value={selectedFilter.clan}
						onChange={(e) =>
							setSelectedFilter({ ...selectedFilter, clan: e.target.value })
						}
					>
						<option value="">All</option>
						{clans.map(({ label }) => (
							<option
								key={label}
								value={label}
								disabled={
									!filterData({ ...selectedFilter, clan: '' }).find(
										({ clan }) => clan === label,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="guardian-select">Guardian</label>
					<select
						id="guardian-select"
						value={selectedFilter.guardian}
						onChange={(e) =>
							setSelectedFilter({ ...selectedFilter, guardian: e.target.value })
						}
					>
						<option value="">All</option>
						{guardians.map(({ label }) => (
							<option
								key={label}
								value={label}
								disabled={
									!filterData({ ...selectedFilter, guardian: '' }).find(
										({ guardian }) => guardian === label,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="startingCity-select">Starting City</label>
					<select
						id="startingCity-select"
						value={selectedFilter.startingCity}
						onChange={(e) =>
							setSelectedFilter({
								...selectedFilter,
								startingCity: e.target.value,
							})
						}
					>
						<option value="">All</option>
						{startingCities.map(({ label }) => (
							<option
								key={label}
								value={label}
								disabled={
									!filterData({ ...selectedFilter, startingCity: '' }).find(
										({ startingCity }) => startingCity === label,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="grandCompany-select">Grand Company</label>
					<select
						id="grandCompany-select"
						value={selectedFilter.grandCompany}
						onChange={(e) =>
							setSelectedFilter({
								...selectedFilter,
								grandCompany: e.target.value,
							})
						}
					>
						<option value="">All</option>
						{grandCompanies.map(({ label }) => (
							<option
								key={label}
								value={label}
								disabled={
									!filterData({ ...selectedFilter, grandCompany: '' }).find(
										({ grandCompany }) => grandCompany === label,
									)
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="roles-select">Job/Class Role</label>
					<select
						id="roles-select"
						value={selectedFilter.role}
						onChange={(e) =>
							setSelectedFilter({ ...selectedFilter, role: e.target.value })
						}
					>
						<option value="">All</option>
						{roles.map(({ label, startIndex, endIndex }) => (
							<option
								key={label}
								value={label}
								disabled={
									filterData({ ...selectedFilter, role: '' })
										.map(({ levels }) =>
											levels
												.slice(startIndex, endIndex)
												.reduce((a, b) => a + b),
										)
										.reduce((a, b) => a + b) === 0
								}
							>
								{label}
							</option>
						))}
					</select>
				</div>
				<button
					onClick={() =>
						setSelectedFilter({
							gender: '',
							race: '',
							clan: '',
							guardian: '',
							startingCity: '',
							grandCompany: '',
							role: '',
						})
					}
				>
					Reset Filter
				</button>
			</div>
			<h2>Charts</h2>
			<div className="charts">
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Gender Distribution"
				>
					{makeChartTitle('Gender Distribution')}
					<Pie
						data={genders.map(({ label, code, color }) => ({
							name: label,
							value: data.filter((d) => d.gender === code).length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Race Distribution"
				>
					{makeChartTitle('Race Distribution')}
					<Pie
						data={races.map(({ label, color }) => ({
							name: label,
							value: data.filter((d) => d.race === label).length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Clan Distribution"
				>
					{makeChartTitle('Clan Distribution')}
					<Pie
						data={clans.map(({ label, color }) => ({
							name: label,
							value: data.filter(({ clan }) => clan === label).length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Guardian Distribution"
				>
					{makeChartTitle('Guardian Distribution')}
					<Pie
						data={guardians.map(({ label, short, color }) => ({
							name: short,
							value: data.filter(({ guardian }) => guardian === label).length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Starting City Distribution"
				>
					{makeChartTitle('Starting City Distribution')}
					<Pie
						data={startingCities.map(({ label, color }) => ({
							name: label,
							value: data.filter(({ startingCity }) => startingCity === label)
								.length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Grand Company Distribution"
				>
					{makeChartTitle('Grand Company Distribution')}
					<Pie
						data={grandCompanies.map(({ label, color }) => ({
							name: label,
							value: data.filter(({ grandCompany }) => grandCompany === label)
								.length,
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Job and Class Level Aggregate by Role"
				>
					{makeChartTitle('Job/Class Level Aggregate by Role')}
					<Pie
						data={roles.map(({ label, startIndex, endIndex, color }) => ({
							name: label,
							value: data
								.map(({ levels }) =>
									levels.slice(startIndex, endIndex).reduce((a, b) => a + b),
								)
								.reduce((a, b) => a + b),
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
				<PieChart
					width={CHART_WIDTH}
					height={CHART_HEIGHT}
					title="Job and Class Level Aggregate"
				>
					{makeChartTitle('Job/Class Level Aggregate')}
					<Pie
						data={jobs.map(({ label, index, color }) => ({
							name: label,
							value: data
								.map(({ levels }) => levels[index])
								.reduce((a, b) => a + b),
							fill: color,
						}))}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={OUTER_RADIUS}
						label={getLabel}
						labelLine={false}
						animationDuration={ANIMATION_DURATION}
						stroke="none"
					/>
					<Tooltip />
				</PieChart>
			</div>
			<h2>Insights</h2>
			<ul className="insights">
				<li>
					The most popular race across all members of the FC is{' '}
					<b>{mostPopularRace}</b>.
					<ul>
						<li>
							The most popular race among <b>male</b> characters is{' '}
							<b>{mostPopularMaleRace}</b>.
						</li>
						<li>
							The most popular race among <b>female</b> characters is{' '}
							<b>{mostPopularFemaleRace}</b>.
						</li>
					</ul>
				</li>
				<li>
					The most popular guardian across all members of the FC is{' '}
					<b>{mostPopularGuardian}</b>.
					<ul>
						<li>
							The most popular guardian among <b>male</b> characters is{' '}
							<b>{mostPopularMaleGuardian}</b>.
						</li>
						<li>
							The most popular guardian among <b>female</b> characters is{' '}
							<b>{mostPopularFemaleGuardian}</b>.
						</li>
					</ul>
				</li>
				{missingClans && (
					<li>
						Missing! The FC currently has no representation from the{' '}
						<b>{missingClans}</b>{' '}
						{missingClans.includes('&') ? 'clans' : 'clan'}.
					</li>
				)}
				{endangeredSpecies && (
					<li>
						Endangered species? The FC only has one{' '}
						{endangeredSpecies.includes('&') ? 'each of the ' : ''}
						<b>{endangeredSpecies}</b> remaining.
					</li>
				)}
			</ul>
			<aside>
				<p>Last updated February 10, 2025.</p>
			</aside>
		</>
	);
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
