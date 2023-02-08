import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import axios from 'axios';


const columns = [
    {
        id: "no",
        label: "No."
    },
    {
        id: "date",
        label: "Date"
    },
    {
        id: "shift",
        label: "Shift",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toLocaleString()
    },
    {
        id: "targer",
        label: "Q'ty Target",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toLocaleString()
    },
    {
        id: "actual",
        label: "Q'ty Actual",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toFixed(2)
    },
    {
        id: "efficiency",
        label: "Efficiency",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toLocaleString()
    },
    {
        id: "pic",
        label: "PIC",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toLocaleString()
    },
    {
        id: "remark",
        label: "Remark",
        // minWidth: 170,
        // align: "right",
        // format: value => value.toLocaleString()
    },

];

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        // boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 3)",
        width: 'auto',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            // width: 90,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        // marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            // marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(0, 0, 2, 0),
    },
    table: {
        minWidth: 100,

    },
    table__head: {
        backgroundColor: "#bde9ba",
        fontWeight: "bold"

    },
    paper_search: {
        backgroundColor: 'rgb(233, 229, 214)',
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),

    },

}));


const BasicTable = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // React.useEffect(() => { getData }, [])
    const countries = [

        { no: "1", date: "03/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 103", remark: "" },
        { no: "2", date: "02/12/2022", shift: "AS", targer: "10000", actual: "8500", efficiency: "85 %", pic: "SVN 101", remark: "Thiếu Linh Kiện 0.5h" },
        { no: "3", date: "02/12/2022", shift: "MS", targer: "10000", actual: "9000", efficiency: "90 %", pic: "SVN 102", remark: "Thiếu Nhân Sự" },
        { no: "4", date: "01/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 101", remark: "Thiếu Linh Kiện" },
        { no: "5", date: "03/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 103", remark: "" },
        { no: "6", date: "02/12/2022", shift: "AS", targer: "10000", actual: "8500", efficiency: "85 %", pic: "SVN 101", remark: "Thiếu Linh Kiện 0.5h" },
        { no: "7", date: "02/12/2022", shift: "MS", targer: "10000", actual: "9000", efficiency: "90 %", pic: "SVN 102", remark: "Thiếu Nhân Sự" },
        { no: "8", date: "01/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 101", remark: "Thiếu Linh Kiện" },
        { no: "9", date: "03/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 103", remark: "" },
        { no: "10", date: "02/12/2022", shift: "AS", targer: "10000", actual: "8500", efficiency: "85 %", pic: "SVN 101", remark: "Thiếu Linh Kiện 0.5h" },
        { no: "11", date: "02/12/2022", shift: "MS", targer: "10000", actual: "9000", efficiency: "90 %", pic: "SVN 102", remark: "Thiếu Nhân Sự" },
        { no: "12", date: "01/12/2022", shift: "MS", targer: "10000", actual: "9500", efficiency: "95 %", pic: "SVN 101", remark: "Thiếu Linh Kiện" },
    ];


    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        axios({
            method: "GET",
            url: "/api/make/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res.data);
            setRows(res.data);
            console.log(rows);
        });
    };


    const handleChangePage = (event, newPage) => {
        // console.log(rows);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [checkedItems, setCheckedItems] = React.useState({
        no: [],
        date: [],
        shift: [],
        targer: [],
        actual: [],
        efficiency: [],
        pic: [],
        remark: [],
    });

    const [keywords, setKeywords] = React.useState({
        no: "",
        date: "",
        shift: "",
        targer: "",
        actual: "",
        efficiency: "",
        pic: "",
        remark: "",
    });

    const hanldeSearch = () => {
        console.log(open);
        setOpen(!open);
    };

    const headCells = ["Date", "Line", "Product", "Shift", "Q'ty Target", "Q'ty Actual", "Efficiency", "PIC", "Remark"];

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography className={classes.stepper} component="h1" variant="h4" align="center">
                        <strong>Sản Lượng Lắp Giáp</strong>
                    </Typography>
                    <Typography align="right" >
                        <SearchIcon
                            variant="contained"
                            onClick={hanldeSearch}
                            color={open ? "secondary" : "primary"}
                        />
                    </Typography>
                    {open &&
                        <Paper className={classes.paper_search}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={2}>
                                    <Typography>
                                        <b>Start Day</b>
                                    </Typography>
                                    <TextField
                                        required
                                        id="line"
                                        type="date"
                                        name="dateFrom"
                                        autoComplete="dateFrom"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>To Day</b>
                                    </Typography>
                                    <TextField
                                        required
                                        id="line"
                                        type="date"
                                        name="dateFrom"
                                        autoComplete="dateFrom"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Shift</b>
                                    </Typography>
                                    <TextField
                                        required
                                        id="line"
                                        name="dateFrom"
                                        autoComplete="dateFrom"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography>
                                        <b>PIC</b>
                                    </Typography>
                                    <TextField
                                        required
                                        id="line"
                                        name="dateFrom"
                                        autoComplete="dateFrom"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography align="center">
                                        <Button variant="contained" color="primary"> Tìm Kiếm </Button>
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Paper>
                    }
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map((item) => (
                                        <TableCell className={classes.table__head} align="center">
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id} >
                                            
                                            <TableCell align="center" >{row.created_at}</TableCell>
                                            <TableCell align="center">{row.line}</TableCell>
                                            <TableCell align="center">{row.product}</TableCell>
                                            <TableCell align="center">{row.shift}</TableCell>
                                            <TableCell align="center">{row.targer}</TableCell>
                                            <TableCell align="center">{row.finish}</TableCell>
                                            <TableCell align="center">{row.efficiency}</TableCell>
                                            <TableCell align="center">{row.pic}</TableCell>
                                            <TableCell align="center">{row.remark}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default BasicTable;