
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Header from './Header';
import Footer from './Footer';
import '../style/Main.css';

const DeleteAccount = () => {
    const nav = useNavigate();
    const { user, logout } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!password) {
            setError('비밀번호를 입력해주세요.');
            return;
        }

        if (window.confirm('정말 탈퇴하시겠습니까?')) {
            try {
                const response = await axios.post('/api/delete-account', {
                    email: user.email,
                    password: password
                });

                if (response.status === 200) {
                    alert('회원 탈퇴가 완료되었습니다.');
                    logout();
                    nav('/');
                }
            } catch (err) {
                setError(err.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className='parent'>
            <Header />
            <div className='fixed-box1'>
                <div className='login_div2'>
                    <h2 style={{ fontSize: '30px', textAlign: 'center' }}>회원 탈퇴</h2>
                    <br />
                    <div className='login_div1'>
                        <span style={{ fontSize: '20px' }}>* 비밀번호</span><br />
                        <input
                            type='password'
                            placeholder='비밀번호를 입력하세요'
                            style={{ width: '350px', height: '30px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br /><br />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button id='button1' onClick={handleDelete}>탈퇴하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DeleteAccount;
