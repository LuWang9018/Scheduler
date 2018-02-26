import {List, Map} from 'immutable';
import {expect} from 'chai';
var chai = require('chai');
chai.use(require('chai-json'))

import{ Search_Class_General } from '../../src/ClassData/Search/SearchData';

describe('Request from DB', () => {

  describe('Get Class-General', () => {

    it('QUARY', () => {

    	Search_Class_General(null, (err, Data) => 
	    	{
		    	expect(Data).to.equal(
		      		

		      	);
	    	}

    	);


    });

  });

});
