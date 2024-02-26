import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../components/SampleEqubCard";

interface EqubType {
  _id: string;
  amount_of_deposit: number;
  equb_type_id: string;
  total_Members: number;
  status: string;
  createdAt: Date;
}

const SampleEqubGroup = () => {
  const [equbType, setEqubType] = useState<EqubType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5003/api/v1/groups/search`,
        {
          params: {
            page: 1,
            pageSize,
            sort: "-createdAt",
          },
        }
      );
      setEqubType(response.data.searchResult);
    } catch (error) {
      console.log("Failed to fetch equbType data:", error);
    }
  };

  const handleNext = async () => {
    if (currentIndex + pageSize < equbType.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/groups/search`,
          {
            params: {
              page: Math.floor(equbType.length / pageSize) + 1,
              pageSize,
              sort: "-createdAt",
            },
          }
        );
        setEqubType((prevEqubType) => [
          ...prevEqubType,
          ...response.data.searchResult,
        ]);
        setCurrentIndex(0); // Reset currentIndex to 0
      } catch (error) {
        console.log("Failed to fetch equbType data:", error);
      }
    }
  };

  const handlePrev = async () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/groups/search`,
          {
            params: {
              page: 1,
              pageSize,
              sort: "-createdAt",
            },
          }
        );
        setEqubType([...response.data.searchResult, ...equbType]);
        setCurrentIndex(0); // Reset currentIndex to 0
      } catch (error) {
        console.log("Failed to fetch equbType data:", error);
      }
    }
  };

  return (
    <div className="pt-20 px-[50px]">
      <div className="h-32 bg-[#008B8B] rounded-lg flex justify-center items-center mb-6 py-32">
        <h1 className="text-white text-4xl font-bold capitalize">
          Let's join an equb group for Saving together!
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 m-auto sm:mx-[50px] pb-10 relative">
        <div className="w-[90%]">
          {" "}
          {/* Adjust the width of the carousel here */}
          <Carousel
            showArrows={false}
            emulateTouch={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            transitionTime={2000}
            infiniteLoop={true}
            stopOnHover={false}
          >
            <div className="grid grid-cols-3 gap-8" key="carousel-grid">
              {equbType
                .slice(currentIndex, currentIndex + pageSize)
                .map((equbItem) => (
                  <Card
                    key={equbItem._id}
                    amount={equbItem.amount_of_deposit}
                    equb_type_id={equbItem.equb_type_id}
                    No_member={equbItem.total_Members}
                    createdAt={equbItem.createdAt}
                    equb_Group_id={equbItem._id}
                  />
                ))}
            </div>
          </Carousel>
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SampleEqubGroup;
