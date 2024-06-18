import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="content">
              <div className='connect'>
                <p className='phone'>Телефон: 8(9ХХ)-ХХХ-ХХ ХХ</p>
                <p className='email'>Почта: Discurs@mail.ru</p>
              </div>
              <div>
                <p className='information'>Сайт является результатом дипломной работы. <br /> Не является коммерческим проектом</p>
              </div>
            </div>
            <h2 className='city'>Кострома, 2024г.</h2>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;