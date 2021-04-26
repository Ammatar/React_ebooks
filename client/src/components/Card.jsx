import BookEdit from './BookEdit'
import {useDispatch, useSelector} from 'react-redux'

const Card = ({props}) => {
  console.log('some props in book edit', props);
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  return ( 
    <div className="card">
      <span>{props.el.title}</span>
      <span>{props.el.author}</span>
      {/* <input type="button" value="Edit" onClick={ () => 
        // props.setModalData(props.el);
        {
          dispatch({type: 'set_book',payload: props.el})
          dispatch({type: 'set_chapter',payload: props.el.content[0]})
          // console.log(state.book._id)
        }
        }/> */}
        {state.chapter ? <BookEdit props={props}/> : null}
    </div>
   );
}
 
export default Card;
