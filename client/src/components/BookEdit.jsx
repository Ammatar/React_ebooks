import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import BookEditForm from './BookEditForm';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
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
  console.log('prps in modal', props.el);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {console.log('bookstate', bookState_test)}
      <BookEditForm props={bookState_test.el} />
      <span>{bookState.book.title}</span>
      <span>{bookState.book.author}</span>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log('simple modal props', bookState);
          // dispatch({type: 'set_book',payload: bookState.book})
          // dispatch({type: 'set_chapter',payload: bookState.el})
          handleOpen();
        }}
      >
        Edit Chapters
      </button>
      <button
        type="button"
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
          console.log(blobURL);
        }}
      >
        export as Epub
      </button>
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
