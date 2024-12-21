import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './new.css';

const New = () => {
  const navigate = useNavigate();
  const apiURL = "https://railway.bulletinboard.techtrain.dev/threads";

  const createButton = () => {
    const title = document.getElementById("title").value;
    const body = {"title": title};
    fetch(apiURL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    // 作成が完了したら、値を消して一覧画面へ戻る。
    document.getElementById("title").value = "";
    navigate("../");
    alert("投稿が完了しました。");
  }
    return (
      <>
        <h1>スレッド新規作成</h1>
        <div className="form-new">
          <div className="input-group-new">
            <p>スレッドタイトル</p>
            <input type="text" id="title"></input>
          </div>
          <div className="button-group-new">
            <Link to="../" className="back-link">一覧画面へ戻る</Link>
            <button onClick={ createButton }>作成</button>
          </div>
        </div>
      </>
    );
  };
  
  export default New;