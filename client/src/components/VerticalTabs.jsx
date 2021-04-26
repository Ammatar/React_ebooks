import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from './Card'
import CreateNewBook from './CreateNewBook'
import BookEdit from './BookEdit'
import {useDispatch, useSelector} from 'react-redux'
import {getAllBooks} from '../redux/reducer'

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
          <Typography>{children}</Typography>
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
    height: '50vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const dispatch = useDispatch()
  const bookState = useSelector(state => state.book)
  const allBooks = useSelector(state => state.allBooks)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const [allBooks, setAllBooks] = React.useState([])
  const [modalData, setModalData] = React.useState()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getAllBooks = async () => {
  //   const response = await fetch('http://localhost:3000/getAllBooks', {
  //     method: "POST",
  //     headers: {"Content-Type" : "application/json"},
  //     mode: 'cors',
  //   })
  //   const data = await response.json()
  //   setAllBooks(data)
  //   // return data;
  // }
  useEffect(() => {
    
    // allBooks = getAllBooks();
    console.log('fetch all books', allBooks);

  }, [allBooks])
  useEffect(() => {

  }, [])
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
        <Tab label="Create New..." {...a11yProps(0)} />
        <Tab label="All Books" {...a11yProps(1)} onClick={() => dispatch(getAllBooks())}/>
        {/* <Tab label="Item Two" {...a11yProps(2)} />
        <Tab label="Item Three" {...a11yProps(3)} />
        <Tab label="Item Four" {...a11yProps(4)} />
        <Tab label="Item Five" {...a11yProps(5)} />
        <Tab label="Item Six" {...a11yProps(6)} />
        <Tab label="Item Seven" {...a11yProps(7)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <CreateNewBook/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item One
        {allBooks ? allBooks.map((el) => {
          return <Card props = {{el}} key={el._id} onClick={() => setModalData({el})}/>
        }) : null}
        {/* {bookState ? <BookEdit props={bookState}/> : null} */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Five
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
