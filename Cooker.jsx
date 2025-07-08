import React from 'react'
import Header from './Header'
import Footer from './Footer'
import img from '../img/youtube_sung.jpg'
import img1 from '../img/youtube_itjil.jpg'
import { Link } from 'react-router-dom'
import img2 from '../img/youtube_subingsu.jpg'
import img3 from '../img/youtube_foodbox.jpg'
import img4 from '../img/back20.png'


const Cooker = () => {
  return (
    <div style={{
      backgroundImage: `url(${img4})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '1600px' // 임시로 충분히 크게 잡기
    }}>

      <Header></Header>
      <div className='parent'>
        <div className='fixed-box9' style={{ backgroundColor: 'white', width:'555px', height:'1450px'}}>
          <h1 style={{ marginLeft: '80px' }}>수산물 요리 관련 유튜버 정보</h1>
          
          <img src={img} style={{ width: '100px', height: '100px' }}></img><span style={{ fontSize: '30px' }}>youtuber : 승우아빠</span>
          <p>눈으로 보기만 할 수 있는 채널이 아닌, </p>
          <p>그냥 스쳐 지나가는 어려운 레시피가 아닌,</p>
          <p>누구나 따라할 수 있는 레시피 채널을 만들고 싶어요!</p>
          <span>바로가기 :</span><Link to='https://www.youtube.com/@swab85' target='_blank'>승우아빠 체널</Link>
          <br></br>
          <br></br>
          <br></br>
          <img src={img1} style={{ width: '100px', height: '100px' }}></img><span style={{ fontSize: '30px' }}>youtuber : 입질의 추억</span>
          <p>안녕하세요. 어류 칼럼니스트 김지민입니다. </p>
          <p>저는 우리나라가 세계적인 수산 강국이 되었으면 하는 희망으로, </p>
          <p>지금보다는 더 많은 사람이 제 영상을 통해 수산물을 쉽고 친근하게</p>
          <p> 접했으면 좋겠습니다. </p>
          <p>앞으로 많은 성원과 구독 부탁드리며, 항상 노력하는 입질의 추억이 되겠습니다. </p>
          <span>바로가기 :</span><Link to='https://www.youtube.com/@kimjimintv' target='_blank'>입질의 추억 체널</Link>
          <br></br>
          <br></br>
          <br></br>
          <img src={img2} style={{ width: '100px', height: '100px' }}></img><span style={{ fontSize: '30px' }}>youtuber : 수빙수TV</span>
          <p>★ 물고기 해체 해가지고 요리 해가지고 맛있게 먹을거거던여?  ★ </p>
          <span>바로가기 :</span><Link to='https://www.youtube.com/@soobingsootv' target='_blank'>수빙수 체널</Link>
          <br /><br /><br />
          <img src={img3} style={{ width: '100px', height: '100px' }}></img><span style={{ fontSize: '30px' }}>youtuber : 푸드박스</span>
          <p>수산시장 장보기 팁,  제철 수산물 리뷰,   다양한 먹거리 리뷰와 여행지 먹방</p>
          <p>직접 맛보고 전하는 솔직한 수산물 정보까지!</p>
          <p>푸드박스는 생생한 시장 현장과 요리 꿀팁, </p>
          <p>수산물에 대한 새로운 시각을 제공합니다.</p>
          <span>바로가기 :</span><Link to='https://www.youtube.com/@FOODBOX' target='_blank'>푸드박스 체널</Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Cooker