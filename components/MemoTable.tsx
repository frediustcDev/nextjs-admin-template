import * as React from "react";
import { IMemoTableProps } from "../utils";

const MemoTable: React.FC<IMemoTableProps> = ({ data, columns }) => {
  console.log(columns);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          console.log(item);

          return (
            <tr>
              {columns.map((col) => {
                console.log(item[col.key]);
                return <td key={item.key + col.key}>{item[col.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MemoTable;
