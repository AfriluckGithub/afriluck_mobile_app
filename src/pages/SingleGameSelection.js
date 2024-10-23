import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './../output.css'
import { useState, useRef } from 'react'

const SingleGameSelection = () => {

    const [show, setShow] = useState(false);
    const nodeRef = useRef(null)

    const navigate = useNavigate()

    const back = () => {
        navigate('/single_game')
    }

    const handlePaymentScreen = () => {
        navigate('/single_game_payment')
    }

    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
                <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
                    <div className="flex flex-row gap-10 items-center">
                        <div onClick={back} className=""><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="font-normal text-md font-Poppins">Direct 1</div>
                    </div>
                </div>
                <div className="flex bg-white h-18 w-full p-5 rounded-lg">
                    <span className='font-semibold text-md mb-2 font-Poppins'>Previous Draw Results</span>
                    <span className='font-normal text-md font-Poppins ml-auto'><FontAwesomeIcon onClick={() => setShow(!show)} icon={faChevronDown} /></span>
                </div>

                {show ?
                    <div className='flex bg-white h-auto w-full p-5'>
                        <div className='flex flex-row bg-gray-100 w-full h-auto p-5 rounded-lg'>
                            <div className='flex flex-col w-auto'>
                                <p className='font-Poppins font-semibold text-sm'>Draw 147</p>
                                <p className='font-Poppins font-normal text-sm'>22/10/2024</p>
                            </div>
                            <div className='flex w-full h-full justify-center items-center'>
                                <p className='font-semibold text-sm ml-auto'>46 70 76 24 84 30</p>
                            </div>
                        </div>
                    </div> :
                    <div></div>}

                <div className="bg-white h-28 w-full p-5 mt-5 rounded-lg">
                    <div className="flex flex-row">
                        <span className='font-normal text-gray-400 text-sm'>
                            <p className='font-Poppins'>
                                Please pick at least 1 number from 01 to 57 OR pick random combinations by pressing the Autofill button
                            </p>
                        </span>
                    </div>
                </div>
            </div>
            <footer className="flex flex-col h-auto m-5 absolute bottom-auto left-0 right-0">
                <div className='flex flex-row gap-10 w-full bg-white rounded-lg p-5 '>
                    <div className='flex flex-col flex-grow'>
                        <p className='font-normal text-md font-Poppins'>Bet Amount</p>
                        <p className='font-bold text-xl'>
                            <button className='bg-gray-300 hover:bg-red-700 text-black h-8 w-10 rounded-xl font-normal mr-1 text-sm'>-</button>
                            <button className='bg-gray-300 hover:bg-red-700 text-black h-8 w-10 rounded-xl font-normal mr-1 text-sm'>0</button>
                            <button className='bg-gray-300 hover:bg-red-700 text-black h-8 w-10 rounded-xl font-normal text-sm'>+</button>
                        </p>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='font-normal text-md'>Total</p>
                        <p className='font-semibold text-md'>GHS 5</p>
                    </div>
                </div>
                <div className='flex flex-row w-auto mt-10'>
                    <button onClick={handlePaymentScreen} className='bg-gray-200 text-gray-600 font-bold rounded-lg w-full h-12'>Confirm</button>
                </div>
            </footer>
        </>
    )
}

export default SingleGameSelection;