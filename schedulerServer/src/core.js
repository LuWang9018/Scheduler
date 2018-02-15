import {List, Map} from 'immutable';

var moment = require('moment');

var Data = {    				
	//Class list
	//TODO
	//should get from server
	//Define a fromate later
	Class: [
			{Name: "Eng",
			 Code: 101,
			 Section: "001",
			 TimeFrom: [moment('06:10 am', "HH:mm A"),
			            moment('08:10 am', "HH:mm A")],
			 TimeTo: [moment('07:30 am', "HH:mm A"),
			 		  moment('9:10 am', "HH:mm A")],
			 Date: [["Monday", "Wednesday", "Friday"],
			        ["Monday", "Wednesday"]],
			 LocationB: ["MC", "MC"],
			 LocationR: ["3003", "3006"],
			 Prof: "SB",
                Types: ["LEC", "TUT"],
			 Color: ["Red", "Green"],
			}
		],
};

export const INITIAL_STATE = Map();

export function GetClassData(state){
    console.log("core");
	return state.set('ClassInfo', Data.Class);
}


export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}


export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

