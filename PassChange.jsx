import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';
import img1 from '../img/arrow.jpg';
import img4 from '../img/back20.png'

const PassChange = () => {
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async () => {
    if (name.trim() === '' || email.trim() === '' || birthdate.trim() === '') {
      setErrorMessage('필수 사항을 전부 입력해 주세요');
      return;
    }

    try {
      setErrorMessage('');
      const response = await axios.post('/api/verify-user', {
        name,
        email,
        birthdate,
      });

      if (response.data.success) {
        // 사용자 확인 성공 시, 이메일 정보를 state로 전달하며 다음 페이지로 이동
        nav('/passchanges', { state: { email: email } });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(error.response.data.message || '입력하신 정보와 일치하는 사용자가 없습니다.');
      } else {
        setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Verification failed:', error);
      }
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
          <b className='span1'>비밀번호 찾기</b>
          <br /><br /><br /><br /><br />

          <div className='login_div21'>
            <h2 style={{ textAlign: 'center', fontSize: '30px' }}>개인정보를 입력해 주세요</h2>
            <br /><br />
            <div className='login_div1'>
              <span style={{ fontSize: '20px' }}>* 이름</span>
              <br />
              <input type='text' placeholder='가입 시 입력한 이름을 입력하세요' style={{ width: '350px', height: '30px' }} value={name} onChange={(e) => setName(e.target.value)} />
              <br /><br /><br />

              <span style={{ fontSize: '20px' }}>* 이메일</span>
              <br />
              <input type='email' placeholder='가입 시 입력한 이메일을 입력하세요' style={{ width: '350px', height: '30px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
              <br /><br /><br />

              <span style={{ fontSize: '20px' }}>* 생년월일</span>
              <br />
              <input type='date' style={{ width: '350px', height: '30px', fontSize: '16px' }} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
              <br /><br /><br />
              <span style={{ color: 'gray' }}>
                (*로 표시된 부분은 필수 입력사항 입니다.)
              </span>
              <br />
              {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{errorMessage}</p>}
              <br /><br />
            </div>
          </div>
          <br /><br /><br /><br />

          <button id='button' onClick={handleVerify}>확인</button>
        </div>

      </div>
    </div>
  );
}

export default PassChange;
