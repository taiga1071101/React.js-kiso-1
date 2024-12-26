import { useState } from 'react';

function PostForm(props) {
  const threadId = props.threadId;
  const listDisplay = props.listDisplay;
  const apiURL = "https://railway.bulletinboard.techtrain.dev/threads/" + threadId + "/posts";
  const [message, setMessage] = useState();
  const [inputPost, setInputPost] = useState();

  const newPost = async(e) => {
    e.preventDefault(); // フォーム送信時の余計なリロード防止
    if (!inputPost) {
      setMessage("何か入力して投稿ください！");
      return;
    }
    const body = {"post": inputPost};
    try {
      const res = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      console.log(data);

      // 投稿完了後の処理
      setMessage("投稿できました！");
      setInputPost("");
      listDisplay(0);
    } catch(error) {
      console.error('失敗', error);
    }
    
  }

  return (
    <>
      <div>
        <p>{message}</p>
      </div>
      <form onSubmit={newPost}>
        <div>
          <textarea value={inputPost} onChange={e => setInputPost(e.target.value)} placeholder="投稿してみよう！"></textarea>
        </div>
        <div className="button-group-new-post">
          <button type="submit">投稿</button>
        </div>
      </form>
    </>
  );
}

export default PostForm
