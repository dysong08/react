import { useState } from 'react';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function PostDetail(props) {

    const navigate = useNavigate();
    const { initData, setInitData } = props;
    const { bno } = useParams(); // List에서 <Link to={'/detail/' + post.boardNo} 로 보낸 값

    // 변경되는 초기 값 DB에 접근해서 사용하게 되면.. DB가 변경될 때 마다 배열의 인덱스 값으로 접근이 불가능함
    // 왜? DB배열이 변경되면서 인덱스 값도 함께 변하기 때문에 n-1 로 접근했던 방법이 불가능해
    // 이거를 다른 방법으로 사용하기 위해서 유니크 값인 boardNo 하고 bno하고 비교해서 아예 상세 페이지자체에서 필요한
    // 데이터를 가져와서 사용하는 방법으로 우회 해서 사용하면 됨.
    const postData = initData.filter(post => post.boardNo == bno)[0];


    // 변경데이터 임시 담아주는 객체
    const [changeText, setChangeText] = useState({
        boardNo: postData.boardNo,
        boardTitle: postData.boardTitle,
        boardContent: postData.boardContent,
        writeDate: postData.writeDate
    });


    let [writeDate, setWriteDate] = useState(postData.writeDate);

    //게시글 삭제하기 (boardNo가 일치하지 않는 글들만 delPost에 담기)
    function deletePost(bno) {
        const delPost = initData.filter(post => post.boardNo !== parseInt(bno));

        setInitData(delPost);
        navigate("/");
    }


    // 게시글 수정하기
    function updatePost() {

        console.log("수정 버튼 누름");

        let { boardTitle, boardContent } = changeText;
        if (!boardTitle) {
            alert("제목이없어");
        }

        writeDate = new Date().toLocaleDateString() + "/" + new Date().toTimeString();
        console.log(writeDate);
        setWriteDate(writeDate);

        const changeData = initData.map(function (post) {
            if (post.boardNo == changeText.boardNo) {
                return { ...post, ...changeText, writeDate };
            }
            return post;
        })
        setInitData([...changeData]);
        navigate("/");
    };



    const handler = (e) => {
        const { name, value } = e.target;
        setChangeText({ ...changeText, [name]: value });
    }


    return (
        <div className="App-all">
            <div className='change-text'>
                <textarea type="text" name="boardTitle" className='text-1'
                    value={changeText.boardTitle}
                    onChange={handler} ></textarea>

                <textarea type="text" name="boardContent" className='text-2'
                    value={changeText.boardContent}
                    onChange={handler} ></textarea>
            </div>

            <div className="insert-writeBtn">
                <button className='writeBtn' onClick={() => { updatePost(); }}>수정</button>
                <Link to={'/'}><button className='writeBtn'>취소</button></Link>
                <button className='writeBtn' onClick={() => { deletePost(bno) }}>삭제</button>
            </div>
        </div>
    )
}