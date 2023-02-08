import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import PopupFilter from "./popupFilter.jsx";

const thColor = indigo[50];
const useStyles = makeStyles({
  base: {
    maxWidth: 900,
    margin: "auto"
  },
  table: {
    maxWidth: 500,
    margin: "40px auto 50px auto"
  },
  tableHead: {
    fontWeight: "bold",
    backgroundColor: thColor
  },
  textField: {
    margin: "30px 0 0 70px"
  },
  filterListIcon: {
    verticalAlign: "middle",
    marginLeft: "5px"
  }
});

function createData(id, name, placeFrom, placeTo) {
  return { id, name, placeFrom, placeTo };
}

const rows = [
  createData("1", "H", "東京", "信濃町"),
  createData("2", "Y", "埼玉", "信濃町"),
  createData("3", "M", "東京", "信濃町"),
  createData("4", "K", "埼玉", "拝島"),
  createData("5", "N", "東京", "拝島")
];

const getColumns = rows => {
  return {
    id: Array.from(new Set(rows.map(row => row.id))),
    name: Array.from(new Set(rows.map(row => row.name))),
    placeFrom: Array.from(new Set(rows.map(row => row.placeFrom))),
    placeTo: Array.from(new Set(rows.map(row => row.placeTo)))
  };
};

/* OR検索
const filterRows = (obj, rows) => {
  const filtered = rows.filter(row => {
    const keys = Object.keys(row);
    const matched = keys.filter(key => {
      return obj[key].some(item => {
        return (
          item !== "" && item != null && String(row[key]).indexOf(item) > -1
        );
      });
    });
    return matched.length !== 0;
  });
  return filtered;
};
*/
// AND検索
const filterRows = (obj, rows) => {
  const keys = Object.keys(obj);

  const filterRecursive = (keys, rows) => {
    if (keys.length === 0) return rows;

    if (obj[keys[0]].length === 0) {
      return filterRecursive(keys.slice(1), rows);
    }

    const filtered = rows.filter(row => {
      return obj[keys[0]].indexOf(row[keys[0]]) > -1;
    });

    return filterRecursive(keys.slice(1), filtered);
  };

  return filterRecursive(keys, rows);
};

export default function Content() {
  const classes = useStyles();
  const [checkedItems, setCheckedItems] = React.useState({
    id: [],
    name: [],
    placeFrom: [],
    placeTo: []
  });
  const [keywords, setKeywords] = React.useState({
    id: "",
    name: "",
    placeFrom: "",
    placeTo: ""
  });

  const filteredRows = filterRows(checkedItems, rows);
  const filteredColumns = getColumns(rows);

  return (
    <TableContainer component={Paper} className={classes.base}>
      <Table className={classes.table} aria-label="table-filterable">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell align="center">
              ID
              <PopupFilter
                stateCheckedItems={[checkedItems, setCheckedItems]}
                stateKeywords={[keywords, setKeywords]}
                // data={filteredColumns.id}
                columnName="id"
              />
            </TableCell>
            <TableCell align="center">
              NAME
              <PopupFilter
                stateCheckedItems={[checkedItems, setCheckedItems]}
                stateKeywords={[keywords, setKeywords]}
                data={filteredColumns.name}
                columnName="name"
              />
            </TableCell>
            <TableCell align="center">
              FROM
              <PopupFilter
                stateCheckedItems={[checkedItems, setCheckedItems]}
                stateKeywords={[keywords, setKeywords]}
                data={filteredColumns.placeFrom}
                columnName="placeFrom"
              />
            </TableCell>
            <TableCell align="center">
              TO
              <PopupFilter
                stateCheckedItems={[checkedItems, setCheckedItems]}
                stateKeywords={[keywords, setKeywords]}
                data={filteredColumns.placeTo}
                columnName="placeTo"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name} </TableCell>
              <TableCell align="center">{row.placeFrom}</TableCell>
              <TableCell align="center">{row.placeTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
