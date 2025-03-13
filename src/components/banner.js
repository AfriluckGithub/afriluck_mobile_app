const Banner = ({ image }) => {
  return (
    <div className="my-6">
      <img
        src={image}
        alt="Afriluck Lotto"
        loading="eager"
        decoding="async"
        width={1920}
        height={600}
        className="lg:w-screen md:w-auto sm:w-96 h-full object-fill rounded-xl"
      />
    </div>
  );
};

export default Banner;
