import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../style/Main.css'
import Header from './Header'
import Footer from './Footer'
import img from '../img/robot_icon.jpg.svg'
import img4 from '../img/back20.png'

const Main_ask = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const nav = useNavigate();

  // 이미지 선택 시 호출
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setAnalysisResult(''); // 분석 결과 초기화
    }
  }

  // AI 분석 시뮬레이션 (여기에 추후 API 연동하면 됨)
  const handleAnalyze = () => {
    if (!selectedImage) {
      alert('이미지를 먼저 업로드해주세요!');
      return;
    }
    // 임시 분석 결과 (나중에 실제 AI 결과로 교체)
    setAnalysisResult('이 이미지는 "바다"로 분류되었습니다.');
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
        <div id='div50'>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 style={{ marginLeft: '150px' }}>AI수산물 판별 기능</h1>
          <br></br>
          <img src={img} style={{ marginLeft: '80px', width: '400px', height: '450px' }}></img>
          <h2 style={{ marginLeft: '120px' }}><b>AI가 수산물을 분석해 드립니다!</b></h2>

          <br></br>
          <br></br>
          <br></br>
          <button style={{ marginLeft: '100px', width: '150px', height: '40px' }} onClick={() => { nav('/ask1') }}>수산물 분류</button>
          <button style={{ marginLeft: '30px', width: '150px', height: '40px' }} onClick={() => { nav('/ask2') }}>등급 분류</button>
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default Main_ask