import '../output.css';

import Game from '../components/game';
import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient()

export default function Content() {
    return (
        <QueryClientProvider client={queryClient}>
            <Body />
        </QueryClientProvider>
    )
}

const fetchGames = async () => {
    const response = await axios.get('http://localhost:1337/api/games', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer 4017f7e2a97c43ef15f6aa5fba87f89cfe0a6dcb92dd2016848132af7bf19f4917c81c8d2b28ff67c03574e0c036c298f9b54b6326975eb692fad26017419f1764cb1ee17abd4d65525af2db3e0f052bb4236aa33a0b02cde0abea1ff2ca928cc66594b73c5f35b3cbedcd605b7ee03ed1e1a0eeccb16763de5bcb97e08700b9`,
            'Content-Type': 'application/json',
        },
    });
    return response.data.data;
}

const Body = ({ title, image, subtitle }) => {

    //const [games, setGames] = useState([]);

    const { data: games, error ,isLoading, refetch } = useQuery('games', fetchGames,  {
        enabled: true
    });

    console.log("data => ", games);

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="bg-white rounded-xl h-300 p-5 mt-5 mb-5">
            <div className="grid grid-cols-2 gap-2">
                <div style={{ color: '#156064' }} className="global-text-color font-semibold text-md"><p>Afriluck 6/57</p></div>
                <div className="text-right text-gray-800 font-inter font-semibold"><p>{title}</p></div>
            </div>
            <div className='flex flex-row justify-start items-center'>
                {games.map((game) => (
                    <Game image={game.imageUrl} title={subtitle} subtitle={game.name} />
                ))}
            </div>
        </div>
    );
}