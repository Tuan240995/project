import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
import { useHistory, useLocation } from "react-router-dom";
import { useTime } from "react-timer-hook";
import Divider from '@material-ui/core/Divider';
import worker from "./../Images/worker.jpg";
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
            width: "75%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        backgroundColor: "#CCD6A6",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(2),
        },
    },
    stepper: {
        // backgroundColor: "54B435",
        padding: theme.spacing(3),
        // padding: theme.spacing(0, 0, 5, 0),
    },
    headers: {
        backgroundColor: "#54B435",
    },
    content: {
        backgroundColor: "#F5EA5A",
        padding: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '15px',
    },
    button: {
        width: '150px',
        height: '75px',

        // marginTop: theme.spacing(3),
        // marginLeft: theme.spacing(1),
    },
    text: {
        // margin: '3px'
        margin: theme.spacing(2, 0, 0, 0),
    },
    text_unit: {
        margin: theme.spacing("36px", 0, 0, "-26px"),
    },
    text_value: {
        // width: '150px',
        backgroundColor: "#C7BCA1",
        padding: theme.spacing(2, 0, 0, 0),
        textAlign: 'center',
        height: '50px',
        borderStyle: "groove",
    },
    text_value_header: {
        backgroundColor: "#C7BCA1",
        padding: theme.spacing(1, 0, 0, 0),
        textAlign: 'center',
        height: '60px',
        borderStyle: "groove",
    },
    text_time: {
        backgroundColor: "#C7BCA1",
        // padding: theme.spacing(2, 0, 0, 0),
        textAlign: 'center',
        height: '30px',
        borderStyle: "groove",
    },
    text_t: {
        margin: theme.spacing("17px", 0, 0, "-17px"),
        padding: theme.spacing(0, 0, 0, 0),
    },
    time: {
        paddingTop: theme.spacing(4),
    },
    img: {
        margin: theme.spacing("35px", 0, 0, 0),
        // padding: theme.spacing(0, 0, 0, 0),

    },

}));


const Shows = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [line, setLine] = React.useState("");
    const [makeID, setMakeID] = React.useState("");
    const [isCheck, setIsCheck] = React.useState(false);
    const [shours, setHours] = React.useState("0");
    const [sminutes, setMinutes] = React.useState("0");
    const [sseconds, setSeconds] = React.useState("0");
    const [listLine, setListLine] = React.useState([]);
    const [lineValue, setLineValue] = React.useState({
        id: "",
        line: "",
        product: "",
        shift: "",
        targer: "0",
        efficiency: "0",
        finish: "0",
        missing: "0",
    });

    useEffect(() => {
        getLine();
    }, []);

    useEffect(() => {
        if (isCheck) {
            getMake();
            const interval = setInterval(() => {
                getMake();
            }, 5000);
            return () => clearInterval(interval);
        };
    }, [makeID]);

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

    const getMake = () => {
        axios({
            method: "GET",
            url: "/api/make/" + makeID + "/",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            setLineValue(res.data);
            const time = res.data.time.split(":");
            setHours(time[0]);
            setMinutes(time[1]);
            setSeconds(time[2]);
        });
    };

    const handleChangeLine = (event) => {
        if (listLine === []) {
            alert("Không có dây chuyền nào đang vận hành");
        }
        else {
            setLine(event.target.value);
            setIsCheck(true);
            setMakeID(event.target.value);
        }
    };

    const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });


    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.headers}>
                        <Typography className={classes.stepper} component="h1" variant="h4" align="center">
                            <strong>Bảng hiện thị số lượng sản phẩm lắp ráp</strong>
                        </Typography>
                    </div>
                    <div className={classes.content}>


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
                                                <strong>{option.name}</strong>
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
                                            <Typography className={classes.text_value} component="h5" variant="h4" align="center">
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
                                <Grid item xs={12} sm={12} >
                                    <Grid container spacing={3}>
                                        <Grid item xs={0} sm={3}>
                                            <img className={classes.img} src={worker} />
                                        </Grid>
                                        <Grid item xs={12} sm={9}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography className={classes.text} component="h5" variant="h4" align="center">
                                                        <strong>Mục Tiêu</strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    <Typography className={classes.text_value_header} component="h5" variant="h3" align="center">
                                                        <strong>{lineValue.targer} </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={1}>
                                                    <Typography className={classes.text_unit} component="h6" variant="h5" align="center">
                                                        <strong>Pcs</strong>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={4}>
                                                    <Typography className={classes.text} component="h5" variant="h4" align="center">
                                                        <strong>Hoàn Thành</strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    <Typography className={classes.text_value_header} component="h5" variant="h3" align="center">
                                                        <strong>{lineValue.finish} </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={1}>
                                                    <Typography className={classes.text_unit} component="h6" variant="h5" align="center">
                                                        <strong>Pcs</strong>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={4}>
                                                    <Typography className={classes.text} component="h5" variant="h4" align="center">
                                                        <strong>Hiệu Suất</strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    <Typography className={classes.text_value_header} component="h5" variant="h3" align="center">
                                                        <strong>{lineValue.efficiency} %</strong>
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                            <div className={classes.time}>
                                                <Divider />
                                                <br />
                                                <Grid container spacing={3} >
                                                    {/* Bat dau */}
                                                    <Grid item xs={12} sm={1}></Grid>
                                                    {/* gio */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{shours} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Giờ</strong>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* Phut */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{sminutes} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Phút</strong>
                                                                </div>

                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* giay */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{sseconds} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Giây</strong>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} sm={4}>
                                                        <Typography component="h5" variant="h5" align="left">
                                                            <strong>Thời gian bắt đầu</strong>
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                                <Grid container spacing={3}>
                                                    {/* Hienj tại */}
                                                    <Grid item xs={12} sm={1}></Grid>
                                                    {/* gio */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{hours} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Giờ</strong>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* Phut */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{minutes} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Phút</strong>
                                                                </div>

                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* giay */}
                                                    <Grid item xs={12} sm={2}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={9}>
                                                                <Typography className={classes.text_time} component="h5" variant="h5" align="center">
                                                                    <strong>{seconds} </strong>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className={classes.text_t}>
                                                                    <strong>Giây</strong>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} sm={4}>
                                                        <Typography component="h5" variant="h5" align="left">
                                                            <strong>Thời gian hiện tại</strong>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </div>
                </Paper>
            </main>
        </React.Fragment >
    );
}

export default Shows;