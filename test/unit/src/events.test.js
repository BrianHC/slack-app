let events = require('../../../src/events');

describe('app home opened', () => {
    test('event exists', () => {
        expect(typeof events.app_home_opened).toBe('function')
    })
})