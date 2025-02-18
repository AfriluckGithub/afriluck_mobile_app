const Banner = ({ image }) => {
  return (
    <div className="my-6">
      <img
        src={image}
        alt="Afriluck Lotto"
        class="w-full h-auto object-fill rounded-xl"
      />
    </div>
  );
};

export default Banner;
