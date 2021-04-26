import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getChapterThunk, setChapterThunk, getAllBooks} from '../redux/reducer'

export default function TinyEditorComponent({prop}) {
  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  // const chap = dispatch(getChapterThunk());
  const [textValue, setTextValue] = useState('chap.data')
  // const [id, setId] = useState(chap.id)
  // const newId = chap.id
  console.log('tiny props', state.chapter, prop.id);
  useEffect(() => {
    dispatch(getAllBooks())
  }, [state.allBooks]);
  // useEffect(() => {
  //   // setTextValue(prop.prop)
  //   console.log(textValue);
  // }, [textValue]);

  const handleChange = () => {
    console.log('==>', tinymce.activeEditor.getContent());
      setTextValue(tinymce.activeEditor.getContent())
      dispatch(setChapterThunk({id: prop.id, data: tinymce.activeEditor.getContent()}))
        // dispatch({type: 'set_chapter', payload: {id: id, data: textValue}})
        // dispatch(getAllBooks())
  }
  
  return (
    <Editor
      initialValue={prop.prop}
      init={{
        height: '500px',
        width: '50vw',
        plugins:'lists code fullscreen',
        skin: false,
        content_css: false,
        content_style: [contentCss, contentUiCss].join('\n'),
      }}
      // value={textValue}
      onChange={handleChange}
    />
  );
}
