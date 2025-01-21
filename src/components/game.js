import { useNavigate } from 'react-router-dom';


const Game = ({title, image, subtitle, type}) => {

    const navigate = useNavigate();

    const handleCurrentGame = (e) => {
        localStorage.setItem("game_picked", subtitle);
        localStorage.setItem("game_type", type); 
        console.log(type);   
        //localStorage.setItem("", "");
        navigate('/single_game')
    }
    
    return (
        <div onClick={handleCurrentGame} className="flex flex-row gap-4 m-1 bg-gray-100 rounded-lg p-2 mt-5 w-24 h-24 justify-center items-center hover:bg-green-100 focus:bg-green-100">
            {/* <img className="flex flex-row h-10 w-20" src={image}/> */}
            <p className="font-normal text-center text-wrap text-xs">{subtitle}</p>
        </div>
    )
}

export default Game;