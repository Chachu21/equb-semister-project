interface StatusCardProps {
  status: string;
  count: number;
  imageSrc: string;
  onClick: (status: string) => void;
}

const StatusCard = ({ status, count, imageSrc, onClick }: StatusCardProps) => {
  return (
    <div
      className="bg-white rounded-md border border-gray-100 p-6 mt-5 shadow-md shadow-black/5"
      onClick={() => onClick(status)}
    >
      <div className="flex flex-col items-center justify-center relative">
        <img src={imageSrc} alt={status} className="w-40 h-40 " />
        <div className="text-2xl font-semibold mb-1 absolute -top-5 left-1/2 text-[#0920CE]">
          {count}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
