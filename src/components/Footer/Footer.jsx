import React from 'react'
import './Footer.css'

function Footer() {
    return (
      <>
        <footer id="footer">
          <div className="container">
            <div className="footer__content">
              <div className="content">
                <div className="footer__contacts">
                  <p className="footer__contacts-title">For questions and suggestions</p>
                  <div className="footer__contacts-mail">
                    <p className="mail">email@shelter.com</p>
                  </div>
                  <div className="footer__contacts-phone">
                    <p className="phone">+13 674 567 75 54</p>
                  </div>
                </div>
                <div className="footer__locations">
                  <p className="footer__locations-title">We are waiting for your visit</p>
                  <div className="footer__locations-boston">
                    <a href="https://www.google.com/maps/d/viewer?mid=1jf-JyjY4kV1k39pwUYCy4yDfvXQ&hl=en_US&ll=42.359895385593276%2C-71.0931515&z=13"></a>
                    <p className="boston">1 Central Street, Boston<br/>
                        (entrance from the store)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
  
  export default Footer