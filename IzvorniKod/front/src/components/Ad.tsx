const Ad = ({
    imageUrl,
    textContent,
  }: {
    imageUrl: string;
    textContent: string;
  }) => {
    return (
      <div className="p-4 bg-[rgb(83,94,109)] rounded-lg shadow-md hidden md:block">
        <div className="text-sm lg:text-lg flex items-center justify-start text-white font-medium">
          <span>Sponsored Ad</span>
        </div>
  
        <div className="flex flex-col mt-4">
            {/* Slika sa dinamičkom širinom */}
            <div className="relative w-full max-w-screen-lg mx-auto">
                <img
                src={imageUrl}
                alt="Ad image"
                className="rounded-lg object-cover w-full"
                />
            </div>
  
            {/* Tekst ispod slike */}
            <p className="text-white font-semibold mt-4 text-sm lg:text-base text-center">
                {textContent}
            </p>
        </div>
      </div>
    );
};
  
export default Ad;