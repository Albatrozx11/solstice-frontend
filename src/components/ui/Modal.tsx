import { useState } from "react";
interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (portfolioName: string) => void;
}
const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit }) => {
  const [portfolioName, setPortfolioName] = useState("");

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    if (portfolioName) {
      onSubmit(portfolioName); // Pass the portfolio name back to the parent component
      onClose(); // Close the modal after submission
    } else {
      alert("Please enter a portfolio name.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Create Portfolio</h2>
        <label className="block font-semibold mb-2">Portfolio Name:</label>
        <input
          type="text"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          className="border border-gray-400 p-2 w-full mb-4"
          placeholder="Enter portfolio name"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
