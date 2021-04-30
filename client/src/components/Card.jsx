import { makeStyles } from '@material-ui/core/styles';
import BookEdit from './BookEdit'
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '5px',
    width: '220px',
    minWidth: '220px',
    height: '300px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Card = ({props}) => {
  // console.log('some props in book edit', props);
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const classes = useStyles();
  // dispatch({type: 'set_book',payload: props.el})
  return ( 
    <div className={classes.paper}>
      <p><strong>{props.el.title}</strong> <br/> {props.el.author} </p>
      
      {/* <input type="button" value="Edit" onClick={ () => 
        // props.setModalData(props.el);
        {
          // dispatch({type: 'set_book',payload: props.el})
          // dispatch({type: 'set_chapter',payload: props.el.content[0]})
          // console.log(state.book._id)
        }
        }/> */}
        {state.chapter ? <BookEdit props={props}/> : null}
    </div>
   );
}
 
export default Card;
