import React from "react";
import {
  Box,
  Link,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Fragment } from "react";

const Dashboard = () => {
  const route = useNavigate();

  const menuItems = [
    {
      text: "Account Information",
      url: "/dashboard",
    },
    {
      text: "Transactions",
      url: "/dashboard/transaction",
    },
    {
      text: "Pay & Transfer",
      url: "/dashboard/transfer",
    },
    {
      text: "Apply For Loan",
      url: "/dashboard/loan",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <img
            src="https://marcaporhombro.com/wp-content/uploads/2013/12/openbank.jpg"
            alt="Logo"
            style={{ height: "30px", marginRight: "16px" }}
          />
          <Typography variant="h6" noWrap component="div"></Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <AccountCircle style={{ color: "#06427d" }} />
          </IconButton>
          <Typography variant="overline" display="block">
            {" "}
            Last Login 11.7.2023 @ 12.09.08 pm
          </Typography>
          <IconButton>
            <Link href="/">
              <ExitToApp style={{ color: "#06427d" }} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#06427d", // Change the background color here
            color: "white",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Typography sx={{ padding: "1rem" }} variant="body2">
              <PersonIcon /> Welcome Back, RAJAKUMRAN Nishanthi
            </Typography>
          </List>
          <List>
            {menuItems.map((item, index) => (
              <Fragment key={index}>
                <Divider />
                <ListItem>
                  <ListItemButton onClick={() => route(item.url)}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg" component="main" sx={{ p: 2 }}>
          <Grid item xs={12} sm={12}>
            <Outlet />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
