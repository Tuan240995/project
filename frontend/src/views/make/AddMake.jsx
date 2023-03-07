import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
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


const AddMake = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [line, setLine] = React.useState("");
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
        const data = lineValue;
        data.finish += pc;
        axios({
            method: "PUT",
            url: "/api/make/" + makeId + "/",
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((res) => {
            setLineValue(res.data);
        });
    };


    const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });


    const handleChangeLine = (event) => {
        if(listLine===[]){
            alert("Không có dây chuyền nào đang vận hành");
        }
        else{
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

    const handleBtnKit = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            addMake(lineValue.id, 12)
        }
    }

    const handleBtnBox = () => {
        if (lineValue.id === "") {
            alert("Hãy chọn dây chuyền sản suất");
        } else {
            addMake(lineValue.id, 24)
        }
    }


    const handleCancel = () => {
        history.push("/day-chuyen");
    };
    const handleRun = (event) => {
        history.push("/day-chuyen");
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
                                            Thời gian
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_value} component="h5" variant="h5" align="center">
                                            <strong>{hours} : {minutes}</strong>
                                        </Typography>
                                    </Grid>
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
                                                onClick={handleBtnKit}
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                            >
                                                <Typography className={classes.textBtn} component="h5" variant="h6" align="center">
                                                    <strong>+ 1 kit/tray</strong>
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
                                                    <strong>+ 1 box</strong>
                                                </Typography>

                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default AddMake;