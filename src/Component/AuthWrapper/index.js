import PropTypes from "prop-types";

// material-ui
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// project import
// import Logo from "components/logo";

// assets
import AuthCard from "../AuthCard";
import AuthFooter from "../AuthFooter";
import AuthBackground from "../AuthBackground";
import Logo from "../Logo";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const toDashboard = () => {
    navigate("/");
  };
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sx={{ ml: 3, mt: 3, mr: 3 }}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Logo />
          <Button onClick={toDashboard}>Dashboard</Button>
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 210px)",
                sm: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
