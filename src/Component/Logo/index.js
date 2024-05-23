import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// project import
// import Logo from "./LogoMain";
// import config from "config";

// ==============================|| MAIN LOGO ||============================== //

const Logo = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple component={Link} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h5" component="h2">
          Control & Monitoring Plant
        </Typography>
        <Chip
          label="1.0"
          variant="outlined"
          size="small"
          color="secondary"
          sx={{
            mt: 0.5,
            ml: 1,
            fontSize: "0.725rem",
            height: 20,
            "& .MuiChip-label": { px: 0.5 },
          }}
        />
      </Stack>
    </ButtonBase>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default Logo;
