import { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function PostList({ initData }) {

    // Navigate
    const navigate = useNavigate();

    // 정렬 기능
    const [selectOption, setSelectOption] = useState(0);
    const [sortData, setSortData] = useState([]);
    const [btnClicked, setBtnClicked] = useState(false);
    let changeSort = null;


    // 검색 기능
    const [userSearch, setUserSearch] = useState('');

    const dateFormatting = (date) => {

        const idx = date.indexOf("./");
        if (idx == -1) {
            return date;
        }
        return date.substr(0, idx);
    };

    // 최신순 정렬
    const sortTime = (arr) => {
        changeSort = [...arr].sort(
            (a, b) => {
                const dateComp = new Date(dateFormatting(b.writeDate)) - new Date(dateFormatting(a.writeDate))

                if (dateComp === 0) {
                    const temp = a.writeDate > b.writeDate;
                    // a가 ture면 최신임..
                    if (temp) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                return dateComp;
            });
    };

    // 등록순 정렬
    const sortBoardNo = (arr) => {
        changeSort = [...arr].sort(
            (a, b) => {
                const noComp = a.boardNo > b.boardNo;
                if (noComp) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
    }

    // 정렬후 리스트 뿌리기
    const sortList = (arr) => {

        if (selectOption == 0) {
            console.log("sortList0");
            sortTime(arr);
        }
        else if (selectOption == 1) {
            console.log("sortList1");
            sortBoardNo(arr);
        }
        setSortData(changeSort);


    }


    useEffect(() => {
        sortList(initData);
    }, [])

    useEffect(() => {
        if (sortData[0] != null)
            sortList(sortData);
    }, [selectOption])





    const handlerOption = (e) => {
        setSelectOption(e.target.value)
    }

    // className="App-header" 에 backgroundColor 변경
    const [bg_clicked, setBG_Clicked] = useState(true);

    const backgroundHandler = (isYellow) => {
        const appAll = document.querySelector(".App-all");
        const appTitle = document.querySelector(".App-title");
        if (isYellow) {
            appAll.classList.add('yello');
            appAll.classList.remove('blue');
        } else {
            appAll.classList.add('blue');
            appAll.classList.remove('yello');
            appTitle.classList.add('appTitle')
        }
        setBG_Clicked(isYellow);
    }


    const searchHandler = (e) => {
        setUserSearch(e.target.value);
    };

    // 검색한 키워드를 url로 넘겨주기
    const searchData = () => {
        setBtnClicked(true);

        // 배열 내부 값을 변경해서 부분 렌더링 하는 방식으로 해주면됨.
        if (userSearch) {
            let tempArr = [];
            initData.map((data) => {
                if ((data.boardTitle).includes(userSearch)) {
                    tempArr = [...tempArr, data];
                }
            });
            setSortData(tempArr);
        }
        else {
            setSortData(initData);
        }


    }

    useEffect(() => {
        if (btnClicked) {
            sortList(sortData);
            changeSort = null;

            setBtnClicked(!btnClicked);
        }

    }, [btnClicked])


    return (
        <div className="App-all">
            <header className="App-header">
                <button onClick={() => { backgroundHandler(true) }} className='header-1'>.</button>
                <button onClick={() => { backgroundHandler(false) }} className='header-2'>.</button>
            </header>

            <div className='App-main'>
                <div className="App-title">
                    <div className='title-1'>Simple Note</div>
                    <div className='title-2'>잊지않도록 기록하세요.</div>
                </div>

                <div className="App-search">
                    {/* <input className='search-1' placeholder='제목을 검색하세요' />
                    <button>검색</button> */}
                    <input className='search-1' placeholder='제목을 검색하세요'
                        onChange={searchHandler} />
                    <button onClick={() => { searchData() }} className='search-btn'>검색</button>
                    <select className='search-2' value={selectOption} onChange={handlerOption}>
                        <option className='search' value={0}>최신순</option>
                        <option className='search' value={1}>등록순</option>
                    </select>
                </div>

                <div className='content-area'>


                    {
                        sortData.map(function (post, boardNo) {
                            return (
                                <div className="App-contents"
                                    key={post.boardNo} >
                                    {/* <Link to={'/detail/:boardNo'}> */}
                                    <Link to={'/detail/' + post.boardNo} className="content-title" >
                                        <div className='content-inner-title'>{post.boardTitle}</div>
                                        <div className='content-inner-date'>{dateFormatting(post.writeDate)}</div>
                                    </Link>
                                    {/* </Link> */}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='App-writeBtn'>
                    < Link to={'/insert'} ><button className="writeBtn" >글작성</button></Link>
                </div>
            </div>
        </div >
    );
}