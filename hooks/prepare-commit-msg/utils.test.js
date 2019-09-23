const { shouldSkipHook, appendIdToMessage } = require('./utils');

describe('shouldSkipHook()', () => {
  it('should skip non-message types', () => {
    expect(shouldSkipHook('', 'commit')).toBeTruthy();
  });

  it('should not skip message type', () => {
    expect(shouldSkipHook('', 'message')).toBeFalsy();
  });
});

describe('appendIdToMessage()', () => {
  it('appends story id to message', () => {
    expect(appendIdToMessage('some_message', '#123456789')).toBe('some_message\n---\n[#123456789]');
  });

  it('does not append if it already exists', () => {
    expect(appendIdToMessage('some_message with id [#123456789]', '#123456789')).toBe(
      'some_message with id [#123456789]'
    );
  });
});
