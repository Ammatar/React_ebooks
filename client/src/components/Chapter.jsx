import parse from 'html-react-parser'
import TinyEditorComponent from './TinyEditorComponent'


const Chapter = ({props}) => {
  console.log('chapter props', props.[0].data);
  
  return ( 
    <>
    {/* tini mce  */}
    {/* <TinyEditorComponent props={props.[0].data}/> */}
     {/* <div>Chapter 1</div>
    {parse(props.[0].data)} */}
    </>
   );
}
 
export default Chapter;
