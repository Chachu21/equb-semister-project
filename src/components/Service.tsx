import ServiceCard from "./ServiceCard";

const Service = () => {
           
    const cardData = [
      {
        title: "Saving",
        content:
          "Members contribute a fixed amount of money regularly into the equb pool, allowing them to save money over time.",
        url: "/SAVE.webp",
      },
      {
        title: "Credit",
        content:
          "Access to interest-free loans on a rotating basis, aiding in various financial needs.",
        url: "/SAVE.webp",
      },
      {
        title: "Financial Inclusion",
        content:
          " Provides banking-like services to individuals without access to traditional banks",
        url: "/SAVE.webp",
      },
      {
        title: "Social Support",
        content: " Fosters mutual assistance and solidarity among members",
        url: "/SAVE.webp",
      },
      {
        title: "Cultural and Social Benefits",
        content:
          "Preserves cultural traditions and strengthens social bonds within the community.",
        url: "/SAVE.webp",
      },
      //   {
      //     title: "Saving",
      //     content:
      //       "Members contribute a fixed amount of money regularly into the equb pool, allowing them to save money over time.",
      //     url: "/SAVE.webp",
      //   },
    ];
 return (
   <div className="sm:mx-[50px] sm:my-[10px] bg-white ">
     <h2 className="flex justify-center items-center my-5 pt-10 text-3xl text-[#1F284F] underline underline-offset-8">
       Our Services
     </h2>
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 place-content-center place-items-center ">
       {cardData.map((card) => (
         <ServiceCard title={card.title} content={card.content} url={card.url} />
       ))}
     </div>
   </div>
 );
};

export default Service;
