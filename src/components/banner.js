const Banner = ({image}) => {
    return (
        <div className="m-5">
            <img src={image} alt="Afriluck Lotto" class="w-full h-auto object-fill rounded-lg" />
        </div>
    );
};

export default Banner;