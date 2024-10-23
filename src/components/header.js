import '../output.css';

const Header = () => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <div>
                <div style={{backgroundColor: '#156064'}} className='flex h-12 w-12 text-center text-white rounded-full font-semibold justify-center items-center'>
                    <p>KF</p>
                </div>
            </div>
            <div className="flex text-center font-semibold text-xl justify-center items-center">
                <p className=''>Home</p>
            </div>
            <div className='flex justify-end items-center'>
                <img src='bell.png'/>
            </div>
        </div>
    )
}

export default Header;