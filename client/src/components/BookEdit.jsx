import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BookEditForm from './BookEditForm';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ props }) {
  const dispatch = useDispatch();
  const bookState = useSelector((state) => state);
  const bookState_test = props;
  // console.log('prps in modal', props.el);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {}, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* {console.log('bookstate', bookState_test)} */}
      <BookEditForm props={bookState.book} />
      {/* <span>{bookState.book.title}</span>
      <span>{bookState.book.author}</span> */}
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        type="button"
        
        onClick={() => {
          // console.log('simple modal props', bookState);
          dispatch({ type: 'set_book', payload: bookState_test.el });
          // dispatch({type: 'set_chapter',payload: bookState.el})
          handleOpen();
        }}
      >
        Редактировать
      </Button>
      <div className='buttonSeparator'></div>
      <Button
        variant="contained"
        size="small"
        type="button"
        className='button'
        onClick={async () => {
          const { title, author, content, lang } = props.el;
          const response = await fetch('http://localhost:3000/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title,
              author,
              content,
              lang,
            }),
          });
          const responseData = await response.blob();
          const blobURL = window.URL.createObjectURL(responseData);
          var link = document.createElement('a');
          link.href = blobURL;
          link.download = 'file.epub';
          link.click();
          // console.log(blobURL);
        }}
      >
        экспортировать в Epub
      </Button>
      <div className='buttonSeparator'></div>
      <Button
        variant="contained"
        size="small"
        onClick={async () => {
          const deleteBook = await fetch('http://localhost:3000/deleteBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: bookState_test.el._id,
            }),
          });
          const deleteBookData = await deleteBook.json();
          window.location = '/';
          // console.log(bookState_test.el._id);
        }}
      >
        Удалить
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
