import axios from 'axios'

export function getCharacter() {
  return async function (dispatch)  {
    let info = await axios.get('http://localhost:3001/character')
    return dispatch({
      type: 'GET_CHARACTER',
      payload:info.data
    })
  }

}