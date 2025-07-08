import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';
import img4 from '../img/back20.png'

const Main_Infor = () => {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: '', name: '', nickname: '', birthdate: '', phone: '', userType: 'GENERAL' });
    const [loading, setLoading] = useState(true);
    const [careerProof, setCareerProof] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userString = sessionStorage.getItem('user');
                if (!userString) {
                    alert('세션에 사용자 정보가 없습니다. 다시 로그인해주세요.');
                    nav('/search');
                    return;
                }

                const user = JSON.parse(userString);
                if (!user || !user.email) {
                    alert('로그인 상태 확인 실패. 사용자 이메일 정보가 없습니다. 다시 로그인해주세요.');
                    nav('/search');
                    return;
                }

                const response = await axios.get(`/api/user/${user.email}`);
                const data = response.data;

                setUserInfo({
                    email: data.email || '',
                    name: data.name || '',
                    nickname: data.nickname || '',
                    birthdate: data.birthdate || '',
                    phone: data.phone || '',
                    userType: data.userType || 'GENERAL'
                });

            } catch (error) {
                console.error('사용자 정보 불러오기 실패:', error);
                alert('사용자 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [nav]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setCareerProof(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', userInfo.email);
            formData.append('nickname', userInfo.nickname);
            formData.append('birthdate', userInfo.birthdate);
            formData.append('phone', userInfo.phone);
            formData.append('userType', userInfo.userType);
            if (careerProof) {
                formData.append('careerProof', careerProof);
            }

            const response = await axios.post('/api/user/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            console.log('서버 응답:', response.data);
            alert('회원정보가 성공적으로 변경되었습니다.');
            nav('/my'); // 성공 시 마이페이지로 이동
        } catch (error) {
            console.error('회원정보 변경 실패:', error);
            if (error.response) {
                console.error('서버 응답 데이터:', error.response.data);
                console.error('서버 응답 상태:', error.response.status);
            }
            alert('회원정보 변경 중 문제가 발생했습니다.');
        }
    };

    if (loading || !userInfo) { // 로딩 중이거나 userInfo가 null이면 로딩 화면 표시
        return <div>로딩 중...</div>;
    }

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
                <div className='fixed-box7'>
                    <form onSubmit={handleSubmit}>
                        
                        <br /><br />
                        <div className='login_div2' style={{marginTop:'50px', minHeight:'950px',maxHeight:'950px',overflowY:'scroll'}}>

                            <h2 style={{ fontSize: '30px', textAlign: 'center' }}>회원정보 변경</h2>
                            <br />
                            <div className='login_div1'>
                                <span style={{ fontSize: '20px' }}>* 이메일</span><br />
                                <p style={{ fontSize: '18px', padding: '5px 0' }}>{userInfo.email}</p>
                                <br />
                                <span style={{ fontSize: '20px' }}>* 이름</span><br />
                                <p style={{ fontSize: '18px', padding: '5px 0' }}>{userInfo.name}</p>
                                <br />
                                <span style={{ fontSize: '20px' }}>* 닉네임</span><br />
                                <input type='text' name="nickname" placeholder='닉네임을 입력 하세요' style={{ width: '350px', height: '30px' }} value={userInfo.nickname} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 생년월일</span><br />
                                <input type='date' name="birthdate" style={{ fontSize: '20px', width: '350px', height: '30px' }} value={userInfo.birthdate} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 휴대폰 번호</span><br />
                                <input type='tel' name="phone" placeholder='휴대폰 번호를 -없이 입력 하세요' style={{ width: '350px', height: '30px' }} value={userInfo.phone} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 사용자 유형</span><br />
                                <label>
                                    <input type="radio" name="userType" value="GENERAL" checked={userInfo.userType === 'GENERAL'} onChange={handleChange} />
                                    일반
                                </label>
                                <label>
                                    <input type="radio" name="userType" value="CHEF" checked={userInfo.userType === 'CHEF'} onChange={handleChange} />
                                    요리사
                                </label>
                                <br /><br />
                                {userInfo.userType === 'CHEF' && (
                                    <div>
                                        <span style={{ fontSize: '20px' }}>* 경력 증명</span><br />
                                        <input type="file" name="careerProof" onChange={handleFileChange} />
                                        <br /><br />
                                    </div>
                                )}
                                <br /><br />
                                <button id='button1' type='submit'>변경 완료</button>
                                <button id='button2' type='button' onClick={() => nav('/passchange')}>비밀번호 변경</button>
                                <button id='button3' type='button' onClick={() => nav('/delete-account')}>회원 탈퇴</button>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        </div>

                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Main_Infor;