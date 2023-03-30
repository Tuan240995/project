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

const ListUser = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const [status, setStatusBase] = React.useState("");

    const [openSearch, setOpenSearch] = React.useState(false);
    const [openInfor, setOpenInfor] = React.useState(false);
    const [openCheck, setOpenCheck] = React.useState(false);
    const [openCheckPW, setOpenCheckPW] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [searchUserName, setSearchUserName] = React.useState("");
    const [searchUserId, setSearchUserId] = React.useState("");
    const [searchPosition, setSearchPosition] = React.useState("");

    const [updateUserID, setUserID] = React.useState("");
    const [updateName, setUpdateName] = React.useState("");
    const [updateCode, setUpdateCode] = React.useState("");
    const [updatePosition, setUpdatePosition] = React.useState("");
    const [updatePassword, setUpdatePassword] = React.useState("");
    const [updateRePassword, setUpdateRePassword] = React.useState("");


    const [createName, setCreateName] = React.useState("");
    const [createCode, setCreateCode] = React.useState("");
    const [createPosition, setCreatePosition] = React.useState("");
    const [createPassword, setCreatePassword] = React.useState("");

    const [idUserDelete, setIdUserDelete] = React.useState("");


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
            url: "/account/nhan-vien/",
            params: {
                last_name: searchUserName,
                username: searchUserId,
                first_name: searchPosition,
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(res.data);
        });
    }

    const hanldeBTNAdd = () => {
        setOpenCheckPW(false);
        setOpenCheck(true);
        setOpenInfor(true);

    };

    const hanldeBTNEdit = (user_id) => {
        setOpenCheckPW(false);
        setOpenCheck(false);
        setOpenInfor(true);
        // getDataEdit(user_id);
        const users = rows.filter((item) => item.id === user_id);
        console.log(users)
        setUserID(users[0].id);
        setUpdateName(users[0].last_name);
        setUpdateCode(users[0].username);
        setUpdatePosition(users[0].first_name);
    };

    const hanldeBTNDelete = (user_id) => {
        setOpenUpdate(true);
        setIdUserDelete(user_id);

    };

    const hanldeBTNCancel = () => {
        setOpenCheckPW(false);
        setOpenInfor(false);

    };

    const hanldeBTNCreate = () => {
        setOpenCheckPW(false);
        setOpenInfor(false);

        let data = new FormData()
        data.append('name', createName)
        data.append('code', createCode)
        data.append('position', createPosition)
        data.append('password', createPassword)

        axios({
            method: "POST",
            url: "/account/nhan-vien/",
            data: data,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.data.success === "true") {
                getData();
                setStatusBase({ msg: "Tạo Tài Khoản Thành Công", key: Math.random() });
            } else {
                alert(res.data.message);
            }
        }).catch(error => alert("Tạo tài khoản bị lỗi"));

    };
    const hanldeReload = () => {
        getData();
        setOpenSearch(false);
        hanldeBTNCancel();
    };

    const updateUser = (data) => {
        axios({
            method: "PUT",
            url: "/account/nhan-vien/" + updateUserID + "/",
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((res) => {
            setStatusBase({ msg: "Cập Nhập Thành Công", key: Math.random() });
            // alert("Cập Nhập Thành Công")
            setOpenCheckPW(false);
            // setOpenInfor(false);
            getData()
        }).catch(error => alert(error));
    }

    const hanldeBTNUpdate = () => {


        if (updateName === "" || updateCode === "" || updatePosition === "") {
            alert(" Hãy Nhập Đủ Thông Tin");
        } else {
            let data = new FormData()
            data.append('last_name', updateName)
            data.append('username', updateCode)
            data.append('first_name', updatePosition)


            if (openCheckPW) {
                if (updatePassword !== "" && updatePassword === updateRePassword) {
                    data.append('password', updatePassword);
                    updateUser(data);
                    setOpenInfor(false);
                } else {
                    alert(" Nhập Lại Mật Khẩu...");
                }
            } else {
                updateUser(data);
            }

        }

    }

    const hanldeBTNCheckPW = () => {
        setOpenCheckPW(true);
    };


    const handleCloseCheck = () => {
        setOpenUpdate(false);
    };

    const handleDeleteCheck = () => {
        setOpenUpdate(false);
        axios({
            method: "DELETE",
            url: "/account/nhan-vien/" + idUserDelete + "/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setRows(rows.filter((item) => item.id !== idUserDelete));
        });
    };

    const headCells = ["STT", "Tên", "Mã Nhân Viên", "Chức Vụ", ""];

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
                                    <TableCell align="center" >{row.last_name}</TableCell>
                                    <TableCell align="center">{row.username}</TableCell>
                                    <TableCell align="center">{row.first_name}</TableCell>
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
                                label="Mã Nhân Viên"
                                name="code"
                                onChange={((e) => {
                                    setCreateCode(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Chức Vụ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={((e) => {
                                        setCreatePosition(e.target.value);
                                    })}
                                    label="Chức Vụ"
                                >
                                    {selectPosition.map((option) => (
                                        <MenuItem key={option.position} value={option.position}>
                                            {option.position}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                onChange={((e) => {
                                    setCreatePassword(e.target.value);
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
                                label="Mã Nhân Viên"
                                name="code"
                                value={updateCode}
                                onChange={((e) => {
                                    setUpdateCode(e.target.value);
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Chức Vụ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={updatePosition}
                                    onChange={((e) => {
                                        setUpdatePosition(e.target.value);
                                    })}
                                    label="Chức Vụ"
                                >
                                    {selectPosition.map((option) => (
                                        <MenuItem key={option.position} value={option.position}>
                                            {option.position}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                            onChange={((e) => {
                                                setUpdatePassword(e.target.value);
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="re-password"
                                            label="Re-Password"
                                            name="password"
                                            onChange={((e) => {
                                                setUpdateRePassword(e.target.value);
                                            })}
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
                        <strong>Quản Lý Nhân Viên</strong>
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
                                        <b>Tên</b>
                                    </Typography>
                                    <TextField
                                        id="searchUserName"
                                        name="searchUserName"
                                        onChange={((e) => {
                                            setSearchUserName(e.target.value);
                                        })}
                                        autoComplete="searchUserName"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Typography>
                                        <b>Mã Nhân Viên</b>
                                    </Typography>
                                    <TextField
                                        id="searchUserId"
                                        name="searchUserId"
                                        onChange={((e) => {
                                            setSearchUserId(e.target.value);
                                        })}
                                        autoComplete="searchUserId"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography>
                                        <b>Chức Vụ</b>
                                    </Typography>

                                    <FormControl className={classes.formControl}>
                                        {/* <InputLabel id="demo-simple-select-label">Chức Vụ</InputLabel> */}
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            required
                                            fullWidth
                                            onChange={((e) => {
                                                setSearchPosition(e.target.value);
                                            })}
                                        >
                                            {selectPosition1.map((option) => (
                                                <MenuItem key={option.position} value={option.value}>
                                                    {option.position}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                Bạn muốn xóa tài khoản này không ?
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

export default ListUser;