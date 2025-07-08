import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';
import img1 from '../img/arrow.jpg';
import img4 from '../img/back20.png'

const PassChanges = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 이전 페이지에서 전달받은 email이 있는지 확인
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // email 정보가 없으면 비정상 접근으로 간주하고 로그인 페이지로 리디렉션
      alert('비정상적인 접근입니다. 사용자 확인을 다시 진행해주세요.');
      nav('/pass-change');
    }
  }, [location, nav]);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setErrorMessage('');
      const response = await axios.put('/api/reset-password', {
        email,
        password,
      });

      if (response.data.success) {
        alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
        nav('/search'); // 로그인 페이지로 이동
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div style={{
                      backgroundImage: `url(${img4})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'fixed',
                      minHeight: '1065px' // 임시로 충분히 크게 잡기
                    }}>
      <div className='parent'>
        
        <div className='fixed-box5'>
          <img src={img1} id='img2' alt="뒤로가기" onClick={() => nav(-1)}></img>
          <b className='span1'>비밀번호 변경</b>
          <br /><br /><br /><br /><br /><br /><br /><br />
          
          <div className='login_div21'>
            <h2 style={{ textAlign: 'center', fontSize: '30px' }}>변경할 비밀번호를 입력하세요</h2>
            <br /><br />
            <div className='login_div1'>
              <span style={{ fontSize: '20px' }}>새로운 비밀번호</span>
              <br />
              <input type='password' placeholder='비밀번호를 입력하세요' style={{ width: '350px', height: '30px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
              <br /><br />

              <span style={{ fontSize: '20px' }}>새로운 비밀번호 확인</span>
              <br />
              <input type='password' placeholder='비밀번호를 다시 입력하세요' style={{ width: '350px', height: '30px' }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <br /><br />
              {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
              <br /><br />
            </div>
          </div>
          <br /><br /><br /><br /><br /><br /><br />

          <button id='button' onClick={handleResetPassword}>비밀번호 변경</button>
        </div>
        
      </div>
    </div>
  );
}

export default PassChanges;
