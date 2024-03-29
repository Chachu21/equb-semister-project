import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="container py-5 mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2">
            <div className="md:max-w-md space-y-8">
              <div className="w-12 h-12 bg-[#008B8B] rounded-full" />
              <h1 className="text-3xl  font-bold text-[#1F284F] dark:text-white md:text-4xl">
                Empowering Collective Prosperity In Digital Age
              </h1>
              <p className="mt-3 text-[20px] font-medium text-gray-600 dark:text-gray-400">
                The Equb System redefines savings in the digital era, fostering
                collective prosperity through democratized access and community
                collaboration, reshaping financial cooperation.
              </p>
              <div className="w-8 float-right h-8 bg-[#008B8B] rounded-full" />

              <Link to={"/register"}>
                <button className=" flex justify-end items-center w-fit px-5 py-2 mt-6 text-md tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#008B8B] rounded-md md:w-auto hover:bg-[#7da7a7] focus:outline-none focus:bg-[#7da7a7]">
                  Get started Now !
                </button>
              </Link>
            </div>
          </div>
          {
            //change the image after finish dashbord
          }
          <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            <img
              className="w-full h-full md:max-w-3xl"
              src="https://merakiui.com/images/components/Catalogue-pana.svg"
              alt="Catalogue-pana.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
