const { getStoryId } = require('./pivotal');

describe('getStoryId()', () => {
  it('fetches story id when present', () => {
    expect(getStoryId('feature/add-prepare-commit-msg-hook_168690318')).toEqual({
      formatted: '#168690318',
      found: true,
      id: '168690318',
    });

    expect(getStoryId('feature/add-prepare-commit-msg-hook-#168690318')).toEqual({
      formatted: '#168690318',
      found: true,
      id: '168690318',
    });
  });

  it('when not present', () => {
    expect(getStoryId('feature/add-prepare-commit-msg-hook')).toEqual({
      formatted: '#',
      found: false,
      id: '',
    });

    expect(getStoryId('xyz123')).toEqual({
      formatted: '#',
      found: false,
      id: '',
    });
  });
});
