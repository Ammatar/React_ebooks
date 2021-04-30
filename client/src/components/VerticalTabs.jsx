import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from './Card';
import CreateNewBook from './CreateNewBook';
import PublicCard from './PublicCard'

import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllPublic } from '../redux/reducer';
import TransitionsModal from './TransitionsModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // width: '82vw',
    minHeight: '60vh',
    border: '1px dotted black',
    backgroundColor: '#f0f8fa',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const dispatch = useDispatch();
  // const bookState = useSelector((state) => state.book);
  const allBooks = useSelector((state) => state.allBooks);
  const publicBooks = useSelector(state => state.publicBooks)
  const loggedUser = useSelector((state) => state.user)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const [allBooks, setAllBooks] = React.useState([])
  const [modalData, setModalData] = React.useState();
  const [user, setUser] = React.useState(null)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // allBooks = getAllBooks(loggedUser.authorname);
    // console.log('fetch all books', allBooks);
  }, []);
  const getUser = async () => {
    const response = await fetch('http://localhost:3000/user', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
     
    })
    const responseData = await response.json();
    setUser({username: responseData.username, authorname: responseData.authorname})
    dispatch({type: "SET_USER", payload: {username: responseData.username, authorname: responseData.authorname}})
    dispatch(getAllBooks(responseData.authorname))
    // console.log(responseData);
  }
  useEffect( () => {
   getUser()
  }, []);
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {/* ------------------------------------- TABS --------------------------------------------------- */}
        <Tab
          label="Мои книги"
          {...a11yProps(0)}
          onClick={() => {if(user && user.authorname) dispatch(getAllBooks(user.authorname))}}
        />
        <Tab label="Создать новую" {...a11yProps(1)} />

        {loggedUser && loggedUser.username ? <Tab label="Профиль" {...a11yProps(2)} />
        : <Tab label="Вход" {...a11yProps(2)} />
        }
        <Tab label="Библиотека" {...a11yProps(3)} onClick={() => {
          // <-------------------------------------------------------- get public books
          dispatch(getAllPublic())
        }}/>
        {/* <Tab label="Item Five" {...a11yProps(5)} />
        <Tab label="Item Six" {...a11yProps(6)} />
      <Tab label="Item Seven" {...a11yProps(7)} /> */}
      </Tabs>
      {/* <Divider variant='fullWidth'/> */}
       {/* ------------------------------------- TAB PANELS --------------------------------------------------- */}
      <TabPanel value={value} index={0}>
      Книги:
        <div className="biblio">
          {allBooks
            ? allBooks.map((el) => {
                return (
                  <Card
                    props={{ el }}
                    key={el._id}
                    onClick={() => setModalData({ el })}
                  />
                );
              })
            : null}
          {/* {bookState ? <BookEdit props={bookState}/> : null} */}
        </div>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      {loggedUser && loggedUser.username ?
        <CreateNewBook /> : null}
      </TabPanel>
      {/* -------------------------------------------- TABS PANEL
      ------------------------------------------------LOGIN & PROFILE ----------------------------- */}
      {loggedUser && loggedUser.username ?
      <TabPanel value={value} index={2}>
      <div className="biblio">
        <div>
      Профиль:
      <div> Имя Автора: {user ? user.authorname : null}</div>
      <div> Имя Пользователя: {user ? user.username : null}</div>
      <Button variant="contained"
          size="small"
          onClick={async () => {
        
        const logoff = await fetch('http://localhost:3000/logoff', {
          method: "POST",
          credentials: 'include',
          headers: {"Content-Type": "application/json"},
          
        })
        const logoffData = await logoff.json()
        dispatch({type: 'SET_USER', payload: {username: logoffData}} )
        console.log(logoffData);
        window.location = '/'
      }}>Выход</Button>
      </div>
      </div>
      </TabPanel>:
      <div>
      <TabPanel value={value} index={2}>
        <div className="biblio">

       
      <form method="post" className="main create" style={{width: "500px", justifyContent: "center", alignSelf: "center"}} onSubmit={ async (e) => {
          e.preventDefault()
          const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              username: e.target.username.value,
              password: e.target.password.value,
            })
          })
          const responseData = await response.json()
          setUser({username: responseData.username, authorname: responseData.authorname})
          dispatch({type: "SET_USER", payload: {username: responseData.username, authorname: responseData.authorname}})
          console.log('Login response', responseData);
          window.location = '/'
        } 
        }>
              Имя пользователя: <Input type="text" name="username" fullWidth={true}/>
              <br/>
              Пароль: <Input type="password" name="password" fullWidth={true}/>
              <br/>
              <Button type="submit" variant="contained"
          size="small">Вход</Button><TransitionsModal/>
        </form>
        </div>
      </TabPanel>
       </div>
      }
      {/* -------------------------------------------- TABS PANEL
      ------------------------------------------------LOGIN & PROFILE END----------------------------- */}
      <TabPanel value={value} index={3}>
        <>
        <div>Библиотека: </div> 
        <div className="biblio">
        {publicBooks ? publicBooks.map((el) => {
          return <PublicCard props={el} key={Math.random() }/>
          
        }): null}
        </div>
        </>
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Seven
      </TabPanel>
    </div>
  );
}
