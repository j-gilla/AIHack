/* eslint-env mocha */
const getGreeting = require('../helper-functions/time-greeting.js');
const chai = require('chai');
const expect = require('chai').expect;

describe('getGreeting', () => {
  it('is a function', () => {
    expect(getGreeting).to.be.a('function');
  });
  it('expects no arguments', () => {
    expect(getGreeting.length).to.eql(0);
  });
  it('returns a string', () => {
    expect(getGreeting()).to.be.a('string');
  });
});
