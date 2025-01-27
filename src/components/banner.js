const Banner = ({image}) => {
    return (
        <div className="m-5">
            <img src={image} alt="Afriluck Lotto" class="w-full h-48 object-contain" />
        </div>
    );
};

export default Banner;