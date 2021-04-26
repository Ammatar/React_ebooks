const initialState = {
  book: {},
  chapter: {},
  allBooks: []
  // username: '',
  // topics: [],
  // questions: [],
  // game: {
  //   id: '1',
  //   player: '',
  //   score: 0,
  // },
};
export const getChapterThunk = () => {
  return (dispatch, getState) => {
    const chap = getState(state => state)
    console.log('reducer', chap.chapter.data);
    return chap.chapter;
  }
}
export const setChapterThunk = ({id, data}) => {
  return async (dispatch) => {
    console.log('id',id);
    dispatch({type: 'set_chapter', payload: {id, data}})
    const response = await fetch('http://localhost:3000/chapterEdit', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id,
      data
    })
    })
    const responseJSON = response.json()
    dispatch(getAllBooks())
  }
}
export const getAllBooks = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3000/getAllBooks', {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      mode: 'cors',
    })
    const {allBooks} = await response.json()
    console.log('get all books data =>', allBooks);
    dispatch({type: 'get_allBooks', payload: allBooks})
    // setAllBooks(data)
    // return data;
  }
}
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_USER':
      const username = payload;
      return {
        ...state,
        username,
      };
    case 'LOGOUT':
      return initialState;
      // {
      //   ...state,
      //   username: null,
      // };
    case 'set_book':
      return {
        ...state,
        book: {...payload}
      }
    case 'set_chapter':
      return {
        ...state, allBooks: [...state.allBooks]
      }
    case 'get_chapter': {
      return {...state.chapter};
    }
    case 'get_allBooks':
      return {...state, allBooks: payload}
    default:
      return state;
  }
}
