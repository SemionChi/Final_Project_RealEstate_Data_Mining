import axios from 'axios'
import { Item } from '../models/item';
import internal from 'stream';

export const predictPrice = async (props: Item) => {
    const headers = {
        'accept': 'application/json',
    };

    const request = axios.create({
        baseURL: 'http://127.0.0.1:8000/', data: props, headers: headers
    });

    const price = await request.post<Item, number>(`predict`, props);

    return price;
}