import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    display: "block"
  }
}));

const filterData = (keyword, data) => {
  return data.filter(data => {
    return String(data).indexOf(keyword) > -1;
  });
};

export default function FilterElement(props) {
  const classes = useStyles();
  //const [keyword, setKeyword] = React.useState("");
  const [checkedItems, setCheckedItems] = props.stateCheckedItems;
  const [keywords, setKeywords] = props.stateKeywords;
  const data = props.data;
  const columnName = props.columnName;

  const filteredData =
    keywords[columnName] === "" ? data : filterData(keywords[columnName], data);

  const handleCheck = (item, propName) => {
    const targetProperty = [...checkedItems[propName]];
    const wasChecked = targetProperty.indexOf(item) > -1;
    const newCheckedArray = wasChecked
      ? targetProperty.filter(element => element !== item)
      : [...targetProperty, item];
    setCheckedItems({ ...checkedItems, [propName]: newCheckedArray });
  };

  const handleInput = event => {
    setKeywords({ ...keywords, [columnName]: event.target.value });
  };

  return (
    <>
      <TextField
        label="選択肢を絞り込む"
        variant="outlined"
        size="small"
        onChange={event => handleInput(event)}
        value={keywords[columnName]}
      />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {filteredData.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkedItems[columnName].indexOf(item) > -1}
                    onChange={() => handleCheck(item, columnName)}
                    name={item}
                    color="primary"
                  />
                }
                label={item}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </>
  );
}
