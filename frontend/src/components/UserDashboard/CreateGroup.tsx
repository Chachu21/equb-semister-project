const CreateGroup = () => {
  return (
    <div className="bg-gray-200 container mx-auto max-w-xl h-screen flex flex-col items justify-center">
      <div className="flex flex-col justify-center items-center bg-sky-200 p-3">
        <span className="text-2xl text-center font-semibold text-sky-950">
          create your equb group by filling the following form
        </span>
        <form className="flex flex-col space-y-5">
          <div className="space-y-1 flex flex-col">
            <label htmlFor="name">name</label>
            <input
              type="text"
              placeholder="please add equb name"
              className="border border-gray-400 p-3 rounded-lg"
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="type">equb type</label>
            <input
              type="text"
              placeholder="please add type"
              className="border border-gray-400 p-3 rounded-lg"
            />
          </div>

          <div className="space-y-1 flex flex-col">
            <label htmlFor="amount">Amount of payment</label>
            <input
              type="number"
              placeholder="please add amount "
              className="border border-gray-400 p-3 rounded-lg"
            />
          </div>
          <div className="space-y-1 flex flex-col pb-20">
            <label htmlFor="no_user">Number of users</label>
            <input
              type="number"
              placeholder="please add no_users"
              className="border border-gray-400 p-3 rounded-lg"
            />
          </div>
          <button className="flex justify-center items-center float-right bg-gray-700 text-white w-fit p-3 container mx-auto mt-20">
            create group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
