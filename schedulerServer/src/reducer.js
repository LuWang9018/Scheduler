import {setEntries, next, vote, INITIAL_STATE, GetClassData} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update('vote',
                        voteState => vote(voteState, action.entry));
  case 'GET_CLASS_DATA':
  	console.log("reducer")
  	return GetClassData(state);
  }
  return state;
}