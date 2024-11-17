import { DataType } from "@/interfaces";

const Table = ({ data }: { data: DataType }) => {
  // Extract the column names dynamically from the data
  const columnTitles = Object.keys(data);

  // Get the number of rows by checking the length of the first column
  const rowCount = Object.keys(data[columnTitles[0]]).length;

  return (
    <div className="overflow-x-auto rounded-2xl bg-base-100">
      <table className="table w-full">
        <thead>
          <tr>
            {/* Render column headers */}
            {columnTitles.map((title, index) => (
              <th key={index} className="font-bold capitalize">
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
                  {typeof data[title][rowIndex] === "number" ? (
                    data[title][rowIndex] < 0 ? (
                      <span className="text-red-600">
                        $({Math.abs(data[title][rowIndex]).toLocaleString()})
                      </span>
                    ) : data[title][rowIndex] < 1900 ||
                      data[title][rowIndex] > 2100 ? (
                      `$${data[title][rowIndex].toLocaleString()}`
                    ) : (
                      data[title][rowIndex]
                    )
                  ) : (
                    data[title][rowIndex]
                  )}
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
