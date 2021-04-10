let cache = require('../../../src/cache');

describe('cache module', () => {
    test('file exists', () => {
        expect(typeof cache).not.toBe(undefined)
    })
})