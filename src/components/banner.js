const Banner = ({ image }) => {
  return (
    <div className="my-6">
      <img
        src={image}
        alt="Afriluck Lotto"
        loading="lazy"
        decoding="async"
        width="1500" 
        height="644"
        className="lg:w-screen md:w-auto sm:w-96 h-full object-fill rounded-xl"
      />
    </div>
  );
};

export default Banner;
