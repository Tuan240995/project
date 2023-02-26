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
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';


const columns = [
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
        id: "status",
        label: "Remark",
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
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 3)",
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
        marginTop: theme.spacing(3),
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
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',

    },
    stop_text: {
        color: "#DC143C",
    },
    run_text: {
        color: "#32CD32",
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


const ListUser = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [openInfor, setOpenInfor] = React.useState(false);
    const [openCheck, setOpenCheck] = React.useState(false);
    const [openCheckPW, setOpenCheckPW] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // React.useEffect(() => { getData }, [])

    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        axios({
            method: "GET",
            url: "/account/nhan-vien/",
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

    // const [checkedItems, setCheckedItems] = React.useState({
    //     username: [],
    //     last_name: [],
    //     first_name: [],
    // });

    // const [keywords, setKeywords] = React.useState({
    //     username: "",
    //     last_name: "",
    //     first_name: "",
    // });

    const hanldeSearch = () => {
        setOpenSearch(!openSearch);
    };

    const hanldeBTNAdd = () => {
        setOpenCheckPW(false);
        setOpenCheck(true);
        setOpenInfor(true);

    };

    const hanldeBTNEdit = () => {
        setOpenCheckPW(false);
        setOpenCheck(false);
        setOpenInfor(true);
    };
    const hanldeBTNDelete = () => {

    };
    const hanldeBTNCancel = () => {
        setOpenCheckPW(false);
        setOpenInfor(false);

    };

    const hanldeBTNCheckPW = () => {
        setOpenCheckPW(true);
    };

    const headCells = ["Tên", "Mã Nhân Viên", "Chức Vụ", ""];

    const list_data = (
        <div>
            <TableContainer >
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

                                    <TableCell align="center" >{row.last_name}</TableCell>
                                    <TableCell align="center">{row.username}</TableCell>
                                    <TableCell align="center">{row.first_name}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={hanldeBTNEdit}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={hanldeBTNDelete}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
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
        </div>
    );

    const create_user = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography className={classes.stepper} component="h1" variant="h5" align="center">
                    <strong>Tạo Tài Khoản Nhân Viên</strong>
                </Typography>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Họ và Tên"
                                name="name"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="ma-vn"
                                label="Mã Nhân Viên"
                                name="ma"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="ma-vn"
                                label="Chức Vụ"
                                name="ma"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Divider style={{ color: "#000" }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div>
                            <Button
                                onClick={hanldeBTNCancel}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.buttons}>
                            <Button
                                onClick={hanldeBTNCancel}
                                variant="contained"
                                color="primary"
                            >
                                Create
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );

    const update_user = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography className={classes.stepper} component="h1" variant="h5" align="center">
                    <strong>Thông Tin Nhân Viên</strong>
                </Typography>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Họ và Tên"
                                name="name"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="ma-vn"
                                label="Mã Nhân Viên"
                                name="ma"

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="ma-vn"
                                label="Chức Vụ"
                                name="ma"

                            />
                        </Grid>
                        {
                            openCheckPW ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>

                                        <Typography variant="h6">
                                            Thay Đổi Mật Khẩu
                                        </Typography>
                                        <Divider style={{ color: "#000" }} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField

                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField

                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"

                                        />
                                    </Grid>
                                </Grid>
                                :
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        onClick={hanldeBTNCheckPW}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Thay Đổi Mật Khẩu
                                    </Button>
                                </Grid>
                        }



                        <Grid item xs={12} sm={12}>
                            <Divider style={{ color: "#000" }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div>
                            <Button
                                onClick={hanldeBTNCancel}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.buttons}>
                            <Button
                                onClick={hanldeBTNCancel}
                                variant="contained"
                                color="primary"
                            >
                                Update
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography className={classes.stepper} component="h1" variant="h4" align="center">
                        <strong>Quản Lý Nhân Viên</strong>
                    </Typography>
                    <Typography align="right" >
                        <IconButton>
                            <SearchIcon
                                variant="contained"
                                onClick={hanldeSearch}
                                color={openSearch ? "secondary" : "primary"}
                            />
                        </IconButton>
                        <IconButton>
                            <AddIcon
                                variant="contained"
                                color={"inherit"}
                                onClick={hanldeBTNAdd}
                            />
                        </IconButton>
                    </Typography>
                    {openSearch &&
                        <Paper className={classes.paper_search}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Tên</b>
                                    </Typography>
                                    <TextField
                                        required
                                        id="line"
                                        name="dateFrom"
                                        autoComplete="dateFrom"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Mã Nhân Viên</b>
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
                                        <b>Chức Vụ</b>
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
                    <Grid container spacing={3}>
                        {openInfor ?
                            <>
                                <Grid item xs={12} sm={7}>
                                    {list_data}
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    {openCheck ?
                                        <>{create_user}</>
                                        :
                                        <>{update_user}</>
                                    }
                                </Grid>
                            </>
                            :
                            <><Grid item xs={12} sm={12}>
                                {list_data}
                            </Grid></>
                        }

                    </Grid>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default ListUser;