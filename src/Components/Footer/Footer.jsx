import React from 'react';
import Icon from '../Icon/Icon';
import '../../Style/Footer.scss';
import '../../Style/SocialMeadiaLogo.scss';

function Footer() {
  return (
    <div className='footer'>
      <footer>
      <hr /><br />
        <div className='icon'>
          <Icon Path='/Images/SocialMediaLogos/tiktok.png' url='#tiktok' alt="Tic Tok" />
          <Icon Path='/Images/SocialMediaLogos/instagram.png' url='#instergram' alt="Instagram" />
          <Icon Path='/Images/SocialMediaLogos/facebook.png' url='#facebook' alt="FaceBook" />
          <Icon Path='/Images/SocialMediaLogos/whatsapp.png' url='#whatsApp' alt="WhatsApp" />
          <Icon Path='/Images/SocialMediaLogos/twitter.png' url='#twitter' alt="Twitter" />
        </div>
        <div className='copy-right'>
          &copy;Movies Review Application 2023
        </div>
      </footer>
    </div>
  )
}

export default Footer
