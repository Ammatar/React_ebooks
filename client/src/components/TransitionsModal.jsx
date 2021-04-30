import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" size="small" type="button" onClick={handleOpen}>
        Регистрация
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form
              className="main create newBook"
              style={{
                width: '500px',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await fetch('http://localhost:3000/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({
                    username: e.target.username.value,
                    authorname: e.target.authorname.value,
                    password: e.target.password.value,
                  }),
                });
                handleClose();
              }}
            >
              Имя пользователя:{' '}
              <Input
                type="text"
                name="username"
                autoFocus={true}
                fullWidth={true}
              />
              <br />
              Имя Автора (Будет отображаться в поле автор при создании книг):{' '}
              <Input type="text" name="authorname" fullWidth={true} />
              <br />
              Пароль: <Input type="password" name="password" fullWidth={true} />
              <br />
              <Button type="submit" variant="contained" size="small">
                Регистрация
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
