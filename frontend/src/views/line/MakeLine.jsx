import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from "@material-ui/lab";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FormControl, InputLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    stepper: {
        padding: theme.spacing(0, 0, 5, 0),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        // width: '100px',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function MakeLine() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [listProduct, setListProduct] = React.useState([]);
    const [listStaff, setListStaff] = React.useState([]);
    const [product, setProduct] = React.useState("");
    const [targer, setTarger] = React.useState("");
    const [shift, setShift] = React.useState("");
    const [staff, setStaff] = React.useState("");
    const [worker, setWorker] = React.useState([]);
    const makeId = location.state.makeId

    useEffect(() => {
        getProduct();
        getUser();
        if (makeId !== "") {
            getMake();
        }
    }, []);

    const getMake = () => {
        axios({
            method: "GET",
            url: "/api/make/" + location.state.makeId + "/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setProduct(res.data.product)
            setTarger(res.data.targer)
            setShift(res.data.shift)
            setWorker(res.data.staff)
        });
    };

    const getUser = () => {
        axios({
            method: "GET",
            url: "/account/nhan-vien/",
            params: {
                first_name: "Leve 1",
            },
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res.data);
            setListStaff(res.data)
        });
    }

    const getProduct = () => {
        axios({
            method: "GET",
            url: "/api/product/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setListProduct(res.data)
        });
    };

    const currentKip = [
        {
            kip: 'MS',
        },
        {
            kip: 'AS',
        },
        {
            kip: 'NS',
        },
        {
            kip: 'ALL',
        },
    ];

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false);
    };

    const handleBtnStop = () => {
        setOpen(true);
    };

    const handleStop = () => {
        let data = new FormData()
        data.append('make_id', location.state.makeId)
        setOpen(false);
        setOpenUpdate(false);
        axios({
            method: "POST",
            url: "/api/stop_make/",
            data: data,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.data.success === "true") {
                history.push("/day-chuyen");
            } else {
                alert(res.data.message);
            }
        }).catch(error => alert("Dừng dây chuyền bị lỗi"));
    }

    const handleBtnUpdate = () => {
        setOpenUpdate(true);
        // history.push("/day-chuyen");
    };

    const handleUpdate = () => {
        let data = new FormData()
        data.append('make_id', location.state.makeId)
        data.append('product', product)
        data.append('targer', targer)
        data.append('shift', shift)
        data.append('staff', hanld_user())

        setOpen(false);
        setOpenUpdate(false);
        axios({
            method: "POST",
            url: "/api/update_make/",
            data: data,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res.data)
            if (res.data.success === "true") {
                history.push("/day-chuyen");
            } else {
                alert(res.data.message);
            }

        }).catch(error => alert("Chỉnh sửa dây chuyền bị lỗi"));
    }

    const handleBtnCancel = () => {
        history.push("/day-chuyen");
    };

    const handleBtnRun = (event) => {
        if (product === "") {
            alert("Không tìm thấy sản phẩm")
        } else if (targer === "") {
            alert("Không tìm thấy mục tiêu sản xuất")
        } else if (shift === "") {
            alert("Không tìm thấy shift")
        } else if (worker === []) {
            alert("Không tìm thấy nhân viên")
        } else if (location.state.line === "") {
            alert("Không tìm thấy line")
        } else {

            let data = new FormData()
            data.append('product', product)
            data.append('targer', targer)
            data.append('shift', shift)
            data.append('pic', shift)
            data.append('line', location.state.line)
            data.append('staff', hanld_user())

            axios({
                method: 'POST',
                url: '/api/create_make/',
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                if (res.data.success === "true") {
                    history.push("/day-chuyen");
                }
            }).catch(error => alert("Lỗi không sản xuất"));
        }
    };
    const hanld_user = () => {
        var user = "";
        worker.map((number) => {
            if (user === "") {
                user = number.username;
            } else {
                user = user + ", " + number.username;
            }
        });
        return user
    };
    const onTagsChange = (event, values) => {
        // debugger;
        setWorker(values);

    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography className={classes.stepper} component="h1" variant="h4" align="center">
                        Sản Xuất
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    variant="filled"
                                    id="line"
                                    name="line"
                                    label="Dây chuyền"
                                    defaultValue={location.state.line}
                                    fullWidth
                                    autoComplete="name"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    variant="filled"
                                    id="ngay"
                                    name="ngay"
                                    label="Ngày"
                                    defaultValue={new Date().toLocaleString()}
                                    fullWidth
                                    autoComplete="ngay"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* {product === "12" ? <></>
                                    : */}

                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Sản Phẩm
                                    </InputLabel>
                                    {/* <InputLabel id="demo-simple-select-label">Sản Phẩm</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        fullWidth
                                        displayEmpty
                                        value={product}
                                        className={classes.selectEmpty}
                                        onChange={((e) => {
                                            setProduct(e.target.value);
                                        })}
                                    >
                                        {listProduct.map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="targer"
                                    name="targer"
                                    label="Mục Tiêu"
                                    value={targer}
                                    onChange={((e) => {
                                        setTarger(e.target.value);
                                    })}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        fullWidth
                                        value={shift}
                                        onChange={((e) => {
                                            setShift(e.target.value);
                                        })}
                                    >
                                        {currentKip.map((option) => (
                                            <MenuItem key={option.kip} value={option.kip}>
                                                {option.kip}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={listStaff}
                                    value={worker}
                                    getOptionLabel={(option) => option.last_name + " ( " + option.username + " )" || option}
                                    // onChange={((e) => {
                                    //     setWorker(e.target.value);
                                    // })}
                                    onChange={onTagsChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Nhân Viên"
                                            placeholder="Nhập Nhân Viên"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />

                            </Grid>

                            <Grid item xs={12} sm={12}>
                                {location.state.makeId !== "" ?
                                    <div>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12} sm={6}>
                                                <div >
                                                    <Button
                                                        onClick={handleBtnStop}
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                    >
                                                        Kết thúc
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.buttons}>
                                                    <Button
                                                        onClick={handleBtnUpdate}
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.button}
                                                    >
                                                        Cập nhập
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    :
                                    <div>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12} sm={6}>
                                                <div >
                                                    <Button
                                                        onClick={handleBtnCancel}
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                    >
                                                        Quay lại
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.buttons}>
                                                    <Button
                                                        onClick={handleBtnRun}
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.button}
                                                    >
                                                        Bắt đầu sản xuất
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                }

                            </Grid>
                        </Grid>
                        <div>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Kết Thúc"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Bạn muốn kết thúc dây chuyền này không ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" variant="contained">
                                        No
                                    </Button>
                                    <Button onClick={handleStop} color="secondary" variant="contained">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <div>
                            <Dialog
                                open={openUpdate}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Cập Nhập Lại"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Bạn muốn thay đổi lại dây chuyền này không ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" variant="contained">
                                        No
                                    </Button>
                                    <Button onClick={handleUpdate} color="secondary" variant="contained">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment >
    );
}