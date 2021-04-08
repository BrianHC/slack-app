let commands = require('../../../src/commands');

describe('clap slash command', () => {
    test('function exists', () => {
        expect(typeof commands.clap).toBe('function')
    })
})