import { DataType } from "@/interfaces";

const Table = ({ data }: { data: DataType }) => {
  // Extract the column names dynamically from the data
  const columnTitles = Object.keys(data);

  // Get the number of rows by checking the length of the first column
  const rowCount = Object.keys(data[columnTitles[0]]).length;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {/* Render column headers */}
            {columnTitles.map((title, index) => (
              <th key={index} className="capitalize text-white">
                {title.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows dynamically */}
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="hover">
              {columnTitles.map((title, colIndex) => (
                <td key={colIndex}>
                  {/* Format numbers as currency if they are numeric, otherwise just display the text */}
                  {typeof data[title][rowIndex] === "number"
                    ? `$${data[title][rowIndex].toLocaleString()}`
                    : data[title][rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
