import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        // boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 3)",
        width: "auto",
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            // width: 90,
            marginLeft: "auto",
            marginRight: "auto",
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
    layout_child: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 3)",
        width: "auto",
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            // width: 90,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    paper_child: {
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
    stop_text: {
        color: "#DC143C",
    },
    run_text: {
        color: "#32CD32",
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',

    },
    formControl: {
        // margin: theme.spacing(1),

        minWidth: "50%",
        // border: "2px solid #ff0000"
    },
    table__head: {
        backgroundColor: "#bde9ba",
        fontWeight: "bold",
    },
    paper_search: {
        backgroundColor: "rgb(233, 229, 214)",
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
}));

const ManagerLine = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const [openSearchLine, setOpenSearchLine] = React.useState(false);
    const [openCreateLine, setOpenCreateLine] = React.useState(false);
    const [openUpdateLine, setOpenUpdateLine] = React.useState(false);
    const [valueSearchLine, setValueSearchLine] = React.useState("");
    const [valueCreateLine, setValueCreateLine] = React.useState("");
    const [valueUpdateLine, setValueUpdateLine] = React.useState({
        id: "",
        name: "",
    });

    const [openSearchProduct, setOpenSearchProduct] = React.useState(false);
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
    const [openUpdateProduct, setOpenUpdateProduct] = React.useState(false);


    const [rowsLine, setRowsLine] = React.useState([]);
    const [rowsProduct, setRowsProduct] = React.useState([]);
    const [openLine, setOpenLine] = React.useState(false);
    const [openProduct, setOpenProduct] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // React.useEffect(() => { getData }, [])

    const [startDay, setStartDay] = React.useState("");
    const [toDay, setToday] = React.useState("");
    const [shift, setShift] = React.useState("");
    const [pic, setPic] = React.useState("");

    useEffect(() => {
        getData();
        getDataLine();
        getDataProduct();
    }, []);

    const getDataLine = () => {
        axios({
            method: "GET",
            url: "/api/line/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRowsLine(res.data);
        });
    };

    const getDataProduct = () => {
        axios({
            method: "GET",
            url: "/api/product/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRowsProduct(res.data);
        });
    };

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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const hanldeBTNAdd = () => {
        // console.log(open);
        // setOpen(!open);
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

    //Hanlde Line

    const hanldeSearchLine = () => {
        setOpenSearchLine(!openSearchLine);
        setOpenCreateLine(false);
        setOpenUpdateLine(false);
    };

    const hanldeCreateLine = (nameLine) => {
        setOpenCreateLine(!openCreateLine);
        setOpenSearchLine(false);
        setOpenUpdateLine(false);

        let data = new FormData()
        data.append('name', valueCreateLine)

        axios({
            method: "POST",
            url: "/api/line/",
            headers: { "Content-Type": "application/json" },
            data: data,
        }).then((res) => {
            if (res.data.success === "true") {
                getDataLine();
            }
        });

    };


    const hanldeEditLine = (line_id) => {
        setOpenCreateLine(false);
        setOpenSearchLine(false);
        setOpenUpdateLine(false);
        const line = rowsLine.filter((item) => item.id === line_id);
        console.log(line)
        setValueUpdateLine({
            id: line[0].id,
            name: line[0].name,
        })
        test();
    }

    const test = () => {
        setOpenCreateLine(false);
        setOpenSearchLine(false);
        setOpenUpdateLine(true);
    };

    const hanldeUpdateLine = () => {

    }

    const hanldeDeleteLine = () => {

    }

    const hanldeCancelLine = () => {
        setOpenCreateLine(false);
        setOpenSearchLine(false);
        setOpenUpdateLine(false);

    };

    // Hanlde Product

    const hanldeSearchProduct = () => {
        setOpenSearchProduct(!openSearchProduct);
        setOpenCreateProduct(false);
        setOpenUpdateProduct(false);
    };

    const hanldeCreateProduct = () => {
        setOpenCreateProduct(!openCreateProduct);
        setOpenSearchProduct(false);
        setOpenUpdateProduct(false);

    };

    const hanldeEditProduct = () => {

    }

    const hanldeUpdateProduct = () => {

    }

    const hanldeDeleteProduct = () => {

    }

    const hanldeCancelProduct = () => {
        setOpenSearchProduct(false);
        setOpenCreateProduct(false);
        setOpenUpdateProduct(false);
    };

    const headLine = ["Tên", "Trạng Thái", ""];
    const headProduct = ["Tên", "Mã Qr", ""];
    const selectStatus = [
        {
            position: 'RUN',
            value: 'true',
        },
        {
            position: 'STOP',
            value: 'false',
        }
    ];

    const list_data_line = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.stepper}
                    component="h1"
                    variant="h4"
                    align="center"
                >
                    <strong>Quản Lý Dây Chuyền</strong>
                </Typography>
                <Typography align="right">
                    <IconButton>
                        <SearchIcon
                            variant="contained"
                            onClick={hanldeSearchLine}
                            color={openSearchLine ? "secondary" : "primary"}
                        />
                    </IconButton>
                    <IconButton>
                        <AddIcon
                            variant="contained"
                            color={openCreateLine ? "secondary" : "primary"}
                            onClick={hanldeCreateLine}
                        />
                    </IconButton>
                </Typography>

                {/* ===============Search=============== */}
                {openSearchLine && (
                    <Paper className={classes.paper_search}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={2}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="searchLine"
                                    name="searchLine"
                                    onChange={(e) => {
                                        setValueSearchLine(e.target.value);
                                    }}
                                    autoComplete="searchLine"
                                />
                            </Grid>
                            <Grid item xs={6} sm={1}></Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    // onClick={hanldeSearchLine}
                                    >
                                        Tìm Kiếm
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Search=======End======== */}


                {/* ===============Create============== */}
                {openCreateLine && (
                    <Paper className={classes.paper_search}>
                        <Typography
                            className={classes.stepper}
                            component="h1"
                            variant="h6"
                            align="left"
                        >
                            <strong>Tạo Sản Phẩm</strong>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={3}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="CreateLine"
                                    name="CreateLine"
                                    onChange={(e) => {
                                        setValueCreateLine(e.target.value);
                                    }}
                                    autoComplete="CreateLine"
                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <Button
                                        onClick={hanldeCancelLine}
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
                                        // onClick={hanldeBTNCreate}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Create=======End======== */}

                {/* ===============Update============== */}
                {openUpdateLine && (
                    <Paper className={classes.paper_search}>
                        <Typography
                            className={classes.stepper}
                            component="h1"
                            variant="h6"
                            align="left"
                        >
                            <strong>Sửa Đổi Dây chuyền</strong>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={2}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="updateLine"
                                    name="updateLine"
                                    value={valueUpdateLine.name}
                                    onChange={(e) => {
                                        setValueUpdateLine.name(e.target.value);
                                    }}
                                    autoComplete="updateLine"
                                />
                            </Grid>
                            <Grid item xs={6} sm={1}></Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={hanldeCancelLine}
                                    >
                                        Update
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="center">
                                    <Button
                                        onClick={hanldeCancelLine}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Update=======End======== */}

                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {headLine.map((item) => (
                                    <TableCell className={classes.table__head} align="center">
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsLine
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.name}</TableCell>
                                        {row.status ? (
                                            <TableCell align="center" className={classes.run_text}>
                                                <strong>RUN</strong>
                                            </TableCell>
                                        ) : (
                                            <TableCell align="center" className={classes.stop_text}>
                                                <strong>STOP</strong>
                                            </TableCell>
                                        )}
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => hanldeEditLine(row.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => hanldeDeleteLine(row.id)}
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
                    count={rowsLine.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </main>
    );


    const list_data_product = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.stepper}
                    component="h1"
                    variant="h4"
                    align="center"
                >
                    <strong>Quản Lý Sản Phẩm</strong>
                </Typography>
                <Typography align="right">
                    <IconButton>
                        <SearchIcon
                            variant="contained"
                            onClick={hanldeSearchProduct}
                            color={openSearchProduct ? "secondary" : "primary"}
                        />
                    </IconButton>
                    <IconButton>
                        <AddIcon
                            variant="contained"
                            color={openCreateProduct ? "secondary" : "primary"}
                            onClick={hanldeCreateProduct}
                        />
                    </IconButton>
                </Typography>

                {/* ===============Search=============== */}
                {openSearchProduct && (
                    <Paper className={classes.paper_search}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={2}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="searchUserName"
                                    name="searchUserName"
                                    // onChange={(e) => {
                                    //     setSearchUserName(e.target.value);
                                    // }}
                                    autoComplete="searchUserName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={1}></Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    // onClick={hanldeSearchLine}
                                    >
                                        Tìm Kiếm
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Search=======End======== */}

                {/* ===============Create============== */}
                {openCreateProduct && (
                    <Paper className={classes.paper_search}>
                        <Typography
                            className={classes.stepper}
                            component="h1"
                            variant="h6"
                            align="left"
                        >
                            <strong>Tạo Sản Phẩm</strong>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={2}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="searchUserName"
                                    name="searchUserName"
                                    // onChange={(e) => {
                                    //     setSearchUserName(e.target.value);
                                    // }}
                                    autoComplete="searchUserName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Mã Qr</b>
                                </Typography>
                                <TextField
                                    id="searchUserName"
                                    name="searchUserName"
                                    // onChange={(e) => {
                                    //     setSearchUserName(e.target.value);
                                    // }}
                                    autoComplete="searchUserName"
                                />
                            </Grid>


                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <Button
                                        onClick={hanldeCancelProduct}
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
                                        // onClick={hanldeBTNCreate}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Create=======End======== */}

                {/* ===============Update============== */}
                {openUpdateProduct && (
                    <Paper className={classes.paper_search}>
                        <Typography
                            className={classes.stepper}
                            component="h1"
                            variant="h6"
                            align="left"
                        >
                            <strong>Tạo Sản Phẩm</strong>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={2}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="searchUserName"
                                    name="searchUserName"
                                    // onChange={(e) => {
                                    //     setSearchUserName(e.target.value);
                                    // }}
                                    autoComplete="searchUserName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Mã Qr</b>
                                </Typography>
                                <TextField
                                    id="searchUserName"
                                    name="searchUserName"
                                    // onChange={(e) => {
                                    //     setSearchUserName(e.target.value);
                                    // }}
                                    autoComplete="searchUserName"
                                />
                            </Grid>


                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    <Button
                                        onClick={hanldeCancelProduct}
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
                                        // onClick={hanldeBTNCreate}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {/* ===============Update=======End======== */}

                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {headProduct.map((item) => (
                                    <TableCell className={classes.table__head} align="center">
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsProduct
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.key_QR}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => hanldeEditProduct(row.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => hanldeDeleteProduct(row.id)}
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
                    count={rowsProduct.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </main>
    );

    const create_Line = (
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
                            // onChange={((e) => {
                            //     setCreateName(e.target.value);
                            // })}
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
                                // onClick={hanldeBTNCancel}
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
                                // onClick={hanldeBTNCreate}
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

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    {/* <Typography
            className={classes.stepper}
            component="h1"
            variant="h4"
            align="center"
          >
            <strong>Quản Lý Tổng Hợp</strong>
          </Typography> */}

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {list_data_line}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {list_data_product}
                            {/* {create_Line} */}
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default ManagerLine;