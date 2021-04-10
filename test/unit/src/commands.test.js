let commands = require('../../../src/commands');

describe('clap slash command', () => {
    test('function exists', () => {
        expect(typeof commands.clap).toBe('function')
    })
})

describe('save slash command', () => {
    test('function exists', () => {
        expect( typeof commands.save).toBe('function')
    })
})