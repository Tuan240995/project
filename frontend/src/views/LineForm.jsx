import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import { Divider, FormControl, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import TimeField from 'react-simple-timefield';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function LineForm() {
    const classes = useStyles();
    // const [currency, setCurrency] = React.useState('MAFOI00HD7');
    const [valueShift, setValueShift] = React.useState('time');
    const [time, setTime] = React.useState('12:34');
    const currencies = [
        {
            value: 'xv38dcb',
            label: 'MA8FDIO86H',
        },
        {
            value: 'xv38fddcb',
            label: 'MALKF86H87',
        },
        {
            value: 'xv38dcdfbdf',
            label: 'MAFOI00HD7',
        },
        {
            value: 'xv38dfdcb',
            label: 'MAFFDOI007',
        },
    ];

    const currentKip = [
        {
            value: '8h',
            label: 'Ca 1',
        },
        {
            value: '8h',
            label: 'Ca 2',
        },
        {
            value: '8h',
            label: 'Ca 3',
        },
    ];

    const handleChangeProduct = (event) => {
        // setCurrency(event.target.value);
    };

    const handleChangeKip = (event) => {
        // setCurrency(event.target.value);
    };



    const handleChangeShift = (event) => {
        setValueShift(event.target.value);
    };


    return (
        <Container component="main" maxWidth="xs">
            <Grid style={{ margin: 20 }}>
                <Typography variant="h3" align="center">
                    <strong>Sản Xuất</strong>
                </Typography>
            </Grid>
            {/* <Grid style={{ margin: 20 }}>
        <Typography>change the screen size to see the effect!</Typography>
      </Grid>

      <Typography variant="h6">
        <strong>Hidde icon on breakpoints sm (between 600px - 960px)</strong>
      </Typography> */}
            <Divider style={{ margin: 20 }} />
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fline"
                            name="line"
                            variant="filled"
                            required
                            fullWidth
                            defaultValue="Line 1"
                            InputProps={{
                                readOnly: true,
                            }}
                            id="line"
                            label="Dây Chuyền"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="filled"
                            required
                            fullWidth
                            id="ngay"
                            label="Ngày"
                            defaultValue="20 / 10 / 2022"
                            InputProps={{
                                readOnly: true,
                            }}
                            name="ngay"
                            autoComplete="lngay"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-select-currency"
                            variant="outlined"
                            select
                            fullWidth
                            label="Sản Phẩm"
                            onChange={handleChangeProduct}

                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="muctieu"
                            label="Mục Tiêu"
                            type="muctieu"
                            id="muctieu"
                            autoComplete="muctieu"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Radio
                            checked={valueShift === 'time'}
                            onChange={handleChangeShift}
                            value="time"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'Time' }}
                        /><b> Time </b>
                        <Radio
                            checked={valueShift === 'kip'}
                            onChange={handleChangeShift}
                            value="kip"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'Kip' }}
                        /> <b> Ca </b>
                    </Grid>
                    {valueShift === 'time'
                        ? <>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    // defaultValue={this.props.single}
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, max: 24 } }}
                                    id="outlined-basic"
                                    label="Hours"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    // defaultValue={this.props.single}
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                                    id="outlined-basic"
                                    label="Minute"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    id="standard-select-currency"
                                    variant="outlined"
                                    select
                                    fullWidth
                                    label="Kip"
                                    onChange={handleChangeKip}

                                >
                                    {currentKip.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </>
                    }
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
            </div>
        </Container>
    );
}
