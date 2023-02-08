import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";
import { Popper, Paper } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import FilterElement from "./filterElement.jsx";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper
    },
    filterListIcon: {
        verticalAlign: "middle",
        marginLeft: "5px"
    }
}));

export default function PopupFilter(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log("=======PopupFilter======")
    const [checkedItems, setCheckedItems] = props.stateCheckedItems;
    const [keywords, setKeywords] = props.stateKeywords;
    const data = props.data;
    const columnName = props.columnName;

    const isChecked = checkedItems[columnName].length > 0;

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "popup-filter" : undefined;

    return (
        <>
            <FilterListIcon
                className={classes.filterListIcon}
                aria-describedby={id}
                onClick={event => handleClick(event)}
                color={isChecked ? "secondary" : "primary"}
            />
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={event => handleClick(event)}>
                    <Paper className={classes.paper}>
                        {/* <FilterElement
              stateCheckedItems={[checkedItems, setCheckedItems]}
              stateKeywords={[keywords, setKeywords]}
              data={data}
              columnName={columnName}
            /> */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    id="targer"
                                    name="targer"
                                    label="Tìm kiếm"
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button} F
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}
