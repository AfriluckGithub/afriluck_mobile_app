import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './../output.css'

const SingleGamePaymentCheckStatus = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate('/single_game_payment')
    }

    return (
        <>
            <div className="flex flex-col w-full h-screen p-5">
                <div className=" h-16 w-full p-5 rounded-lg">
                    <div className="flex flex-row gap-10 items-center">
                        <div onClick={back} className=""><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="font-normal text-md font-Poppins">Payment</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-full w-full p-5 rounded-lg">
                        <img className='h-20 w-20' src='check.png' alt='check'/>
                        <p className='font-Poppins font-semibold mb-2'>Success</p>
                        <p className='text-center text-sm'>
                        Congratulations in advance. Thanks for your contribution. For any prize below GHS 12,000.00, wins will be redeemed instantly to your wins account. For any prize equal or above GHS 12,000.00, Please contact Afriluck for verification
                        </p>
                </div>
            </div>
            <footer className="flex flex-col h-28 m-5 absolute bottom-auto left-0 right-0">
                <div className='flex flex-row w-auto mt-10'>
                    <button style={{backgroundColor: '#156064'}} className='text-white font-bold rounded-lg w-full h-12'>Okay</button>
                </div>
            </footer>
        </>
    )
}

export default SingleGamePaymentCheckStatus;