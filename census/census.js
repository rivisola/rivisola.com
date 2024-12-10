/**
 * @type {{
 *  race: string,
 *  clan: string,
 *  gender: string,
 *  guardian: string,
 *  startingCity: string,
 *  grandCompany: string,
 *  levels: number[],
 * }[]}
 */
let allData;
/** @type {{destroy: () => void}} */
let genderChart;
/** @type {{destroy: () => void}} */
let raceChart;
/** @type {{destroy: () => void}} */
let clanChart;
/** @type {{destroy: () => void}} */
let guardianChart
    /** @type {{destroy: () => void}} */;
let startingCityChart;
/** @type {{destroy: () => void}} */
let grandCompanyChart;
/** @type {{destroy: () => void}} */
let rolesChart;
/** @type {{destroy: () => void}} */
let jobsChart;

function generate() {
    const totalCount = allData.length;
    const totalCountText = document.getElementById("total-count");
    totalCountText.innerText = `${totalCount}`;
    const genderSelect = document.getElementById("gender-select");
    const genderText = genderSelect.options[genderSelect.selectedIndex].text;
    let data = [...allData];
    if (genderText !== 'All') {
        data = data.filter(x => x.gender === (genderText === 'Male' ? '♂' : '♀'));
    }
    const raceSelect = document.getElementById("race-select");
    const raceText = raceSelect.options[raceSelect.selectedIndex].text;
    if (raceText !== 'All') {
        data = data.filter(x => x.race === raceText);
    }
    const clanSelect = document.getElementById("clan-select");
    const clanText = clanSelect.options[clanSelect.selectedIndex].text;
    if (clanText !== 'All') {
        data = data.filter(x => x.clan === clanText);
    }
    const guardianSelect = document.getElementById("guardian-select");
    const guardianText = guardianSelect.options[guardianSelect.selectedIndex].text;
    if (guardianText !== 'All') {
        data = data.filter(x => x.guardian === guardianText);
    }
    const startingCitySelect = document.getElementById("startingCity-select");
    const startingCityText = startingCitySelect.options[startingCitySelect.selectedIndex].text;
    if (startingCityText !== 'All') {
        data = data.filter(x => x.startingCity === startingCityText);
    }
    const grandCompanySelect = document.getElementById("grandCompany-select");
    const grandCompanyText = grandCompanySelect.options[grandCompanySelect.selectedIndex].text;
    if (grandCompanyText !== 'All') {
        data = data.filter(x => x.grandCompany === grandCompanyText);
    }
    const rolesSelect = document.getElementById("roles-select");
    const rolesText = rolesSelect.options[rolesSelect.selectedIndex].text;
    switch (rolesText) {
        case 'Tank':
            data = data.map(x => ({
                ...x, levels: [
                    ...x.levels.slice(0, 4),
                    ...Array(29).fill(0),
                ]
            }));
            break;
        case 'Healer':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(4).fill(0),
                    ...x.levels.slice(4, 8),
                    ...Array(25).fill(0),
                ]
            }));
            break;
        case 'Melee':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(8).fill(0),
                    ...x.levels.slice(8, 14),
                    ...Array(19).fill(0),
                ]
            }));
            break;
        case 'Phys Ranged':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(14).fill(0),
                    ...x.levels.slice(14, 17),
                    ...Array(16).fill(0),
                ]
            }));
            break;
        case 'Magic Ranged':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(17).fill(0),
                    ...x.levels.slice(17, 22),
                    ...Array(11).fill(0),
                ]
            }));
            break;
        case 'DoH':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(22).fill(0),
                    ...x.levels.slice(22, 30),
                    ...Array(3).fill(0),
                ]
            }));
            break;
        case 'DoL':
            data = data.map(x => ({
                ...x, levels: [
                    ...Array(30).fill(0),
                    ...x.levels.slice(30, 33),
                ]
            }));
            break;
        case 'Any':
        default:
            break;
    }
    const filterText = document.getElementById('filter-text');
    filterText.innerText = data.length === totalCount
        ? ""
        : `${data.length} of ${totalCount} match the current filter criteria.`;

    genderChart?.destroy();
    const genderLabels = [
        {display: 'Male (♂)', code: '♂', color: 'rgb(96 165 250)'},
        {display: 'Female (♀)', code: '♀', color: 'rgb(244 114 182)'}
    ].filter(g => data.map(d => d.gender).includes(g.code));
    genderChart = new Chart(document.getElementById('gender-chart'), {
        type: 'pie',
        data: {
            labels: genderLabels.map(g => g.display),
            datasets: [{
                label: 'Members',
                data: genderLabels
                    .map(gender => data.filter(d => d.gender === gender.code).length),
                borderWidth: 0,
                backgroundColor: genderLabels.map(g => g.color),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Gender',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        },
    });
    const raceLabels = [
        {label: 'Hyur', color: 'rgb(248 113 113)'},
        {label: 'Elezen', color: 'rgb(251 146 60)'},
        {label: 'Lalafell', color: 'rgb(250 204 21)'},
        {label: 'Miqo\'te', color: 'rgb(74 222 128)'},
        {label: 'Roegadyn', color: 'rgb(34 211 238)'},
        {label: 'Au Ra', color: 'rgb(96 165 250)'},
        {label: 'Hrothgar', color: 'rgb(167 139 250)'},
        {label: 'Viera', color: 'rgb(232 121 249)'},
    ].filter(race => data.map(d => d.race).includes(race.label));
    raceChart?.destroy();
    raceChart = new Chart(document.getElementById('race-chart'), {
        type: 'pie',
        data: {
            labels: raceLabels.map(race => race.label),
            datasets: [{
                label: 'Members',
                data: raceLabels.map(race => data.filter(d => d.race === race.label).length),
                borderWidth: 0,
                backgroundColor: raceLabels.map(g => g.color),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Race',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        },
    });
    const clanLabels = [
        {label: 'Midlander', color: 'rgb(248 113 113)'},
        {label: 'Highlander', color: 'rgb(220 38 38)'},
        {label: 'Wildwood', color: 'rgb(251 146 60)'},
        {label: 'Duskwight', color: 'rgb(234 88 12)'},
        {label: 'Plainsfolk', color: 'rgb(250 204 21)'},
        {label: 'Dunesfolk', color: 'rgb(202 138 4)'},
        {label: 'Seeker of the Sun', color: 'rgb(74 222 128)'},
        {label: 'Keeper of the Moon', color: 'rgb(22 163 74)'},
        {label: 'Sea Wolf', color: 'rgb(34 211 238)'},
        {label: 'Hellsguard', color: 'rgb(8 145 178)'},
        {label: 'Raen', color: 'rgb(96 165 250)'},
        {label: 'Xaela', color: 'rgb(37 99 235)'},
        {label: 'Helions', color: 'rgb(167 139 250)'},
        {label: 'The Lost', color: 'rgb(124 58 237)'},
        {label: 'Rava', color: 'rgb(232 121 249)'},
        {label: 'Veena', color: 'rgb(192 38 211)'},
    ].filter(clan => data.map(d => d.clan).includes(clan.label));
    clanChart?.destroy();
    clanChart = new Chart(document.getElementById('clan-chart'), {
        type: 'pie',
        data: {
            labels: clanLabels.map(clan => clan.label),
            datasets: [{
                label: 'Members',
                data: clanLabels.map(clan => data.filter(d => d.clan === clan.label).length),
                borderWidth: 0,
                backgroundColor: clanLabels.map(g => g.color),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Clan',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        },
    });
    const guardianLabels = [
        {label: 'Halone, the Fury', color: 'rgb(34 211 238)'},
        {label: 'Menphina, the Lover', color: 'rgb(8 145 178)'},
        {label: 'Thaliak, the Scholar', color: 'rgb(96 165 250)'},
        {label: 'Nymeia, the Spinner', color: 'rgb(37 99 235)'},
        {label: 'Llymlaen, the Navigator', color: 'rgb(74 222 128)'},
        {label: 'Oschon, the Wanderer', color: 'rgb(22 163 74)'},
        {label: 'Byregot, the Builder', color: 'rgb(192 132 252)'},
        {label: 'Rhalgr, the Destroyer', color: 'rgb(147 51 234)'},
        {label: 'Azeyma, the Warden', color: 'rgb(248 113 113)'},
        {label: 'Nald\'thal, the Traders', color: 'rgb(220 38 38)'},
        {label: 'Nophica, the Matron', color: 'rgb(250 204 21)'},
        {label: 'Althyk, the Keeper', color: 'rgb(202 138 4)'},
    ].filter(guardian => data.map(d => d.guardian).includes(guardian.label));
    guardianChart?.destroy();
    guardianChart = new Chart(document.getElementById('guardian-chart'), {
        type: 'pie',
        data: {
            labels: guardianLabels.map(guardian => guardian.label),
            datasets: [{
                label: 'Members',
                data: guardianLabels.map(guardian => data.filter(d => d.guardian === guardian.label).length),
                borderWidth: 0,
                backgroundColor: guardianLabels.map(g => g.color),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Guardian',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        },
    });
    const startingCityLabels = [
        {label: 'Limsa Lominsa', color: 'rgb(248 113 113)'},
        {label: 'Ul\'dah', color: 'rgb(96 165 250)'},
        {label: 'Gridania', color: 'rgb(250 204 21)'},
    ].filter(startingCity => data.map(d => d.startingCity).includes(startingCity.label));
    startingCityChart?.destroy();
    startingCityChart = new Chart(document.getElementById('startingCity-chart'), {
        type: 'pie',
        data: {
            labels: startingCityLabels.map(city => city.label),
            datasets: [{
                label: 'Members',
                data: startingCityLabels.map(city => data.filter(d => d.startingCity === city.label).length),
                borderWidth: 0,
                backgroundColor: startingCityLabels.map(g => g.color),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Starting City',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        },
    });
    const grandCompanyLabels = [
        {label: 'Maelstrom', color: 'rgb(248 113 113)'},
        {label: 'Immortal Flames', color: 'rgb(96 165 250)'},
        {label: 'Order of the Twin Adder', color: 'rgb(250 204 21)'},
        {label: 'No Affiliation', color: 'rgb(156 163 175)'},
    ].filter(grandCompany => data.map(d => d.grandCompany).includes(grandCompany.label));
    grandCompanyChart?.destroy();
    grandCompanyChart = new Chart(document.getElementById('grandCompany-chart'), {
        type: 'pie',
        data: {
            labels: grandCompanyLabels.map(gc => gc.label),
            datasets: [{
                label: 'Members',
                data: grandCompanyLabels.map(gc => data.filter(d => d.grandCompany === gc.label).length),
                borderWidth: 0,
                backgroundColor: grandCompanyLabels.map(g => g.color),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Grand Company',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.length * 100)}%`,
                    },
                },
            },
        }
    });
    const rolesLabels = [
        {label: 'Tank', startIndex: 0, endIndex: 4, color: '#38bdf8'},
        {label: 'Healer', startIndex: 4, endIndex: 8, color: '#22c55e'},
        {label: 'Melee', startIndex: 8, endIndex: 14, color: '#f87171'},
        {label: 'Phys Ranged', startIndex: 14, endIndex: 17, color: '#f472b6'},
        {label: 'Magic Ranged', startIndex: 17, endIndex: 22, color: '#fb923c'},
        {label: 'DoH', startIndex: 22, endIndex: 30, color: '#a78bfa'},
        {label: 'DoL', startIndex: 30, endIndex: 33, color: '#facc15'},
    ].filter(role => data.map(d => d.levels.slice(role.startIndex, role.endIndex).reduce((a, b) => a + b)).reduce((a, b) => a + b) > 0);
    rolesChart?.destroy();
    rolesChart = new Chart(document.getElementById('roles-chart'), {
        type: 'pie',
        data: {
            labels: rolesLabels.map(role => role.label),
            datasets: [{
                label: 'Total Levels',
                data: rolesLabels.map(role => data.map(d => d.levels.slice(role.startIndex, role.endIndex).reduce((a, b) => a + b)).reduce((a, b) => a + b)),
                borderWidth: 0,
                backgroundColor: rolesLabels.map(role => role.color),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Accumulated Levels by Role',
                },
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.map(d => d.levels.reduce((a, b) => a + b)).reduce((a, b) => a + b) * 100)}%`,
                    },
                },
            },
        }
    });
    const jobLabels = [
        {label: 'PLD/GLA', index: 0, color: '#93c5fd'},
        {label: 'WAR/MRD', index: 1, color: '#60a5fa'},
        {label: 'DRK', index: 2, color: '#3b82f6'},
        {label: 'GNB', index: 3, color: '#2563eb'},
        {label: 'WHM/CNJ', index: 4, color: '#86efac'},
        {label: 'SCH', index: 5, color: '#4ade80'},
        {label: 'AST', index: 6, color: '#22c55e'},
        {label: 'SGE', index: 7, color: '#16a34a'},
        {label: 'MNK/PGL', index: 8, color: '#fecaca'},
        {label: 'DRG/LNC', index: 9, color: '#fca5a5'},
        {label: 'NIN/ROG', index: 10, color: '#f87171'},
        {label: 'SAM', index: 11, color: '#ef4444'},
        {label: 'RPR', index: 12, color: '#dc2626'},
        {label: 'VPR', index: 13, color: '#b91c1c'},
        {label: 'BRD/ARC', index: 14, color: '#f9a8d4'},
        {label: 'MCH', index: 15, color: '#f472b6'},
        {label: 'DNC', index: 16, color: '#ec4899'},
        {label: 'BLM/THM', index: 17, color: '#fed7aa'},
        {label: 'SMN/ARC', index: 18, color: '#fdba74'},
        {label: 'RDM', index: 19, color: '#fb923c'},
        {label: 'PCT', index: 20, color: '#f97316'},
        {label: 'BLU', index: 21, color: '#ea580c'},
        {label: 'CRP', index: 22, color: '#ddd6fe'},
        {label: 'BSM', index: 23, color: '#c4b5fd'},
        {label: 'ARM', index: 24, color: '#a78bfa'},
        {label: 'GSM', index: 25, color: '#8b5cf6'},
        {label: 'LTW', index: 26, color: '#7c3aed'},
        {label: 'WVR', index: 27, color: '#6d28d9'},
        {label: 'ALC', index: 28, color: '#5b21b6'},
        {label: 'CUL', index: 29, color: '#4c1d95'},
        {label: 'MIN', index: 30, color: '#fde047'},
        {label: 'BTN', index: 31, color: '#eab308'},
        {label: 'FSH', index: 32, color: '#ca8a04'},
    ].filter(job => data.map(d => d.levels[job.index]).reduce((a, b) => a + b) > 0);
    jobsChart?.destroy();
    jobsChart = new Chart(document.getElementById('jobs-chart'), {
        type: 'pie',
        data: {
            labels: jobLabels.map(x => x.label),
            datasets: [{
                label: 'Total Levels',
                data: jobLabels.map(job => data.map(d => d.levels[job.index]).reduce((a, b) => a + b)),
                borderWidth: 0,
                backgroundColor: jobLabels.map(job => job.color),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Accumulated Levels by Job/Class',
                },
                legend: jobLabels.length <= 8
                    ? {
                        position: 'right',
                    }
                    : false,
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => `${Math.round(tooltipItems[0].parsed / data.map(d => d.levels.reduce((a, b) => a + b)).reduce((a, b) => a + b) * 100)}%`,
                    },
                },
            },
        }
    });
}

fetch('/census/data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        allData = data;
        generate();
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });