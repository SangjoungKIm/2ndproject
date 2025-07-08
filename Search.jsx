import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../img/sing_logo1.jpg.png';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';
import PassChange from './PassChange';
import Member from './Member';
import img1 from '../img/arrow.jpg';
import { useAuth } from './AuthContext.jsx'; // useAuth 훅 가져오기
import img4 from '../img/back20.png'

const Search = () => {
    const nav = useNavigate();
    const { login } = useAuth(); // AuthContext의 login 함수 사용

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (userId.trim() === '' || password.trim() === '') {
            setErrorMessage('아이디와 패스워드를 확인하세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('로그인 성공:', data);
                setErrorMessage('');

                // 로그인 성공 시 AuthContext에 사용자 정보 저장
                login(data.user); // 서버에서 받은 user 객체로 login 함수 호출

                // 로그인 성공 시 메인 페이지로 이동
                nav('/');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 요청 실패:', error);
            setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
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
            <div className="parent">
                <div className="fixed-box5">
                    {/* <img src={img1} id='img2'></img> */}
                    <img src={img} id="img1"></img>
                    <br></br>
                    <br></br>

                    <h1 id="login">싱싱해</h1>

                    <div className="login_div21">
                        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>로그인</h2>
                        <div className="login_div1">
                            <span style={{ fontSize: '20px' }}>이메일 </span>
                            <br></br>
                            <input type="text" placeholder="이메일을 입력 하세요" style={{ width: '450px', height: '30px' }} value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                            <br></br>
                            <span style={{ fontSize: '20px' }}>패스워드 </span>
                            <br></br>
                            <input type="password" placeholder="패스워드를 입력 하세요" style={{ width: '450px', height: '30px' }} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <br></br>

                        
                            <p className="passsearch" onClick={() => { nav('/passchange'); }}>
                                비밀번호를 잊으셨나요?
                            </p>
                            <br></br>
                        </div>
                        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                    </div>

                    <br></br>
                    
                    <button id="button" onClick={handleLogin}>
                        로그인 하기
                    </button>
                    <br></br>

                    <p id="passsearch1" onClick={() => { nav('/member'); }}>
                        회원가입 하기
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Search;