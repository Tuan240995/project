import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { useHistory, useLocation } from "react-router-dom";
import { useTime } from "react-timer-hook";
import Divider from '@material-ui/core/Divider';
import axios from "axios";


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
            width: "100%",
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
    stepper: {
        padding: theme.spacing(0, 0, 5, 0),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '15px',
    },
    button: {
        width: '250px',
        height: '75px',

        // marginTop: theme.spacing(3),
        // marginLeft: theme.spacing(1),
    },
    text: {
        // margin: '3px'
        margin: theme.spacing(2, 0, 0, 0),
    },
    text_value: {
        // width: '150px',
        padding: theme.spacing(2, 0, 0, 0),
        textAlign: 'center',
        height: '50px',
        borderStyle: "groove",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddMake = () => {
    const classes = useStyles();
    const [line, setLine] = React.useState("");
    const [listLine, setListLine] = React.useState([]);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [lineValue, setLineValue] = React.useState({
        id: "",
        line: "",
        product: "",
        shift: "",
        targer: "0",
        efficiency: "0",
        finish: "0",
        missing: "0",
        pac: 0,
        box: 0,
    });
    const [Product, setProduct] = React.useState(lineValue.finish);


    useEffect(() => {
        getLine();
    }, []);

    const getLine = () => {
        axios({
            method: "GET",
            url: "/api/line/",
            headers: { "Content-Type": "application/json" },
            params: { status: 'true' }
        }).then((res) => {
            setListLine(res.data);

        });
    };

    const getMake = (makeId) => {
        axios({
            method: "GET",
            url: "/api/make/" + makeId,
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setLineValue(res.data);
        });
    };

    const addMake = (makeId, pc) => {

        var m_finish = lineValue.finish += pc;
        let data = new FormData()
        data.append('make_id', makeId)
        data.append('is_make', "True")
        data.append('m_finish', m_finish)

        axios({
            method: "POST",
            url: "/api/update_make/",
            headers: { "Content-Type": "application/json" },
            data: data,
        }).then((res) => {
            if (res.data.success === "true") {
                setLineValue(res.data.data);
            }
        });
    };


    const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });


    const handleChangeLine = (event) => {
        if (listLine === []) {
            alert("Không có dây chuyền nào đang vận hành");
        }
        else {
            setLine(event.target.value);
            getMake(event.target.value);
        }


    };

    const handleBtnPC = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            addMake(lineValue.id, 1)
        }
    }

    const handleBtnPac = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            addMake(lineValue.id, lineValue.pac)
        }
    }

    const handleBtnBox = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            addMake(lineValue.id, lineValue.box)
        }
    }
    const handleBtnNhapTay = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            setOpenUpdate(true);
            setProduct(lineValue.finish);
            // addMake(lineValue.id, 24)
        }
    }

    const handleNhapTay = () => {
        if(!isNaN(+Product)){
            addMake(lineValue.id, Product - lineValue.finish)
            setOpenUpdate(false);
        }
        else{
            alert("Hãy Nhập Lại, Dữ Liệu Phải Là Số");
        }
    };

    const handleCancel = () => {
        setOpenUpdate(false);
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography className={classes.stepper} component="h1" variant="h4" align="center">
                        Bảng hiện thị số lượng sản phẩm lắp ráp
                        <Divider />
                    </Typography>

                    <React.Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    // required
                                    variant="outlined"
                                    fullWidth
                                    value={line}
                                    onChange={handleChangeLine}
                                >
                                    {listLine.map((option) => (
                                        <MenuItem key={option.name} value={option.makeId}>
                                            {option.name}
                                        </MenuItem>
                                    ))};
                                </Select>
                                {line === "" ?
                                    <FormHelperText error>Chọn dây chuyền ***</FormHelperText>
                                    :
                                    <></>
                                }

                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Sản Phẩm
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography className={classes.text_value} component="h5" variant="h5" align="center">
                                            <strong>{lineValue.product}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Shift
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h5" variant="h4" align="center">
                                            <strong>{lineValue.shift}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={7} >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Mục tiêu sản lượng
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h5" variant="h4" align="center">
                                            <strong>{lineValue.targer}</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Số lượng hiện tại
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h5" variant="h4" align="center">
                                            <strong>{lineValue.finish}</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Tỷ lệ hoàn thành
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography className={classes.text_value} component="h5" variant="h4" align="center">
                                            <strong>{lineValue.efficiency} %</strong>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text} component="h5" variant="h5" align="center">
                                            Số lượng còn thiếu
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h1" variant="h4" align="center">
                                            <strong>{lineValue.missing}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={5}>
                                        <Typography className={classes.text} component="h5" variant="h6" align="center">
                                            {/* Thời gian */}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h5" variant="h5" align="center">
                                            <strong>{hours} : {minutes}</strong>
                                        </Typography>
                                    </Grid> */}
                                    <Grid item xs={12} sm={12}>
                                        <div className={classes.buttons}>
                                            <Button
                                                onClick={handleBtnPC}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                            >
                                                <Typography className={classes.textBtn} component="h5" variant="h6" align="center">
                                                    <strong>+ 1 PCS</strong>
                                                </Typography>
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div className={classes.buttons}>
                                            <Button
                                                onClick={handleBtnPac}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                            >
                                                <Typography className={classes.textBtn} component="h5" variant="h6" align="center">
                                                    <strong>+ Pac</strong>
                                                </Typography>

                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div className={classes.buttons}>
                                            <Button
                                                onClick={handleBtnBox}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                            >
                                                <Typography className={classes.textBtn} component="h5" variant="h6" align="center">
                                                    <strong>+ Box</strong>
                                                </Typography>

                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div className={classes.buttons}>
                                            <Button
                                                onClick={handleBtnNhapTay}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                            >
                                                <Typography className={classes.textBtn} component="h5" variant="h6" align="center">
                                                    <strong>Nhập Tay</strong>
                                                </Typography>

                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>

                    <div>
                        <Dialog
                            open={openUpdate}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCancel}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Nhập Số Lượng Sản Phẩm"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {/* Nhập số lượng hiện tại: */}
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="san-pham"
                                            label="Số Lượng Sản Phẩm Hiện Tại"
                                            name="san-pham"
                                            value={Product}
                                            onChange={((e) => {
                                                setProduct(e.target.value);
                                            })}
                                        />
                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCancel} color="primary" variant="contained">
                                    No
                                </Button>
                                <Button onClick={handleNhapTay} color="secondary" variant="contained">
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default AddMake;