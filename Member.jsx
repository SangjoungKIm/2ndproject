import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../img/sing_logo1.jpg.png'
import '../style/Main.css'
import Header from './Header'
import Footer from './Footer'
import PassChange from './PassChange'
import img1 from '../img/arrow.jpg'
import Upload from './Upload'
import axios from 'axios'
import img4 from '../img/back20.png'


const Member = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        nickname: '',
        birthdate: '',
        phone: '',
        userType: 'GENERAL', // 기본값은 '일반 사용자'
        careerProof: null // 요리사 경력 증명 사진 파일
    });

    // 입력 필드 값이 바뀔 때마다 formData 상태를 업데이트하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 라디오 버튼 변경 처리 함수
    const handleUserTypeChange = (e) => {
        setFormData({
            ...formData,
            userType: e.target.value
        });
    };

    // 파일 업로드 처리 함수
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            careerProof: e.target.files[0]
        });
    }

    // 폼 제출(회원가입 완료) 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작(새로고침)을 막음

        // FormData 객체를 사용해 파일과 텍스트 데이터를 함께 보낼 준비
        const dataToSend = new FormData();
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.password);
        dataToSend.append('name', formData.name);
        dataToSend.append('nickname', formData.nickname);
        dataToSend.append('birthdate', formData.birthdate);
        dataToSend.append('phone', formData.phone);
        dataToSend.append('userType', formData.userType);

        if (formData.userType === 'CHEF' && formData.careerProof) {
            dataToSend.append('careerProof', formData.careerProof);
        }

        try {

            const response = await axios.post('/api/register', dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('서버 응답:', response.data);
            alert('회원가입이 완료되었습니다.');
            nav('/search'); // 성공 시 페이지 이동

        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 중 문제가 발생했습니다.');
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
                    <form onSubmit={handleSubmit}>
                        <img src={img1} id='img2' onClick={() => nav('/search')} alt="back"></img>
                        <b className='span2'>회원가입</b>
                        <br /><br />
                        <div className='login_div20'>
                            <h2 style={{ fontSize: '30px', textAlign: 'center' }}>회원가입</h2>
                            <br />
                            <div className='login_div1'>
                                <span style={{ fontSize: '20px' }}>* 이메일</span><br />
                                {/* 각 input에 name과 value, onChange를 추가 */}
                                <input type='email' name="email" placeholder='이메일을 입력 하세요' style={{ width: '350px', height: '30px' }} value={formData.email} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 비밀번호</span><br />
                                <input type='password' name="password" placeholder='비밀번호를 입력 하세요' style={{ width: '350px', height: '30px' }} value={formData.password} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 이름</span><br />
                                <input type='text' name="name" placeholder='이름을 입력 하세요' style={{ width: '350px', height: '30px' }} value={formData.name} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 닉네임</span><br />
                                <input type='text' name="nickname" placeholder='닉네임을 입력 하세요' style={{ width: '350px', height: '30px' }} value={formData.nickname} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 생년월일</span><br />
                                <input type='date' name="birthdate" style={{ fontSize: '20px', width: '350px', height: '30px' }} value={formData.birthdate} onChange={handleChange} required />
                                <br /><br />
                                <span style={{ fontSize: '20px' }}>* 휴대폰 번호</span><br />
                                <input type='tel' name="phone" placeholder='휴대폰 번호를 -없이 입력 하세요' style={{ width: '350px', height: '30px' }} value={formData.phone} onChange={handleChange} required />
                                <br /><br />

                                <span style={{ fontSize: '20px' }}>요리사 유/무</span><br />
                                {/* "Y"를 누르면 'CHEF', "N"을 누르면 'GENERAL' 값을 가지도록 설정 */}
                                <span style={{ fontSize: '20px', marginLeft: '50px' }}>Y</span>
                                <input type='radio' name="userType" value="CHEF" checked={formData.userType === 'CHEF'} onChange={handleUserTypeChange} />

                                <span style={{ fontSize: '20px', marginLeft: '100px' }}>N</span>
                                <input type="radio" name="userType" value="GENERAL" checked={formData.userType === 'GENERAL'} onChange={handleUserTypeChange} />
                                <br /><br />

                                {/* 요리사(CHEF)를 선택했을 때만 파일 업로드 필드가 보이도록 처리 */}
                                {formData.userType === 'CHEF' && (
                                    <>
                                        <p style={{ color: 'red', fontSize: '15px' }}>*요리사일 경우 경력증명을 할 수 있는 사진을 올려주세요</p>
                                        <input type="file" name="careerProof" id="imageUpload" accept="image/*" onChange={handleFileChange} required />
                                    </>
                                )}
                            </div>
                        </div>
                        <br /><br />
                        {/* type을 'submit'으로 변경하여 form의 onSubmit을 트리거 */}
                        <button id='button1' type='submit' style={{marginLeft:'130px'}}>회원가입 완료</button>
                        <button id='button2' type='reset'>초기화</button>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default Member