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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';


// const columns = [
//     {
//         id: "no",
//         label: "No."
//     },
//     {
//         id: "date",
//         label: "Date"
//     },
//     {
//         id: "shift",
//         label: "Shift",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },
//     {
//         id: "targer",
//         label: "Q'ty Target",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },
//     {
//         id: "actual",
//         label: "Q'ty Actual",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toFixed(2)
//     },
//     {
//         id: "efficiency",
//         label: "Efficiency",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },
//     {
//         id: "status",
//         label: "Remark",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },
//     {
//         id: "pic",
//         label: "PIC",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },
//     {
//         id: "remark",
//         label: "Remark",
//         // minWidth: 170,
//         // align: "right",
//         // format: value => value.toLocaleString()
//     },

// ];

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
    stop_text: {
        color: "#DC143C",
    },
    run_text: {
        color: "#32CD32",
    },
    formControl: {
        // margin: theme.spacing(1),

        minWidth: "50%",
        // border: "2px solid #ff0000"

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

    const [startDay, setStartDay] = React.useState("");
    const [toDay, setToday] = React.useState("");
    const [shift, setShift] = React.useState("");
    const [pic, setPic] = React.useState("");

    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        axios({
            method: "GET",
            url: "/api/make/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(res.data);
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

    const hanldeSearch = () => {
        console.log(open);
        setOpen(!open);
    };

    const hanldeBTNSearch = () => {
        console.log(startDay);
        console.log(toDay);
        console.log(shift);
        console.log(pic);
        axios({
            method: "GET",
            url: "/api/make/",
            params: {
                start_day: startDay,
                to_day: toDay,
                shift: shift,
                pic: pic,
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(res.data);
        });

    };


    const currentKip = [
        {
            kip: "MS",
            value: "MS"
        },
        {
            kip: "AS",
            value: "AS"
        },
        {
            kip: "NS",
            value: "NS"
        },
        {
            kip: "ALL",
            value: "ALL"
        },
    ];

    const headCells = ["Ngày", "Dây Chuyền", "Sản Phẩm", "Ca", "Mục Tiêu", "Hoàn Thành", "Tỉ Lê", "Trạng Thái", "Công Nhân", "Quản Lý", "Note"];

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
                                        onChange={((e) => {
                                            setStartDay(e.target.value);
                                        })}
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
                                        onChange={((e) => {
                                            setToday(e.target.value);
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Shift</b>
                                    </Typography>

                                    <FormControl className={classes.formControl}>
                                        {/* <InputLabel id="demo-simple-select-label">Chức Vụ</InputLabel> */}
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            required
                                            fullWidth
                                            onChange={((e) => {
                                                setShift(e.target.value);
                                            })}
                                        >
                                            <MenuItem key="None" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {currentKip.map((option) => (
                                                <MenuItem key={option.kip} value={option.value}>
                                                    {option.kip}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                        onChange={((e) => {
                                            setPic(e.target.value);
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={hanldeBTNSearch}
                                        >
                                            Tìm Kiếm
                                        </Button>
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
                                            <TableCell align="center">{row.efficiency}%</TableCell>
                                            {row.status === "RUN" ?
                                                <TableCell align="center" className={classes.run_text}><strong>{row.status}</strong></TableCell>
                                                :
                                                <TableCell align="center" className={classes.stop_text}><strong>{row.status}</strong></TableCell>
                                            }
                                            <TableCell align="center">{row.total_staff}</TableCell>
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