import './App.css';
import initial from './data';
import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './component/PostList';
import PostInsert from './component/PostInsert';
import PostDetail from './component/PostDetail';


function App() {

  // 게시글 목록 불러오기
  const [initData, setInitData] = useState(initial);


  return (

    <Routes>
      <Route path='/' element={<PostList initData={initData} setInitData={setInitData} />} />
      <Route path='/insert' element={<PostInsert initData={initData} setInitData={setInitData} />} />
      <Route path='/detail/:bno' element={<PostDetail initData={initData} setInitData={setInitData} />} />



    </Routes>

  );
}

export default App;
