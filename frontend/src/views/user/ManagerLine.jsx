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
import CachedIcon from '@material-ui/icons/Cached';
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AlertMassage from "../../components/AlertMassage";
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
        display: "flex",
        justifyContent: "flex-end",
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManagerLine = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const [openSearchLine, setOpenSearchLine] = React.useState(false);
    const [openCreateLine, setOpenCreateLine] = React.useState(false);
    const [openUpdateLine, setOpenUpdateLine] = React.useState(false);
    const [valueSearchLine, setValueSearchLine] = React.useState("");
    const [valueCreateLine, setValueCreateLine] = React.useState("");
    const [valueDeleteLine, setValueDeleteLine] = React.useState("");
    const [valueUpdateLine, setValueUpdateLine] = React.useState({
        id: "",
        name: "",
    });

    const [openSearchProduct, setOpenSearchProduct] = React.useState(false);
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
    const [openUpdateProduct, setOpenUpdateProduct] = React.useState(false);
    const [valueCreateProductName, setValueCreateProductName] = React.useState("");
    const [valueCreateProductQr, setValueCreateProductQr] = React.useState("");
    const [valueDeleteProduct, setValueDeleteProduct] = React.useState("");
    const [valueSearchProductName, setValueSearchProductName] = React.useState("");
    const [valueSearchProductKey, setValueSearchProductKey] = React.useState("");
    const [valueUpdateProduct, setValueUpdateProduct] = React.useState({
        id: "",
        name: "",
        key_qr: "",
    });

    const [openIsCheckLine, setOpenIsCheckLine] = React.useState(false);
    const [openIsCheckProduct, setOpenIsCheckProduct] = React.useState(false);

    const [status, setStatusBase] = React.useState("");

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

    const handleCloseCheckLine = () => {
        setOpenIsCheckLine(false);
    };

    const handleCloseCheckProduct = () => {
        setOpenIsCheckProduct(false);
    };

    const hanldeReloadLine = () => {
        getDataLine();
        hanldeCancelLine();
    };

    //Hanlde Line

    const hanldeOpenSearchLine = () => {
        setOpenSearchLine(!openSearchLine);
        setOpenCreateLine(false);
        setOpenUpdateLine(false);

        if (openSearchLine === true) {
            getDataLine();
        }
    };
    const hanldeSearchLine = () => {
        axios({
            method: "GET",
            url: "/api/line/",
            params: {
                name: valueSearchLine,
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRowsLine(res.data);
        });
    };

    const hanldeOpenCreateLine = () => {
        setOpenCreateLine(!openCreateLine);
        setOpenSearchLine(false);
        setOpenUpdateLine(false);
    };

    const hanldeCreateLine = () => {
        if (valueCreateLine === "") {
            alert("Hãy Nhập Tên Dây Chuyền")
        } else {
            let data = new FormData();
            data.append("name", valueCreateLine);

            axios({
                method: "POST",
                url: "/api/line/",
                headers: { "Content-Type": "application/json" },
                data: data,
            }).then((res) => {
                if (res.status === 201) {
                    getDataLine();
                    setStatusBase({ msg: "Tạo Dây Chuyền Thành Công", key: Math.random() });
                    hanldeCancelLine();
                }
                else {
                    setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
                }
            });
        }
    };

    const hanldeEditLine = (line_id) => {
        setOpenCreateLine(false);
        setOpenSearchLine(false);
        setOpenUpdateLine(true);
        const line = rowsLine.filter((item) => item.id === line_id);
        setValueUpdateLine({
            id: line[0].id,
            name: line[0].name,
        });
    };

    const hanldeUpdateLine = () => {
        if (valueUpdateLine.name === "") {
            alert("Hãy Nhập Tên Dây Chuyền")
        } else {
            let data = new FormData();
            data.append("name", valueUpdateLine.name);
            axios({
                method: "PUT",
                url: "/api/line/" + valueUpdateLine.id + "/",
                headers: { "Content-Type": "application/json" },
                data: data,
            }).then((res) => {
                console.log(res);
                console.log(res.status);
                if (res.status === 200) {
                    getDataLine();
                    // alert("Update Thành Công");
                    setStatusBase({ msg: "Cập Nhập Dây Chuyền Thành Công", key: Math.random() });
                    hanldeCancelLine();
                } else {
                    setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
                }
            });
        }
    };

    const hanldeDeleteLine = (line_id) => {
        setOpenIsCheckLine(true);
        setValueDeleteLine(line_id);
    };
    const handleDeleteCheckLine = () => {
        handleCloseCheckLine();
        axios({
            method: "DELETE",
            url: "/api/line/" + valueDeleteLine + "/",
        }).then((res) => {
            if (res.status === 204) {
                getDataLine();
                setValueDeleteLine("");
                // alert("Delete Thành Công");
                setStatusBase({ msg: "Xóa Dây Chuyền Thành Công", key: Math.random() });
            } else {
                setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
            }
        });
    };

    const hanldeCancelLine = () => {
        setOpenCreateLine(false);
        setOpenSearchLine(false);
        setOpenUpdateLine(false);
    };

    // Hanlde Product ====================
    const hanldeReloadProduct = () => {
        getDataProduct();
        hanldeCancelProduct();
    };


    const hanldeOpenSearchProduct = () => {
        setOpenSearchProduct(!openSearchProduct);
        setOpenCreateProduct(false);
        setOpenUpdateProduct(false);

        if (openSearchProduct === true) {
            getDataProduct();
        }
    };

    const hanldeSearchProduct = () => {
        axios({
            method: "GET",
            url: "/api/product/",
            params: {
                name: valueSearchProductName,
                key_QR: valueSearchProductKey,
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRowsProduct(res.data);
        });
    };


    const hanldeOpenCreateProduct = () => {
        setOpenCreateProduct(!openCreateProduct);
        setOpenSearchProduct(false);
        setOpenUpdateProduct(false);
    };

    const hanldeCreateProduct = () => {
        if (valueCreateProductName === "") {
            alert("Hãy Nhập Tên Sản Phẩm")
        } else if (valueCreateProductQr === "") {
            alert("Hãy Nhập Tên Mã QR")
        } else {
            let data = new FormData();
            data.append("name", valueCreateProductName);
            data.append("key_QR", valueCreateProductQr);

            axios({
                method: "POST",
                url: "/api/product/",
                headers: { "Content-Type": "application/json" },
                data: data,
            }).then((res) => {
                if (res.status === 201) {
                    getDataProduct();
                    // alert("Create Thành Công");
                    setStatusBase({ msg: "Tạo Sản Phẩm Thành Công", key: Math.random() });
                    hanldeCancelProduct();
                } else {
                    setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
                }
            });
        }
    };

    const hanldeEditProduct = (product_id) => {
        setOpenSearchProduct(false);
        setOpenCreateProduct(false);
        setOpenUpdateProduct(true);

        const product = rowsProduct.filter((item) => item.id === product_id);
        setValueUpdateProduct({
            id: product[0].id,
            name: product[0].name,
            key_qr: product[0].key_QR,
        });
    };

    const hanldeUpdateProduct = () => {
        if (valueCreateProductName === "") {
            alert("Hãy Nhập Tên Sản Phẩm")
        } else if (valueCreateProductQr === "") {
            alert("Hãy Nhập Tên Mã QR")
        } else {
            let data = new FormData();
            data.append("name", valueUpdateProduct.name);
            data.append("key_QR", valueUpdateProduct.key_qr);
            axios({
                method: "PUT",
                url: "/api/product/" + valueUpdateProduct.id + "/",
                headers: { "Content-Type": "application/json" },
                data: data,
            }).then((res) => {

                if (res.status === 200) {
                    getDataProduct();
                    // alert("Update Thành Công");
                    setStatusBase({ msg: "Cập Nhập Sản Phẩm Thành Công", key: Math.random() });
                    hanldeCancelProduct();
                } else {
                    setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
                }
            });
        }
    };

    const hanldeDeleteProduct = (product_id) => {
        setOpenIsCheckProduct(true);
        setValueDeleteProduct(product_id);
    };

    const handleDeleteCheckProduct = () => {
        handleCloseCheckProduct();
        axios({
            method: "DELETE",
            url: "/api/product/" + valueDeleteProduct + "/",
        }).then((res) => {
            if (res.status === 204) {
                getDataProduct();
                // alert("Delete Thành Công");
                setStatusBase({ msg: "Xóa Sản Phẩm Thành Công", key: Math.random() });
            } else {
                setStatusBase({ msg: "Thao Tác Bị Lỗi..", key: Math.random() });
            }
        });
    };

    const hanldeCancelProduct = () => {
        setOpenSearchProduct(false);
        setOpenCreateProduct(false);
        setOpenUpdateProduct(false);
    };



    const headLine = ["Tên", "Trạng Thái", ""];
    const headProduct = ["Tên", "Mã Qr", ""];
    // const selectStatus = [
    //     {
    //         position: "RUN",
    //         value: "true",
    //     },
    //     {
    //         position: "STOP",
    //         value: "false",
    //     },
    // ];
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
                        <CachedIcon
                            variant="contained"
                            onClick={hanldeReloadLine}
                            color="primary"
                        />
                    </IconButton>
                    <IconButton>
                        <SearchIcon
                            variant="contained"
                            onClick={hanldeOpenSearchLine}
                            color={openSearchLine ? "secondary" : "primary"}
                        />
                    </IconButton>
                    <IconButton>
                        <AddIcon
                            variant="contained"
                            color={openCreateLine ? "secondary" : "primary"}
                            onClick={hanldeOpenCreateLine}
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
                                        onClick={hanldeSearchLine}
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
                                        onClick={hanldeCreateLine}
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
                                        setValueUpdateLine({
                                            id: valueUpdateLine.id,
                                            name: e.target.value,
                                        });
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
                                        onClick={hanldeUpdateLine}
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

            <div>
                <Dialog
                    open={openIsCheckLine}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseCheckLine}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Xóa Dây Chuyền"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Bạn muốn xóa Dây Chuyền này không ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseCheckLine}
                            color="primary"
                            variant="contained"
                        >
                            No
                        </Button>
                        <Button
                            onClick={handleDeleteCheckLine}
                            color="secondary"
                            variant="contained"
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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
                        <CachedIcon
                            variant="contained"
                            onClick={hanldeReloadProduct}
                            color="primary"
                        />
                    </IconButton>
                    <IconButton>
                        <SearchIcon
                            variant="contained"
                            onClick={hanldeOpenSearchProduct}
                            color={openSearchProduct ? "secondary" : "primary"}
                        />
                    </IconButton>
                    <IconButton>
                        <AddIcon
                            variant="contained"
                            color={openCreateProduct ? "secondary" : "primary"}
                            onClick={hanldeOpenCreateProduct}
                        />
                    </IconButton>
                </Typography>

                {/* ===============Search=============== */}
                {openSearchProduct && (
                    <Paper className={classes.paper_search}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={1}></Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Tên</b>
                                </Typography>
                                <TextField
                                    id="searchProductName"
                                    name="searchProductName"
                                    onChange={(e) => {
                                        setValueSearchProductName(e.target.value);
                                    }}
                                    autoComplete="searchProductName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Mã Qr</b>
                                </Typography>
                                <TextField
                                    id="searchProductKey"
                                    name="searchProductKey"
                                    onChange={(e) => {
                                        setValueSearchProductKey(e.target.value);
                                    }}
                                    autoComplete="searchProductKey"
                                />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={hanldeSearchProduct}
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
                                    id="createProductName"
                                    name="createProductName"
                                    onChange={(e) => {
                                        setValueCreateProductName(e.target.value);
                                    }}
                                    autoComplete="createProductName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Mã Qr</b>
                                </Typography>
                                <TextField
                                    id="createProductQr"
                                    name="createProductQr"
                                    onChange={(e) => {
                                        setValueCreateProductQr(e.target.value);
                                    }}
                                    autoComplete="createProductQr"
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
                                        onClick={hanldeCreateProduct}
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
                                    id="updateProductName"
                                    name="updateProductName"
                                    value={valueUpdateProduct.name}
                                    onChange={(e) => {
                                        setValueUpdateProduct({
                                            id: valueUpdateProduct.id,
                                            name: e.target.value,
                                            key_qr: valueUpdateProduct.key_qr
                                        });
                                    }}
                                    autoComplete="updateProductName"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Typography>
                                    <b>Mã Qr</b>
                                </Typography>
                                <TextField
                                    id="updateProductKey"
                                    name="updateProductKey"
                                    value={valueUpdateProduct.key_qr}
                                    onChange={(e) => {
                                        setValueUpdateProduct({
                                            id: valueUpdateProduct.id,
                                            name: valueUpdateProduct.name,
                                            key_qr: e.target.value,
                                        });
                                    }}
                                    autoComplete="updateProductKey"
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
                                        onClick={hanldeUpdateProduct}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Update
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

            <div>
                <Dialog
                    open={openIsCheckProduct}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseCheckProduct}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Xóa Sản Phẩm"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Bạn muốn xóa Sản Phẩm này không ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseCheckProduct}
                            color="primary"
                            variant="contained"
                        >
                            No
                        </Button>
                        <Button
                            onClick={handleDeleteCheckProduct}
                            color="secondary"
                            variant="contained"
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );

    const create_Line = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.stepper}
                    component="h1"
                    variant="h5"
                    align="center"
                >
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
                    {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default ManagerLine;