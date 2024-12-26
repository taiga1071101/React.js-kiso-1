import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './threadsList.css';

function ThreadsList() {
  const [threads, setThreads] = useState([]);
  const [offset, setOffset] = useState(0);
  const baseApiURL = "https://railway.bulletinboard.techtrain.dev/threads?offset=";

  const listDisplay = (newOffset) => {
    const apiURL = String(baseApiURL + newOffset);
    setOffset(newOffset);

    fetch(apiURL)
    
    .then((res) => res.json())
    .then((data) => {
      setThreads(data);
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
    <>
      <div className="threads-list">
        <h1>新着スレッド</h1>
        <ul>
          {
            threads.map(thread => {
              return ( <li key={thread.id}><Link to={"/threads/" + thread.id} state={thread.title}>{thread.title}</Link></li> );
            })
          }
        </ul>
        <div>
          <button onClick={preList}>＜</button>
          <span>{offset + 1}～{offset + 10}</span>
          <button onClick={nextList}>＞</button>
        </div>
      </div>
    </>
  )
}

export default ThreadsList
