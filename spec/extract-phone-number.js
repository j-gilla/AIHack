/* eslint-env mocha */
const extractNumber = require('../helper-functions/extract-phone-number.js');
const chai = require('chai');
const expect = require('chai').expect;

describe('extractNumber', () => {
  it('is a function', () => {
    expect(extractNumber).to.be.a('function');
  });
  it('returns a number', () => {
    expect(extractNumber()).to.be.a('number');
  });
  xit('should be a valid UK phone number', () => {
    // write this test...
  });
});
