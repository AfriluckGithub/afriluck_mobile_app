import { useNavigate } from 'react-router-dom';


const Game = ({title, image, subtitle}) => {

    const navigate = useNavigate();

    const handleCurrentGame = () => {
        navigate('/single_game')
    }
    
    return (
        <div onClick={handleCurrentGame} className="grid grid-row-3 gap-4 m-1 bg-gray-100 rounded-lg p-2 mt-5 w-auto h-24 justify-center items-center hover:bg-green-100 focus:bg-green-100">
            <img className="flex flex-row h-10 w-20" src={image}/>
            <p className="font-normal text-center text-wrap text-xs">{subtitle}</p>
        </div>
    )
}

export default Game;