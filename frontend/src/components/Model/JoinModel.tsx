interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const Modal = ({ isOpen, onClose, onLogin }: ModalProps) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex container mx-auto items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-80" />
        <div className="relative flex flex-col items-center space-y-14 px-5  md:space-y-20 bg-gray-100 rounded-lg  w-full md:max-w-2xl h-[40vh]">
          <span
            className="absolute top-0 right-5 cursor-pointer hover:text-red-500 bg-white text-5xl"
            onClick={onClose}
          >
            &times;
          </span>
          <p className="mb-4 text-xl font-bold">
            Please login or sign up to continue!
          </p>
          <div className="flex justify-end space-x-10 md:space-x-20">
            <button
              onClick={onLogin}
              className="bg-[#008B8B] text-white px-4 py-2 rounded-lg text-center"
            >
              Login / Sign Up
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
