import React, { useEffect } from "react";
import StyledCard from "./Card";
import { Grid, Typography, Divider } from "@material-ui/core";
import axios from "axios";

const Line = () => {
  const [listLine, setListLine] = React.useState([]);

  useEffect(() => {
    getLine();
  }, []);

  const getLine = () => {
    axios({
      method: "GET",
      url: "/api/line/",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      setListLine(res.data);
    });
  };

  return (
    <Grid
      align="center"
      border="1px solid #000"
      alignItems="center"
      justify="center"
    >
      <Grid style={{ margin: 20 }}>
        <Typography variant="h3">
          <strong>Tiến Độ Lắp Giáp</strong>
        </Typography>
      </Grid>
      {/* <Grid style={{ margin: 20 }}>
        <Typography>change the screen size to see the effect!</Typography>
      </Grid>

      <Typography variant="h6">
        <strong>Hidde icon on breakpoints sm (between 600px - 960px)</strong>
      </Typography> */}
      <Divider style={{ margin: 20 }} />
      <Grid container item xs={12} alignItems="center" justify="center">
        {listLine.map((option) => (
          <Grid container item sm={3}>
            <Grid container item lg={12} style={{ marginBottom: 25 }}>
              <StyledCard
                line={option.name}
                makeId={option.makeId}
                pic={option.pic}
                sanPham={option.product}
                percentage={option.efficiency}
                targer={option.targer}
                finish={option.finish}
              />
            </Grid>
          </Grid>
        ))};



          {/* <Grid container item lg={6} style={{ marginBottom: 25 }}>
            <StyledCard
              primary="Line 6"
              // secondary="ksdnfkdsgk sdfnsd"
              percentage={78.8}
              color="linear-gradient(60deg, rgba(67,160,71,1) 0%, rgba(255,235,59,1) 100%)"
              targer="5000"
              finish="1500"
            />
          </Grid>
        </Grid>  */}
      </Grid>
    </Grid>
  );
}

export default Line;