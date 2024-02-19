interface serviceCardProps {
  title: string;
  content: string;
  url: string;
}
// Example of a service card component in React using TailwindCSs

const ServiceCard = (props: serviceCardProps) => {
  return (
    <div className="my-16">
      <div className="w-[250px] shadow-lg border-gray-50 border-2 bg-white h-[250px] -rotate-45 rounded-[18px]">
        <div className="flex flex-col justify-center items-center space-y-2 m-6 px-8 w-[250px] rotate-45">
          <img
            src={props.url}
            alt="icon"
            className="w-10 h-10 bg-gray-50 object-cover rounded-full"
          />
          <h2 className="text-2xl font-bold text-[#1F284F]">{props.title}</h2>
          <p className="text-sm leading-6 text-gray-500 font-normal ">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
