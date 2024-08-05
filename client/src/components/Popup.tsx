import React from "react";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  continent: string;
}

const Popup: React.FC<PopupProps> = ({
  show,
  onClose,
  id,
  firstName,
  lastName,
  birthDate,
  continent,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Infomacje o użytkowniku</h2>
        <div className="mb-4">
          <p>
            <span className="font-bold">ID:</span> {id}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Imię:</span> {firstName}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Nazwisko:</span> {lastName}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Data Urodzenia:</span> {birthDate}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Kontynent:</span> {continent}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
