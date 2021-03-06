import {useState} from 'react'
import { Button } from '@material-ui/core';
import ControlledPagination from './ControlledPagination'
import {useDispatch, useSelector} from 'react-redux'
import { getAllBooks, getAllPublic } from '../redux/reducer';

const BookEditForm = ({props}) => {
  const dispatch = useDispatch();
  let book = useSelector(state => state.book);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [content, setContent] = useState(book.content)
  
  // console.log({props});
  return ( 
    <>
    <form className="cardEdit">
      <h1>Редактирование книги</h1>
      <input type="text" value={title} onChange={ (e) => setTitle(e.target.value)}/>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      {/* {content ? content.map((el) => {
        return <Chapter props={content} />
      }): null} */}
      <ControlledPagination props={content}/>
    </form>
      <Button 
      variant="contained"
      size="small"
      type="button" value="add Chapter" onClick={async (e) => {
        // console.log(e.target);
        const response = await fetch('http://localhost:3000/addChapter', {
          method: "POST",
          headers: {'Content-Type': "application/json"},
          body: JSON.stringify({
            id: props._id
          })
        })
        const {book} = await response.json()

        
        dispatch({type: 'set_book',payload: book})
      }}>Добавить главу</Button>
      </>
   );
}
 
export default BookEditForm;
