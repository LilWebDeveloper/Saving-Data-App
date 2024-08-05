import Popup from "./Popup";
import { useRef, useState } from "react";

const Search = () => {
  const userId = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);

  const submit = () => {
    const enteredUserId = userId.current?.value;
    fetch(`http://localhost:5050/api/form/${enteredUserId}`)
      .then((res) => res.json())
      .then((result) => {
        const data = result.users;
        setItems(data);
        if (typeof data.length === "number") {
          setShowPopup(false);
        } else {
          setShowPopup(true);
        }
      });
  };

  return (
    <>
      <div className="relative mt-11 p-3 border border-gray-200 rounded-lg w-full max-w-lg m-auto">
        <input
          ref={userId}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          type="text"
          className="rounded-md p-3 w-full"
          placeholder="Wyszukaj użytkowanika po ID"
        />

        <button
          onClick={() => submit()}
          type="submit"
          className="absolute right-6 top-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <Popup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        id={items.id}
        firstName={items.Imie}
        lastName={items.Nazwisko}
        birthDate={items.DataUrodzenia}
        continent={items.Kontynent}
      />
    </>
  );
};

export default Search;
