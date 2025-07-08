import React from 'react';
import Header from './Header';
import Footer from './Footer';
import img4 from '../img/back20.png'

const Chat = () => {
  return (
    <div style={{
          backgroundImage: `url(${img4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '1065px' // 임시로 충분히 크게 잡기
        }}>
      <Header />

      <div className='parent'>
        <div className='fixed-box'>
          
            {/* 👉 새 페이지를 컴포넌트처럼 삽입 */}
            <iframe
              src='http://localhost:3000/'
              title='Chat Page'
              width='570px'
              height='940px'
              style={{ border: 'none' }}
            />
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;
