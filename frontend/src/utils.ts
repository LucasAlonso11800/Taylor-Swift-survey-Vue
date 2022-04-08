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

export function generateOptions(isAlbum: boolean, str: string) {
    return ({
        animation: false,
        plugins: {
            title: {
                display: true,
                text: isAlbum ? `${str} albums` : `${str} songs`,
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