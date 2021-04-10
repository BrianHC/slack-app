let cache = require('../../../src/cache');

describe('cache module', () => {
    test('file exists', () => {
        expect(typeof cache).not.toBe(undefined)
    })
})

describe('user cache', () => {
    test('user cache exists', () => {
        expect( typeof cache.user).not.toBe("undefined")
    })
    test('user has to init user cache', () => {
        expect( typeof cache.user.init ).toBe('function')
    })
    test('user is able to fetch from cache', () => {
        expect( typeof cache.user.fetch ).toBe('function')
    })
})