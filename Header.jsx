import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../img/sing_logo2.jpg.png';
import '../style/Main.css';
import { useAuth } from './AuthContext.jsx'; // AuthContext 사용

const Header = () => {
    const nav = useNavigate();
    const { isLoggedIn, user, logout } = useAuth(); // AuthContext에서 상태와 함수 가져오기

    const handleLogout = () => {
        logout(); // 로그아웃 함수 호출
        nav('/'); // 홈페이지로 이동
    };

    return (
        <div id="div1">
            <header id="header">
                <div className="header-top">
                    <span id="main" onClick={() => nav('/')}>
                        <img src={img} alt="logo" />
                    </span>

                    {isLoggedIn ? (
                        <div className="login-group">
                            <span className="login_h3">{user && (user.nickname || user.NICKNAME)}님 환영합니다!</span>
                            <span className="login_h2">/</span>
                            <span className="login_h1" onClick={handleLogout}>
                                로그아웃
                            </span>
                        </div>
                    ) : (
                        <div className="login-group">
                            <span className="login_h" onClick={() => nav('/search')}>
                                로그인
                            </span>
                            <span className="login_h2">/</span>
                            <span className="login_h1" onClick={() => nav('/member')}>
                                회원가입
                            </span>
                        </div>
                    )}
                </div>
                <div className="header-bottom">
                    <span id="main_main" onClick={() => nav('/')} >
                            메인
                    </span>
                    <span id="main_sizang" onClick={() => nav('/sizang')}>
                        위치정보
                    </span>
                    <span id="main_sns" onClick={() => nav('/sns')}>
                        SNS
                    </span>
                    <span id="main_ask" onClick={() => nav('/ask')}>
                        알려줘!
                    </span>
                    <span id="main_infor" onClick={() => nav('/infor')}>
                        My
                    </span>
                </div>
            </header>
        </div >
    );
};

export default Header;