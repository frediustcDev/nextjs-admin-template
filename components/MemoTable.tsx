import * as React from "react";

interface IMemoTableColumn {
  key: string;
  title: string;
}

interface IMemoTableData {
  key: string;
  [columnKey: string]: any;
}

interface IMemoTableProps {
  columns: IMemoTableColumn[];
  data: IMemoTableData[];
}

const MemoTable: React.FC<IMemoTableProps> = ({
  data: dataProps,
  columns: columnsProps,
}) => {
  const data = React.useMemo(() => dataProps, []);

  const columns = React.useMemo(() => columnsProps, []);

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
