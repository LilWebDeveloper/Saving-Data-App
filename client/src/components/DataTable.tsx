import { useEffect, useState } from "react";
import { TableItems } from "../interfaces/TableItems";

const DataTable: React.FC = () => {
  const [items, setItems] = useState<TableItems[]>([]);
  const [itemIsEmpty, setItemIsEmpty] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/form")
      .then((res) => res.json())
      .then((result) => {
        const data = result.users;
        setItems(data.reverse());
      });

    if (items.length === 0) {
      setItemIsEmpty(false);
    } else {
      setItemIsEmpty(true);
    }
  }, [items.length]);

  return (
    <>
      {itemIsEmpty ? (
        <div className="container mx-auto text-center pt-12">
          <h1 className="text-2xl font-bold mb-4">Dodani użytkownicy</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  Imię
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  Nazwisko
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  Data Urodzenia
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  Kontynent
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  Usuń Dane
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {row.Imie}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {row.Nazwisko}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {row.DataUrodzenia}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {row.Kontynent}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={async () => {
                        await fetch(
                          `http://localhost:5050/api/form/${row.id}`,
                          {
                            method: "DELETE",
                          }
                        );
                        window.location.reload();
                      }}
                      type="submit"
                      className={`h-5 rounded-md bg-indigo-600 px-2 py-0 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center pt-10">Dodaj dane poprzez formularz</p>
      )}
    </>
  );
};

export default DataTable;
