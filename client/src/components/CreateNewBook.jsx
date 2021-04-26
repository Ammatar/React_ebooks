const CreateNewBook = () => {
  return (
    <div className="main create">
      Create new book form:
      <form onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('http://localhost:3000/newBook', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: 'cors',
            body: JSON.stringify({
              title: e.target.title.value ? e.target.title.value :"New Book",
              author: e.target.author.value ? e.target.author.value : "My Name",
              version: e.target.version.value ? e.target.version.value : 3,
              lang: e.target.lang.value ? e.target.lang.value : "ru",
            })
          })
          const data = response.json()
          console.log(e.target.title.value)
          }}>
        <label>
          Название: 
          <input type="text" name="title" />
        </label>
        <label>
          Автор:
          <input type="text" name="author" />
        </label>
        <label>
          Обложка:
          <input type="file" name="cover" id="cover"/>
        </label>
        <label>
          filename:
          <input type="text" name="output"/>
        </label>
        <select name="version" id="">
          <option value="3">EPUB ver.3</option>
          <option value="2">EPUB ver.2</option>
        </select>
        {/* <label>
          CSS:
          <span>CSS modal</span>
        </label>
        <label>
          font:
          <span>font modal</span>
        </label> */}
        <select name="lang" id="lang">
          <option value="ru">Russian</option>
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
