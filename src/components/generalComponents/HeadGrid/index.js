import React from "react";
import "./HeadGrid.css";
import { MainContext } from "../MainContext";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function HeadGrid(props) {
  const [orderTableIcon, setOrderTableIcon] = React.useState('');
  const { orderTable, setOrderTable, selectedColumn, setSelectedColumn } =
    React.useContext(MainContext);

  const orderTableButton = (headId) => {
    setSelectedColumn(headId);
    if (orderTable === props.column) {
      setOrderTable(`-` + props.column);
      setOrderTableIcon(<KeyboardArrowUpIcon />);
    } else {
      setOrderTable(props.column);
      setOrderTableIcon(<KeyboardArrowDownIcon />);
    }
  };
  return (
    <th className="HeadGrid-button" onClick={() => orderTableButton(props.id)}>
      {props.value} {selectedColumn === props.id && orderTableIcon}
    </th>
  );
}

export { HeadGrid };
