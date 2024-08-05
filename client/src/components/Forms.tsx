import { useEffect, useRef, useState } from "react";
import Datepicker from "./Datepicker";
import Alert from "./Alert";
import { ContinentType } from "../interfaces/Continent";

function Forms() {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [continents, setContinents] = useState<ContinentType[]>([]);

  const [secondNameIsValid, setSecondNameIsValid] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);

  const firstName = useRef<HTMLInputElement>(null);
  const secondName = useRef<HTMLInputElement>(null);
  const continent = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/continent")
      .then((res) => res.json())
      .then((result) => {
        const data = result.continent;
        setContinents(data);
      });
  }, []);

  const today = new Date();
  let isDateValid: boolean = true;
  if (selectedDate === undefined) {
    isDateValid = true;
  } else if (selectedDate <= today) {
    isDateValid = false;
  }

  if (selectedDate !== undefined) {
    const todays = new Date();

    let birthDate = todays.getFullYear() - selectedDate!.getFullYear() || 0;

    let m = todays.getMonth() - selectedDate!.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < selectedDate!.getDate())) {
      birthDate--;
    }

    if (birthDate >= 60) {
      let root = document.documentElement;
      root.style.setProperty("font-size", "larger");
    } else if (birthDate < 60) {
      let root = document.documentElement;
      root.style.setProperty("font-size", "medium");
    }
  }

  const showAlert = () => {
    setAlert({
      message: "Data has been added to the database",
      type: "success",
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const enteredFirstName = firstName.current?.value;
    const enteredSecondName = secondName.current?.value;
    const enteredContinent = continent.current?.value;

    const firstNameValid = enteredFirstName!.length > 0;

    if (!firstNameValid) {
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }

    if (enteredContinent === "Afryka" && enteredSecondName!.length < 2) {
      setSecondNameIsValid(true);
    } else if (
      (enteredContinent === "Afryka" && enteredSecondName!.length >= 2) ||
      enteredContinent !== "Afryka"
    ) {
      setSecondNameIsValid(false);
    }

    const formData = {
      Imie: enteredFirstName,
      Nazwisko: enteredSecondName,
      DataUrodzenia: selectedDate?.toLocaleString().split(",")[0],
      Kontynent: enteredContinent,
    };

    if (
      firstNameValid &&
      ((enteredContinent === "Afryka" && enteredSecondName!.length >= 2) ||
        enteredContinent !== "Afryka")
    ) {
      fetch("http://localhost:5050/api/form", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());

      showAlert();

      const reload = () => {
        window.location.reload();
      };

      setTimeout(reload, 1600);
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={submit}>
        <div className="border-b border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
            PODAJ DANE PERSONALNE
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="Imie"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Imię
              </label>
              <div className="mt-2">
                <input
                  ref={firstName}
                  id="Imie"
                  name="Imie"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {firstNameIsValid && (
                <p className="text-red-900">To pole jest wymagane</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Nazwisko"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nazwisko
              </label>
              <div className="mt-2">
                <input
                  ref={secondName}
                  id="Nazwisko"
                  name="Nazwisko"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Data Urodzenia"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Data urodzenia
              </label>
              <Datepicker value={selectedDate} onChange={setSelectedDate} />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Kontynent"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kontynent
              </label>
              <div className="mt-2">
                <select
                  ref={continent}
                  id="Kontynent"
                  name="Kontynent"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {continents.map((option) => (
                    <option
                      key={option.id}
                      value={option.Kontynent}
                      id={option.id}
                    >
                      {option.Kontynent}
                    </option>
                  ))}
                </select>
              </div>
              {secondNameIsValid && (
                <p className="text-red-900">Nie spełnione kryteria</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            disabled={isDateValid}
            type="submit"
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isDateValid
                ? "bg-gray-400 px-3 py-2 rounded-md cursor-not-allowed opacity-50 hover:bg-red-500"
                : ""
            }`}
          >
            Dodaj
          </button>
        </div>
      </form>
    </>
  );
}
export default Forms;
