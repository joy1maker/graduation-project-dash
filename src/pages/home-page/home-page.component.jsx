import StausCard from "../../components/status-card/card.component";
import { CardsContainer, ChartsContainer, ChartContainer } from './home-page.styles'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'accounts of the users',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const barData = {
    labels,
    datasets: [
        {
            label: 'doctors accounts',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'paitents accounts',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const pieData = {
    labels: ['departments that have ML model', 'departments that don\'t have ML model'],
    datasets: [
        {
            label: '# of departments',
            data: [2, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const HomePage = () => {
    const cardsInfo = [
        {
            iconColor: "#f5365c",
            succsuesStaus: true,
            title: "customers",
            detail: "300",
            status: "3.48%",
            iconName: "users"
        },
        {
            iconColor: "yellow",
            succsuesStaus: false,
            title: "performance",
            detail: "60.5%",
            status: "13%",
            iconName: "percent"
        },
        {
            iconColor: "orange",
            succsuesStaus: true,
            title: "traffic",
            detail: "1000",
            status: "12%",
            iconName: "chart-bar"
        },

    ]
    return (
        <>
            <CardsContainer>
                {
                    cardsInfo.map((card, idx) => <StausCard key={idx} card={card} />)
                }
            </CardsContainer>
            <ChartsContainer>
                <ChartContainer>
                    <Doughnut data={pieData} />
                </ChartContainer>
                <ChartContainer style={{ width: "40%" }}>
                    <Bar options={options} data={barData} />
                </ChartContainer>
            </ChartsContainer>
        </>

    )
}
export default HomePage;