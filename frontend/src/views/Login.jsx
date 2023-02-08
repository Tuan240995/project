import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import image from "./Images/image.jpg";
import authService from "./../service/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignInSide(props) {

  if (authService.isLoggedIn()) {

    props.history.push("/");

  }

  const classes = useStyles();


  const [account, setAccount] = React.useState({ username: "", password: "" });

  const handelAccount = (property, event) => {

    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);

  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handelLogin();
    }
  }

  const handelLogin = () => {
    let data = new FormData()
    data.append('username', account.username)
    data.append('password', account.password)

    axios({
      method: 'POST',
      url: '/account/login/',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      if (res.data.success === "true") {
        authService.doLogIn(account.username);
        window.location.reload();
      }
    }).catch(error => alert("Your username or password is incorrect!"));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} >
            <TextField
              onChange={(event) => handelAccount("username", event)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={(event) => handelAccount("password", event)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handelLogin}
            >
              Sign In
            </Button>
            <Box mt={5}>
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
