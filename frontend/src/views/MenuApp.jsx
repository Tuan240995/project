import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import authService from "../service/authService";
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { black, white } from "material-ui/styles/colors";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // width: '100%',
    textAlign: 'left',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  body_root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  body_gridList: {
    // width: 500,
    // height: 450
    width: "60%",
    height: "70%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: black,
    'text-align': 'center',
    'text-decoration': 'none',
  },
  link_head: {
    color: white,
    'text-align': 'center',
    'text-decoration': 'none',
  },
}));

export default function MenuApp() {
  const classes = useStyles();
  const [left, setLeft] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => () => {
    setLeft(open);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>{authService.userAccess().username}</MenuItem>
      <MenuItem onClick={() => authService.logOut()}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  console.log(authService.userAccess().admin)

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.link_head} to="/">
                SATOMAS Viet Nam
              </Link>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={left}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <div className={classes.fullList}>
              {authService.userAccess().position === "Nhân Viên" ?
                <List>
                  <Link className={classes.link} to="/san-xuat">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="San Xuat" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to="/quet-qr">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Quet Qr" />
                    </ListItem>
                  </Link>
                </List>
                :
                <List>
                  <Link className={classes.link} to="/day-chuyen">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Dây Chuyền" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to="/lap-giap">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Lắp Giáp" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to="/san-xuat">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="San Xuat" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to="/quet-qr">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Quet Qr" />
                    </ListItem>
                  </Link>
                </List>
              }

              <Divider />
              {authService.userAccess().admin === "true" &&
                <List>
                  <Link className={classes.link} to="/quan-ly-chung">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Quản Lý Chung" />
                    </ListItem>
                  </Link>
                  <Link className={classes.link} to="/nhan-vien">
                    <ListItem button>
                      <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                      <ListItemText primary="Nhân Viên" />
                    </ListItem>
                  </Link>
                </List>
              }

            </div>
          </div>
        </SwipeableDrawer>
        {/* {renderMobileMenu} */}
        {renderMenu}
      </div>

    </>
  );
}
