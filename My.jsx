import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import img4 from '../img/back20.png'

const My = () => {
  // 🔥 여러 개의 메뉴 상태를 배열로 관리 (초기값: 모두 닫힘)
  const [openMenus, setOpenMenus] = useState([false, false, false, false, false]); // 메뉴 3개 예시

  // 🔥 특정 메뉴만 토글하는 함수
  const toggleMenu = (index) => {
    setOpenMenus(prev => prev.map((isOpen, i) => i === index ? !isOpen : isOpen));
  }
  const nav = useNavigate();

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
        <Header />
        <div id='fixed_box5' style={{ padding: '20px' }}>
          <br></br>
          <h1 style={{ marginLeft: '180px' }}><b>고객 센터</b></h1>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          {/* 🔥 메뉴 1 */}
          <div onClick={() => toggleMenu(0)} >
            <span style={{ fontSize: '24px' }}>로그인이 안돼요</span><span style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none', marginBottom: '10px', marginLeft: '320px' }}>{openMenus[0] ? '🔼 ' : '🔽 '}</span>
          </div>
          {openMenus[0] && (
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '500px', backgroundColor: '#f9f9f9' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>1. 본인의 아이디랑 비밀번호를 다시 확인해 주시길 바랍니다.</li>
                <li>2. 본인이 회원가입을 했는지 다시 한번 확인해 주시길 바랍니다.</li>
              </ul>
            </div>
          )}
          <hr></hr>

          {/* 🔥 메뉴 2 */}
          <div onClick={() => toggleMenu(1)} >
            <span style={{ fontSize: '24px' }}>비밀번호를 잊어버렸어요</span><span style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none', marginBottom: '10px', marginLeft: '233px' }}>{openMenus[1] ? '🔼 ' : '🔽 '}</span>
          </div>
          {openMenus[1] && (
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '500px', backgroundColor: '#f9f9f9' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>1. 비밀번호를 기억하지 못하는 경우 '비밀번호 찾기'를 통해 재설정하실 수 있습니다.</li>
                <li>2.【 비밀번호 찾기 경로 】• 로그인 하기 ➡ 비밀번호 찾기 ➡ 이메일/휴대폰 번호 입력 '비밀번호 찾기' 시 참고 사항 안내해 드립니다.</li>
                <li id='li1' onClick={() => { nav('/passchange') }}>3. 여기를 클릭 하시면 바로 비밀번호 찾기 페이지로 이동합니다.</li>
              </ul>
            </div>
          )}
          <hr></hr>
          {/* 🔥 메뉴 3 */}
          <div onClick={() => toggleMenu(2)}>
            <span style={{ fontSize: '24px' }}>회원</span><span style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none', marginBottom: '10px', marginLeft: '437px' }}>{openMenus[2] ? '🔼 ' : '🔽 '}</span>
          </div>
          {openMenus[2] && (
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '500px', backgroundColor: '#f9f9f9' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>1. 비회원도 이용이 가능 한가요? ➡ 시장이나 공유주방에 대한 정보를 제공 받으실 수 있지만 안타깝게도 게시글 작성 및 요리사 1:1매칭 등 서비스를 이용하실 수 없습니다.</li>
                <li>2. 회원 탈퇴는 어떻게 하나요? ➡ 상단에 My페이지로 이동하시면 하단에 회원탈퇴 버튼이 있습니다.</li>
                <li>3. 한번 회원 탈퇴를 하면 다시 가입이 불가능 한가요? ➡ 회원 탈퇴를 하고 다시 재 가입 가능합니다.</li>
              </ul>
            </div>
          )}
          <hr></hr>
          <div onClick={() => toggleMenu(3)}>
            <span style={{ fontSize: '24px' }}>문의 방법</span><span style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none', marginBottom: '10px', marginLeft: '387px' }}>{openMenus[3] ? '🔼 ' : '🔽 '}</span>
          </div>
          {openMenus[3] && (
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '500px', backgroundColor: '#f9f9f9' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>아래와 같은 방법으로 문의해 주시면 감사하겠습니다.</li>
                <li>1. 이메일을 통한 문의 ➡ Singkszz@naver.com</li>
                <li>2. 유선을 통한 문의</li>
                <li> ➡ 대표 번호 : 010-0000-0000// 싱싱해 고객센터 : 062-0000-000</li>
                <li>고객센터의 운영시간은 평일 09:00~17:00이며 추후 고객님들의 편의사항을 위해 24시간 운영이 가능하게 개선하도록 노력하겠습니다.</li>
              </ul>
            </div>
          )}
          <hr></hr>
          {/* 메뉴 4 */}
          <div onClick={() => toggleMenu(4)} >
            <span style={{ fontSize: '24px' }}>문의 내역</span><span style={{ cursor: 'pointer', fontSize: '24px', userSelect: 'none', marginBottom: '10px', marginLeft: '387px' }}>{openMenus[3] ? '🔼 ' : '🔽 '}</span>
          </div>
          {openMenus[4] && (
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', width: '500px', backgroundColor: '#f9f9f9' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Q : AI기능을 활용해서 수산물 사진을 찍었는데 오류가 나요 </li>
                <li>➡ A : 여러가지 이유가 있겠지만 수산물을 제대로 분류하지 못했을 경우가 큽니다. 해당 수산물이 카메라 전체에 담기게 찍어 주세요</li>
                <br></br>
                <li>Q : 지난 상대방과 채팅내역을 보고 싶은데 실수로 채팅방을 나가서 대화내역을 볼 수가 없어요.</li>
                <li>➡ A : 채팅방을 나가면 해당 채팅방은 사라지지만 대화내역은 남아있습니다. 대화했던 상대방과 다시 채팅방을 만드시면 기록이 남아 있습니다.</li>
              </ul>
            </div>

          )}
          <hr></hr>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div id='div30'>
            <span><b>싱싱해</b></span>
            <hr></hr>
            <span>대표자 : OOO</span>
            <br></br>
            <span>대표 번호 : 010-0000-0000</span>
            <br></br>
            <span>이메일 : Sinkszz@naver.com</span>
            <br></br>
            <span>고객센터 : 062-0000-0000</span>
            <br></br>
            <span>주소 : 광주 동구 중앙로 196 (금남로 3가) </span>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default My