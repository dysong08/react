import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function PostInsert(props) {

    const navigate = useNavigate();

    // 기존 작성된 글들 가져옴
    let { initData, setInitData } = props;

    // 입력받을 값 셋팅
    const [inputText, setInputText] = useState({
        boardTitle: '',
        boardContent: ''
    })

    // 글작성하기
    function insertPost() {
        const { boardTitle, boardContent } = inputText;
        if (!boardTitle || !boardContent) {
            alert("제목 또는 내용이 없습니다");
            return;
        }


        let post = {
            boardNo: Math.max(...initData.map(function (post) {
                return post.boardNo
            })) + 1,
            ...inputText,
            writeDate: new Date().toLocaleDateString() + "/" + new Date().toTimeString()
        }
        setInitData([...initData, post]);
        navigate('/');
    }

    function inputHandler(e) {

        let { name, value } = e.target;
        setInputText({ ...inputText, [name]: value });
    };

    return (
        <div className="App-all">
            <div className="change-text ">
                <textarea type="text" name="boardTitle" className="text-1"
                    onChange={inputHandler}
                    value={inputText.boardTitle}
                    placeholder="제목을 입력해주세요" ></textarea>

                <textarea type="text" name="boardContent" className="text-2"
                    onChange={inputHandler}
                    value={inputText.boardContent}
                    placeholder="내용을 입력해주세요" ></textarea>
            </div>

            <div className="insert-writeBtn">
                <button className='writeBtn' onClick={insertPost}>등록</button>
                <Link to={'/'}><button className='writeBtn'>취소</button></Link>
            </div>
        </div>
    )

}