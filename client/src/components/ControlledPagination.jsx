import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import TinyEditorComponent from './TinyEditorComponent';
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function PaginationControlled({props}) {
  const dispatch = useDispatch()
  console.log('props =>',props);
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [prop, setProp] = React.useState('');
  const [id, setId] = React.useState('')
  const [textValue, setTextValue] = React.useState(prop)
  React.useEffect(() => {
    setProp(props[0].data)
    setId(props[0]._id)
    // dispatch({type: 'set_chapter', payload: {id: props[0]._id, data: props[0].data}})
  }, [])
  const handleChange = (event, value) => {
    
    setPage(value);
    setProp(props[value - 1].data)
    setTextValue(props[value - 1].data)
    setId(props[value - 1]._id)
    dispatch({type: 'set_chapter', payload: {id: props._id, data: textValue}})
    // const seeHidden = dispatch({type: 'get_chapter'})
    // console.log('see hidden', textValue);
  };

  return (
    <div className={classes.root}>
      <TinyEditorComponent prop={{prop, id}}/>
      <Typography>Page: {page}</Typography>
      <Pagination count={props.length} page={page} onChange={handleChange} />
    </div>
  );
}
