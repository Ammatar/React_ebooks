import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  paper: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '5px',
    width: '200px',
    height: '300px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buy: {
    // position: 'relative',
    justifySelf: 'end',
    // alignItems: 'space-around'
    // marginTop: '150px',
    // bottom: '-100px',
  }
}));
const PublicCard = ({props}) => {
  console.log(props);
  const classes = useStyles();
  return ( 
    <>
    <div className={classes.paper}>
      <p><strong>{props.title}</strong> <br/>{props.author}</p>
      
      <Button variant="contained"
          size="small" className={classes.buy}>купить</Button>
    </div>
    </>
   );
}
 
export default PublicCard;
