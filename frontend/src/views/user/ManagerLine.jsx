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
    const [openIsCheckLine, setOpenIsCheckLine] = React.useState(false);
    const [status, setStatusBase] = React.useState("");
    const [rowsLine, setRowsLine] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    useEffect(() => {
        getDataLine();
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
            }).catch(error => alert("Kiểm Tra Tên Bị Trùng"));;
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

    const headLine = ["Tên", "Trạng Thái", ""];

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

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            {list_data_line}
                        </Grid>

                    </Grid>
                    {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default ManagerLine;