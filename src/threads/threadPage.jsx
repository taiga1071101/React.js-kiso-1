import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

import PostForm from './postForm.jsx';
import './threadPage.css';

function ThreadPage() {
  const { thread_id } = useParams();  // 分割代入（{id: 1}のような型で入ってきたものの1だけを代入）
  const location = useLocation();
  const threadTitle = location.state;
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const baseApiURL = "https://railway.bulletinboard.techtrain.dev/threads/" + thread_id + "/posts?offset=";
  
  const listDisplay = (newOffset) => {
    const apiURL = String(baseApiURL + newOffset);
    setOffset(newOffset);
    fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      setPosts(data.posts);
    })
    .catch(error => {
      console.error('失敗', error);
    });
  }
  
  useEffect(()=> {
    listDisplay(0);
  }, []);

  const preList = () => {
    if (offset == 0) return;
    const newOffset = offset - 10;
    listDisplay(newOffset);
  }

  const nextList = () => {
    const newOffset = offset + 10;
    listDisplay(newOffset);
  }

  return (
    <div className="threads-page">
      <div className='post-list'>
        <h1>{threadTitle}</h1>
          <ul>
            {
              posts.map(post => {
                return ( <li key={post.id}>{post.post}</li> );
              })
            }
          </ul>
          <div>
          <button onClick={preList}>＜</button>
          <span>{offset + 1}～{offset + 10}</span>
          <button onClick={nextList}>＞</button>
        </div>
          <div>
              <Link to="../" className="back-link">一覧画面へ戻る</Link>
          </div>
      </div>
        <div className='post-form'>
          <PostForm threadId={thread_id} listDisplay={listDisplay} />
        </div>
    </div>
  );
}

export default ThreadPage
