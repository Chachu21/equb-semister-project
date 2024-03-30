import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/EqubCard";
import { useNavigate } from "react-router-dom";

interface EqubType {
  _id: string;
  name: string;
  amount: number;
  types: string;
  member: number;
  status: string;
  createdOn: Date;
}

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SampleEqubGroup = () => {
  const navigate = useNavigate();

  const [equbType, setEqubType] = useState<EqubType[]>([]);
  const queries = {};

  //Fetch recently created  sample equb group

  useEffect(() => {
    const smapleGroup = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/group/get",
        {
          params: {
            ...queries,
            page: 1,
            pageSize: 5,
          },
        }
      );
      setEqubType(response.data.searchResult);
    };
    smapleGroup();
  }, [queries]);

  return (
    <div className="container mx-auto">
      <div className="h-32 bg-[#008B8B] rounded-lg flex justify-center items-center mb-6 py-32">
        <h1 className="text-white text-4xl font-bold capitalize text-center md:text-left">
          Let's join an equb group for Saving together!
        </h1>
      </div>
      <div className="container">
        <Slider {...settings}>
          {equbType.length > 0 &&
            equbType.map((equb) => (
              <div
                className=""
                key={equb._id}
                onClick={() => {
                  navigate("/group");
                }}
              >
                <Card
                  equb_Group_id={equb._id}
                  name={equb.name}
                  No_member={equb.member}
                  createdAt={equb.createdOn}
                  amount={equb.amount}
                  types={equb.types}
                  status={equb.status}
                />
              </div>
            ))}
          {equbType.length === 0 && (
            <div className="w-full md:container md:mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-3 ">
              Wait untill some one create group, go and create your group as you
              want
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default SampleEqubGroup;
