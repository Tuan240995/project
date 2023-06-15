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
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { FormControl, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AlertMassage from "../../components/AlertMassage";
import axios from 'axios';


// const columns = [
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
    formControl: {
        // margin: theme.spacing(1),

        minWidth: "100%",
        // border: "2px solid #ff0000"

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Product = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const [status, setStatusBase] = React.useState("");

    const [openSearch, setOpenSearch] = React.useState(false);
    const [openInfor, setOpenInfor] = React.useState(false);
    const [openCheck, setOpenCheck] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [searchName, setSearchName] = React.useState("");
    const [searchQr, setSearchQr] = React.useState("");

    const [updateProductID, setProducrID] = React.useState("");
    const [updateName, setUpdateName] = React.useState("");
    const [updateCode, setUpdateCode] = React.useState("");
    const [updateTager, setUpdateTager] = React.useState("");
    const [updatePac, setUpdatePac] = React.useState("");
    const [updateBox, setUpdateBox] = React.useState("");



    const [createName, setCreateName] = React.useState("");
    const [createCode, setCreateCode] = React.useState("");
    const [createTager, setCreateTager] = React.useState("");
    const [createPac, setCreatePac] = React.useState("");
    const [createBox, setCreateBox] = React.useState("");

    const [createPosition, setCreatePosition] = React.useState("");
    const [createPassword, setCreatePassword] = React.useState("");

    const [idProductDelete, setIdProductDelete] = React.useState("");


    // React.useEffect(() => { getData }, [])

    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        axios({
            method: "GET",
            url: "/api/product/",
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

    const selectPosition = [
        {
            position: 'Admin',
        },
        {
            position: 'Manager',
        },
        {
            position: 'Leader',
        },
        {
            position: 'Nhân Viên',
        },
    ];

    const selectPosition1 = [
        {
            position: 'Admin',
            value: 'Leve 4',
        },
        {
            position: 'Manager',
            value: 'Leve 3',
        },
        {
            position: 'Leader',
            value: 'Leve 2',
        },
        {
            position: 'Nhân Viên',
            value: 'Leve 1'
        },
    ];


    const hanldeSearch = () => {
        setOpenSearch(!openSearch);
    };

    const hanldeBTNSearch = () => {
        axios({
            method: "GET",
            url: "/api/product/",
            params: {
                name: searchName,
                key_QR: searchQr,
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(res.data);
        });
    }

    const hanldeBTNAdd = () => {
        setOpenCheck(true);
        setOpenInfor(true);

        setCreateName("");
        setCreateCode("");
        setCreateTager("");
        setCreatePac("");
        setCreateBox("");
    };

    const hanldeBTNEdit = (product_id) => {
        setOpenCheck(false);
        setOpenInfor(true);
        // getDataEdit(user_id);
        const product = rows.filter((item) => item.id === product_id);
        setProducrID(product[0].id);
        setUpdateName(product[0].name);
        setUpdateCode(product[0].key_QR);
        setUpdateTager(product[0].targer);
        setUpdatePac(product[0].pac);
        setUpdateBox(product[0].box);
    };

    const hanldeBTNDelete = (product_id) => {
        setOpenUpdate(true);
        setIdProductDelete(product_id);

    };

    const hanldeBTNCancel = () => {
        setOpenInfor(false);

    };

    const hanldeBTNCreate = () => {

        if (createName === "" || createCode === "" || createTager === "" || createPac === "" || createBox === "") {
            alert(" Hãy Nhập Đủ Thông Tin");
        }
        else if (isNaN(createTager) || isNaN(createPac) || isNaN(createBox)) {
            alert(" Mục Tiêu, Pac, Box Phải Là Số");
        }
        else {
            setOpenInfor(false);

            let data = new FormData()
            data.append('name', createName)
            data.append('key_QR', createCode)
            data.append('targer', createTager)
            data.append('pac', createPac)
            data.append('box', createBox)

            axios({
                method: "POST",
                url: "/api/product/",
                data: data,
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                if (res.status === 201) {
                    getData();
                    setStatusBase({ msg: "Thêm Sản Phẩm Thành công", key: Math.random() });
                }
                else {
                    alert(res.data.message);
                }
            }).catch(error => alert("Kiểm Tra Mã QR Bị Trùng"));
        }
    };
    const hanldeReload = () => {
        getData();
        setOpenSearch(false);
        hanldeBTNCancel();
    };

    const updateUser = (data) => {
        axios({
            method: "PUT",
            url: "/account/nhan-vien/" + updateProductID + "/",
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((res) => {
            setStatusBase({ msg: "Cập Nhập Thành Công", key: Math.random() });
            getData();
        }).catch(error => alert(error));
    }

    const hanldeBTNUpdate = () => {
        if (updateName === "" || updateCode === "" || updateTager === "" || updatePac === "" || updateBox === "") {
            alert(" Hãy Nhập Đủ Thông Tin");
        }
        else if (isNaN(updateTager) || isNaN(updatePac) || isNaN(updateBox)) {
            alert(" Mục Tiêu, Pac, Box Phải Là Số");
        } else {
            let data = new FormData()
            data.append('name', updateName)
            data.append('key_QR', updateCode)
            data.append('targer', updateTager)
            data.append('pac', updatePac)
            data.append('box', updateBox)

            axios({
                method: "PUT",
                url: "/api/product/" + updateProductID + "/",
                headers: { "Content-Type": "application/json" },
                data: data
            }).then((res) => {
                setStatusBase({ msg: "Cập Nhập Thành Công", key: Math.random() });
                getData();

            }).catch(error => alert(error));

        }

    }

    const handleCloseCheck = () => {
        setOpenUpdate(false);
    };

    const handleDeleteCheck = () => {
        setOpenUpdate(false);
        axios({
            method: "DELETE",
            url: "/api/product/" + idProductDelete + "/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(rows.filter((item) => item.id !== idProductDelete));
        });
    };

    const headCells = ["STT", "Tên", "Mã Qr", "Mục Tiêu", "Pac", "Box", ""];

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
                            .map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell align="center" >{index}</TableCell>
                                    <TableCell align="center" >{row.name}</TableCell>
                                    <TableCell align="center">{row.key_QR}</TableCell>
                                    <TableCell align="center">{row.targer}</TableCell>
                                    <TableCell align="center">{row.pac}</TableCell>
                                    <TableCell align="center">{row.box}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => hanldeBTNEdit(row.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => hanldeBTNDelete(row.id)}
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

    const create_product = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography className={classes.stepper} component="h1" variant="h5" align="center">
                    <strong>Thêm Sản Phẩm Mới</strong>
                </Typography>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Tên Sản Phẩm"
                                name="name"
                                onChange={((e) => {
                                    setCreateName(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Mã Qr"
                                name="code"
                                onChange={((e) => {
                                    setCreateCode(e.target.value);
                                })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="tager"
                                label="Mục Tiêu"
                                name="tager"
                                onChange={((e) => {
                                    setCreateTager(e.target.value);
                                })}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="pac"
                                label="Pac"
                                name="pac"
                                onChange={((e) => {
                                    setCreatePac(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="box"
                                label="Box"
                                name="box"
                                onChange={((e) => {
                                    setCreateBox(e.target.value);
                                })}
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
                                onClick={hanldeBTNCreate}
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

    const update_product = (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography className={classes.stepper} component="h1" variant="h5" align="center">
                    <strong>Thông Tin Sản Phẩm</strong>
                </Typography>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Tên Sản Phẩm"
                                name="name"
                                value={updateName}
                                onChange={((e) => {
                                    setUpdateName(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Mã Qr"
                                name="code"
                                value={updateCode}
                                onChange={((e) => {
                                    setUpdateCode(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="tager"
                                label="Mục Tiêu"
                                name="tager"
                                value={updateTager}
                                onChange={((e) => {
                                    setUpdateTager(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="pac"
                                label="Pac"
                                name="pac"
                                value={updatePac}
                                onChange={((e) => {
                                    setUpdatePac(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="box"
                                label="Box"
                                name="box"
                                value={updateBox}
                                onChange={((e) => {
                                    setUpdateBox(e.target.value);
                                })}
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
                                onClick={hanldeBTNUpdate}
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
                        <strong>Quản Lý Sản Phẩm</strong>
                    </Typography>
                    <Typography align="right" >
                        <IconButton>
                            <CachedIcon
                                variant="contained"
                                onClick={hanldeReload}
                                color="primary"
                            />
                        </IconButton>
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
                                color="primary"
                                onClick={hanldeBTNAdd}
                            />
                        </IconButton>
                    </Typography>
                    {openSearch &&
                        <Paper className={classes.paper_search}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Tên Sản Phẩm</b>
                                    </Typography>
                                    <TextField
                                        id="name"
                                        name="name"
                                        onChange={((e) => {
                                            setSearchName(e.target.value);
                                        })}
                                        autoComplete="name"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Mã Qr</b>
                                    </Typography>
                                    <TextField
                                        id="searchqr"
                                        name="searchqr"
                                        onChange={((e) => {
                                            setSearchQr(e.target.value);
                                        })}
                                        autoComplete="searchqr"
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
                    <Grid container spacing={3}>
                        {openInfor ?
                            <>
                                <Grid item xs={12} sm={7}>
                                    {list_data}
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    {openCheck ?
                                        <Grid item xs={12} sm={12}>
                                            {create_product}
                                        </Grid>
                                        :
                                        <>{update_product}</>
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

                <div>
                    <Dialog
                        open={openUpdate}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseCheck}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Xóa Tài Khoản"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Bạn muốn xóa sản phẩm này không ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseCheck} color="primary" variant="contained">
                                No
                            </Button>
                            <Button onClick={handleDeleteCheck} color="secondary" variant="contained">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
            </main>
        </React.Fragment>
    );
}

export default Product;