import "./Footer.css";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



function Footer() {
  return (
    <div className="footer navbar fixed-bottom navbar-dark bg-dark">
      <div className="socialMedia">
          <InstagramIcon /><TwitterIcon/><FacebookIcon /><LinkedInIcon />
      </div>
        <p> &copy; 2023 BookRec.com</p>
    </div>
  );
};

export default Footer;
