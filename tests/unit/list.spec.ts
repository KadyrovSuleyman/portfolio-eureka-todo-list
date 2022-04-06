import list from '@/state/list';

describe('list', () => {
  beforeEach(() => {
    list.value.clean();
    expect(list.value.get()).toEqual([]);
  });

  it('add', () => {
    list.value.add('first');
    expect(list.value.get()[0]).toEqual({
      id: 1,
      text: 'first',
      isActive: false,
    });

    list.value.add('second');
    expect(list.value.get()[1]).toEqual({
      id: 2,
      text: 'second',
      isActive: false,
    });
  });
});
