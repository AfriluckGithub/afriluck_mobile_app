const Banner = ({ image }) => {
  return (
    <div className="my-6">
      <img
        src={image}
        alt="Afriluck Lotto"
        className="w-full h-full object-fill rounded-xl"
      />
    </div>
  );
};

export default Banner;
