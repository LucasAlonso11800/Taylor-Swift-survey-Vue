import axios from 'axios';
import { AnswerType } from './types';

export function generateDatasets(labels: any[], arr: any[], str: string) {
    return ({
        labels: labels,
        datasets: [
            {
                label: `Most voted ${str} songs`,
                data: arr,
                borderColor: '#69b2db'
            }]
    })
}

export function generateOptions(str: string) {
    return ({
        animation: false,
        plugins: {
            title: {
                display: true,
                text: str,
                position: 'top',
                align: 'center',
                color: '#9a0036',
                font: {
                    size: '14px'
                }
            },
            legend: { display: false }
        }
    })
}

export async function getData(endpoint: string) {
    try {
        const result = await axios.get(`https://taylor-survey.herokuapp.com/${endpoint}`)
        return result.data
    }
    catch (err) {
        console.log(err);
    }
}

export async function answerQuestion(endpoint: string, body: AnswerType) {
    try {
        const result = await axios.post(`https://taylor-survey.herokuapp.com/${endpoint}`, body )
        return result.data
    }
    catch (err) {
        return err;
    }
}

export const getChartsTitle = (index: number): string => {
    switch (index) {
        case 0: return "Fearless";
        case 1: return "Speak Now";
        case 2: return "Red";
        case 3: return "1989";
        case 4: return "Reputation";
        case 5: return "Lover";
        case 6: return "folklore";
        case 7: return "evermore";
        case 8: return "Albums";
        default: return "";
    }
}