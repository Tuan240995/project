import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Label from "@material-ui/icons/Label";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    position: "relative",
    // border: "1px solid #000",
    padding: theme.spacing(1, 2),
    width: "100%",
    margin: theme.spacing(2),
  },
  percent: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 4),
  },
  text: {
    margin: theme.spacing(-1, 0, 3, 0),
  },
  title: {
    // background: "#745223",
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
  persentage: {
    padding: theme.spacing(1),
    // border: "1px solid #000",
    margin: theme.spacing(1),
  },
  detail: {
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0, 2, 0),
    // border: "1px solid #000",
  },

  icons: {
    minWidth: 100,
    minHeight: 100,
    // boxShadow: " 10px 10px 5px #aaaaaa",
    color: "#90A17D",
    height: "130px",
    width: "130px",
    display: "flex",
    position: "absolute",
    zIndex: 0,
    top: "-37px",
    left: "-24px",
  },
  text_tag: {
    margin: theme.spacing(1, 0, 0, -1),
    zIndex: 1,
  },
  strong: {
    color: "#434242",
  }
}));


const Card = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const percen = Math.round((props.percentage + Number.EPSILON) * 100) / 100;
  const pers = percen <= 100 ? percen : 100;
  const color_chart = percen <= 100 ? "" : "#32FF6A";

  const handleCard = () => {
    history.push({
      pathname: "/van-hanh",
      state: { 
        line: props.line,
        makeId :props.makeId
      },
    });
  };


  return (
    <Paper className={classes.card} onClick={handleCard}>
      <Grid container>
        <Hidden only="sm">
          <Label className={classes.icons} boxShadow={3} />
          <h2 className={classes.text_tag}><b><strong>{props.line}</strong></b></h2>
        </Hidden>
        <CircularProgressbar
          className={classes.percent}
          value={pers}
          text={`${pers}%`}
          styles={buildStyles({
            textColor: color_chart,
            pathColor: color_chart,
          })}
        />
      </Grid>
      <Typography className={classes.text} variant="h3" align="center">
        {props.finish !== "" ?
          <b>{props.finish} / {props.targer}</b>
          :
          <> <b>.</b></>
        }
        {/* <b>{props.finish} / {props.targer}</b> */}
      </Typography>

      <Divider style={{ color: "#000" }} />

      <Grid container xs justify="flex-start" className={classes.title}>
        <Typography variant="h5">
          Sản Phẩm: <strong className={classes.strong}>{props.sanPham}</strong>
        </Typography>
      </Grid>
    </Paper>
  );
}

export default Card;

