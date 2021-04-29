import Input from '@material-ui/core/Input';
import {useDispatch, useSelector} from 'react-redux'
const CreateNewBook = () => {
  const user = useSelector(state => state.user)
  return (
    <div className="main create">
      Форма создания новой книги:
      <form  className={"newBook"} onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('http://localhost:3000/newBook', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: 'cors',
            body: JSON.stringify({
              title: e.target.title.value ? e.target.title.value :"New Book",
              author: user.authorname,
              version: 3,
              lang: e.target.lang.value ? e.target.lang.value : "ru",
            })
          })
          const data = response.json()
          window.location = '/'
          // console.log(e.target.title.value)
          }}>
        <label>
          Название: 
          <Input type="text" name="title" fullWidth={true}/>
        </label>
        {/* <label>
          Автор:
          <Input type="text" name="author" fullWidth={true} />
        </label> */}
        <label>
          Обложка:
          <Input type="file" name="cover" id="cover" fullWidth={true}/>
        </label>
        {/* <label>
          Имя файла:
          <input type="text" name="output"/>
        </label> */}
        {/* <select name="version" id="">
          <option value="3">EPUB ver.3</option>
          <option value="2">EPUB ver.2</option>
        </select> */}
        {/* <label>
          CSS:
          <span>CSS modal</span>
        </label>
        <label>
          font:
          <span>font modal</span>
        </label> */}
        <select name="lang" id="lang">
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>

        {/* <select placeholder="Жанр">
          <option value="Стихи">Стихи</option>
        </select> */}
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
};

export default CreateNewBook;
