import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';

const Main_Infor1 = () => {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        name: '',
        nickname: '',
        birthdate: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 페이지 로드 시 현재 로그인된 사용자 정보를 불러오는 함수
        const fetchUserInfo = async () => {
            try {
                const user = JSON.parse(userString);

                     // 2. 이제 user 객체의 키는 항상 소문자 'email'입니다.
                     if (!user || !user.email) {
                         alert('로그인 상태를 확인할 수 없습니다. 다시 로그인해주세요.');
                       nav('/login');
                         return;
                     }
     
                     // 3. API를 호출합니다.
                     const response = await axios.get(`/api/user/${user.email}`);        
     
                     // 4. 서버 응답도 소문자 키를 가지므로, 그대로 상태에 저장합니다.   
                     //    null 값일 경우를 대비해 빈 문자열로 안전하게 처리합니다.      
                     setUserInfo({
                         email: response.data.email || '',
                         name: response.data.name || '',
                         nickname: response.data.nickname || '',
                         birthdate: response.data.birthdate || '',
                         phone: response.data.phone || ''
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
     
         const handleSubmit = async (e) => {
             e.preventDefault();
             try {
                 // 서버로 보낼 데이터 (이미 소문자 키를 가지고 있음)
                 const response = await axios.put('/api/update-user', userInfo);
                 alert('회원정보가 성공적으로 변경되었습니다.');
                 nav('/my');
             } catch (error) {
                 console.error('회원정보 변경 실패:', error);
                 alert('회원정보 변경 중 문제가 발생했습니다.');
             }
         };
     
         // 로딩 중이거나 userInfo가 없을 때 로딩 화면을 표시
         if (loading || !userInfo) {
             return <div>로딩 중...</div>;
         }
     
         return (
             <div className='parent'>
                 <Header />
                 <div className='fixed-box1'>
                     <form onSubmit={handleSubmit}>
                         <b className='span2'>회원정보 변경</b>
                         <br /><br />
                         <div className='login_div2'>
                             <h2 style={{ fontSize: '30px', textAlign: 'center' }}>회원정보 변경</h2>
                             <br />
                             <div className='login_div1'>
                                 <span style={{ fontSize: '20px' }}>* 이메일</span><br />
                                 <p style={{ fontSize: '18px', padding: '5px 0' }}>{userInfo.email}</p>
                                 <br /><br />
                                 <span style={{ fontSize: '20px' }}>* 이름</span><br />
                                 <p style={{ fontSize: '18px', padding: '5px 0' }}>{userInfo.name}</p>
                                 <br /><br />
                               <span style={{ fontSize: '20px' }}>* 닉네임</span><br />
                                <input type='text' name="nickname" placeholder='닉네임을 입력 하세요' style={{ width: '350px', height: '30px' }} value={userInfo.nickname} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 생년월일</span><br />
                                <input type='date' name="birthdate" style={{ fontSize: '20px', width: '350px', height: '30px' }} value={userInfo.birthdate} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 휴대폰 번호</span><br />
                                <input type='tel' name="phone" placeholder='휴대폰 번호를 -없이 입력 하세요' style={{ width: '350px', height: '30px' }} value={userInfo.phone} onChange={handleChange} required />
                                <br /><br />
                            </div>
                        </div>
                        <br /><br /><br /><br />
                        <button id='button1' type='submit'>변경 완료</button>
                        <button id='button2' type='button' onClick={() => nav('/pass-change')}>비밀번호 변경</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
    
    export default Main_Infor1;