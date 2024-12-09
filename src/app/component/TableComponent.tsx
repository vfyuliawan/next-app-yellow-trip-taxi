"use client";

interface TableComponentProps {
    headTable: string[];
    bodyTable: (string | number)[][];
    onEdit?: (rowIndex: number) => void; // Callback for Edit
    onDelete?: (rowIndex: number) => void; // Callback for Delete
    onView?: (rowIndex: number) => void; // Callback for View
  }
  
  const TableComponent = (props: TableComponentProps) => {
    return (
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.headTable.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.bodyTable.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                  rowIndex % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""
                }`}
              >
                {row.map((cell, cellIndex) => {
                  if (props.headTable[cellIndex] === "Action") {
                    return (
                      <td key={cellIndex} className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => props.onView && props.onView(rowIndex)}
                          className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => props.onEdit && props.onEdit(rowIndex)}
                          className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => props.onDelete && props.onDelete(rowIndex)}
                          className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td key={cellIndex} className="px-6 py-4">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableComponent;
  