import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './../output.css'

const SingleGame = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate('/')
    }

    const placeBet = () => {
        navigate('/single_game_selection')
    }
    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
                <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
                    <div className="flex flex-row gap-10 items-center">
                        <div onClick={back} className=""><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="font-normal text-md font-Poppins">Monday Morning</div>
                    </div>
                </div>
                <div className="bg-white h-28 w-full p-5 rounded-lg mb-10">
                    <div className="flex flex-col">
                        <span className='font-semibold text-md mb-5 font-Poppins'>Draw</span>
                        <span className='font-normal text-sm font-Poppins'>Mon 17/10/2024 10:00 AM</span>
                    </div>
                </div>
                <div className="bg-white h-28 w-full p-5 rounded-lg">
                    <div className="flex flex-row">
                        <span className='font-semibold text-md font-Poppins'>Selections</span>
                    </div>
                </div>
            </div>
            <footer className="flex items-center bg-white h-28 p-5 m-5 rounded-lg absolute bottom-0 left-0 right-0">
                <div className='flex flex-row gap-10 w-full'>
                    <div>
                        <button className='bg-red-500 hover:bg-red-700 text-white h-12 w-14 rounded-xl font-bold'>Auto</button>
                    </div>
                    <div className='flex flex-col flex-grow'>
                        <p className='font-normal text-md'>Total</p>
                        <p className='font-semibold text-md'>GHS 5</p>
                    </div>
                    <div className='flex float-end'>
                        <button onClick={placeBet} className='bg-gray-200 hover:bg-red-700 text-gray-600 h-12 w-24 rounded-xl font-bold'>Place Bet</button>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default SingleGame;