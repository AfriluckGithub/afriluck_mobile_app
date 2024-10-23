import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './../output.css'

const SingleGamePayment = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate('/single_game_selection')
    }

    const moveToCheckPaymentStatuds = () => {
        navigate('/single_game_status')
    }

    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
                <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
                    <div className="flex flex-row gap-10 items-center">
                        <div onClick={back} className=""><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="font-normal text-md font-Poppins">Payment</div>
                    </div>
                </div>
                <div className="flex bg-white h-18 w-full p-5 rounded-lg">
                        <span className='font-semibold text-md mb-2'>Monday Morning</span>
                        <span className='font-normal text-sm font-Poppins ml-auto'>Mon 22/10/2024</span>
                </div>
                <div className="bg-white h-20 w-full p-5 rounded-lg" style={{ backgroundColor: '#E4F5F6'}}>
                    <div className="flex flex-col text-gray-800 justify-center items-center">
                            <p className='font-Poppins text-md'>
                                <p>You will be charged</p>
                            </p>
                            <p className='font-Poppins font-bold text-xl'>
                                GHS 5.00
                            </p>
                    </div>
                </div>
                <div className="flex flex-col bg-white h-auto w-full p-5 rounded-lg mt-5">
                        <span>
                            <p className='font-md font-bold'>Select Channel</p>
                        </span>
                        <span className='flex flex-row flex-grow'>
                            <div className='flex flex-col bg-gray-300 h-20 w-24 mr-2 justify-center items-center'>
                                <img src='logo-pay-mtn-momo.png' alt='mtn'/>
                                <p className='text-xs'>MTN Momo</p>
                            </div>
                            <div className='flex flex-col bg-gray-300 h-20 w-24 mr justify-center items-center mr-2'>
                                <img src='logo-service-telecelbroadband.png' alt='telecel'/>
                                <p className='text-xs'>Telecel Cash</p>
                            </div>
                            <div className='flex flex-col bg-gray-300 h-20 w-24 justify-center items-center'>
                                <img src='logo-service-airteltigo.png' alt='at_money' />
                                <p className='text-xs'>AT Money</p>
                            </div>
                        </span>
                </div>
            </div>
            <footer className="flex flex-col h-28 absolute bottom-auto left-0 right-0">
                <div className='flex flex-row w-auto ml-5 mr-5'>
                    <button onClick={moveToCheckPaymentStatuds} style={{backgroundColor: '#156064'}} className='text-white font-bold rounded-lg w-full h-12'>Pay GHS 5.00</button>
                </div>
            </footer>
        </>
    )
}

export default SingleGamePayment;