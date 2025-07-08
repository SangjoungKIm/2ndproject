import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../img/logo.jpg.png';
import '../style/Main.css';
import Header from './Header';
import Footer from './Footer';
import FishPriceControls from './FishPriceControls';
import FishPriceTable from './FishPriceTable';
import img4 from '../img/back20.png'

const Main = () => {
    const nav = useNavigate();
    const [fishName, setFishName] = useState('');
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [items, setItems] = useState([]);
    const [allFishData, setAllFishData] = useState([]); // 모든 페이지의 데이터를 저장할 상태
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('검색할 어종명과 날짜를 선택해주세요.');

    const numOfRows = 100;
    const apiKey = 'PuTClKecmfUj5VNhigDWx0ZFkdP2Y%2B9vl9yOUjj1Zy%2Fi5XSMtshCZ39Z7yus9JruWi%2BfLXz1SNzVJEYb7TbFZg%3D%3D';

    const fetchData = async () => {
        if (!fishName) {
            setMessage('어종명을 입력해주세요.');
            return;
        }
        if (!searchDate) {
            setMessage('조회할 날짜를 선택해주세요.');
            return;
        }

        const baseDt = searchDate.replace(/-/g, '');
        const encodedFishName = encodeURIComponent(fishName);

        setLoading(true);
        setAllFishData([]); // 새로운 검색 시 기존 데이터 초기화
        setItems([]); // 현재 페이지 아이템도 초기화
        setMessage('데이터를 불러오는 중...');

        let accumulatedData = [];
        let total = 0;
        let currentPageToFetch = 1; // 항상 첫 페이지부터 시작

        try {
            // 첫 번째 API 호출로 totalCount를 가져옴
            let url = `https://apis.data.go.kr/1192000/select0040List/getselect0040List?serviceKey=${apiKey}&numOfRows=${numOfRows}&pageNo=${currentPageToFetch}&type=xml&baseDt=${baseDt}&mprcStdCodeNm=${encodedFishName}`;
            let response = await fetch(url);
            if (!response.ok) throw new Error(`네트워크 오류: ${response.statusText}`);

            let xmlString = await response.text();
            console.log(`API 응답 XML (페이지 ${currentPageToFetch}):`, xmlString);

            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            const resultCode = xmlDoc.querySelector('resultCode')?.textContent || '';
            const resultMsg = xmlDoc.querySelector('resultMsg')?.textContent || '';

            if (resultCode !== '00') throw new Error(`API 오류: ${resultMsg} (코드: ${resultCode})`);

            total = parseInt(xmlDoc.querySelector('totalCount')?.textContent || 0, 10);
            setTotalCount(total); // totalCount 업데이트

            let fetchedItems = Array.from(xmlDoc.querySelectorAll('item')).filter(item => {
                const weightNode = item.querySelector('csmtWt');
                const amountNode = item.querySelector('csmtAmount');
                if (!weightNode || !amountNode) return false;
                const weight = parseFloat(weightNode.textContent || 0);
                const amount = parseInt(amountNode.textContent || 0, 10);
                return weight > 0 && amount > 0;
            });
            accumulatedData = [...fetchedItems];
            setItems(fetchedItems); // 첫 페이지 데이터로 items 설정

            const totalPages = Math.ceil(total / numOfRows);

            // 추가 페이지가 있다면 순차적으로 가져옴
            for (currentPageToFetch = 2; currentPageToFetch <= totalPages; currentPageToFetch++) {
                setMessage(`데이터를 불러오는 중... (페이지 ${currentPageToFetch}/${totalPages})`);
                url = `https://apis.data.go.kr/1192000/select0040List/getselect0040List?serviceKey=${apiKey}&numOfRows=${numOfRows}&pageNo=${currentPageToFetch}&type=xml&baseDt=${baseDt}&mprcStdCodeNm=${encodedFishName}`;
                response = await fetch(url);
                if (!response.ok) throw new Error(`네트워크 오류: ${response.statusText}`);

                xmlString = await response.text();
                console.log(`API 응답 XML (페이지 ${currentPageToFetch}):`, xmlString);

                xmlDoc = parser.parseFromString(xmlString, 'application/xml');

                const currentResultCode = xmlDoc.querySelector('resultCode')?.textContent || '';
                const currentResultMsg = xmlDoc.querySelector('resultMsg')?.textContent || '';

                if (currentResultCode !== '00') {
                    console.warn(`API 오류 (페이지 ${currentPageToFetch}): ${currentResultMsg} (코드: ${currentResultCode})`);
                    // 특정 페이지 오류 시 전체 중단 대신 경고 후 다음 페이지 시도 또는 여기서 중단 결정
                    break; // 현재는 오류 발생 시 루프 중단
                }

                fetchedItems = Array.from(xmlDoc.querySelectorAll('item')).filter(item => {
                    const weightNode = item.querySelector('csmtWt');
                    const amountNode = item.querySelector('csmtAmount');
                    if (!weightNode || !amountNode) return false;
                    const weight = parseFloat(weightNode.textContent || 0);
                    const amount = parseInt(amountNode.textContent || 0, 10);
                    return weight > 0 && amount > 0;
                });
                accumulatedData = [...accumulatedData, ...fetchedItems];
            }

            if (accumulatedData.length === 0) {
                setMessage(`${searchDate}에 '${fishName}' 위판 데이터가 없습니다.`);
            } else {
                setMessage(`총 ${total.toLocaleString()}건의 데이터 중 유효한 결과를 표시합니다.`);
            }

            setAllFishData(accumulatedData); // 모든 데이터 누적 후 allFishData 업데이트
        } catch (error) {
            console.error('오류 발생:', error);
            setMessage(`데이터 조회 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        const lastPage = Math.ceil(totalCount / numOfRows);
        if (currentPage < lastPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // useEffect(() => {
    //     if (fishName) {
    //         fetchData();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentPage]);

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
                <div className='fixed-box8' style={{backgroundColor:'white', width:'560px',minHeight:'950px',maxHeight:'950px', overflowY:'scroll'}}>
                    <div className="container" >
                        <h1>어종별 위판 가격 조회</h1>
                        <FishPriceControls
                            fishName={fishName}
                            searchDate={searchDate}
                            setFishName={setFishName}
                            setSearchDate={setSearchDate}
                            fetchData={() => { setCurrentPage(1); setAllFishData([]); fetchData(); }}
                        />
                        <p>{message}</p>

                        <div className="table-wrapper">
                            {items.length > 0 && <FishPriceTable items={items} allFishData={allFishData} />}
                        </div>

                        {/* 페이지네이션 컨트롤 제거 */}

                        {loading && <p>로딩 중...</p>}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Main;