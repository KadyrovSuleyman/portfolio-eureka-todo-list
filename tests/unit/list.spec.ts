import list, { FILTER } from '@/state/list';

describe('list', () => {
  beforeEach(() => {
    list.clean();
    expect(list.get.value()).toEqual([]);
  });

  it('add', () => {
    list.add('first');
    expect(list.get.value()[0]).toEqual({
      id: 1,
      text: 'first',
      active: true,
    });

    list.add('second');
    expect(list.get.value()[1]).toEqual({
      id: 2,
      text: 'second',
      active: true,
    });
  });

  it('delete', () => {
    list.add('first');
    list.add('second');
    list.add('third');

    list.delete(2);
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: true,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
    ]);

    list.add('fourth');
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: true,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
      {
        id: 4,
        text: 'fourth',
        active: true,
      },
    ]);

    list.delete(1);
    expect(list.get.value()).toEqual([
      {
        id: 3,
        text: 'third',
        active: true,
      },
      {
        id: 4,
        text: 'fourth',
        active: true,
      },
    ]);
  });

  it('toActive toComplete', () => {
    list.add('first');
    list.add('second');
    list.add('third');

    list.toComplete(2);
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: true,
      },
      {
        id: 2,
        text: 'second',
        active: false,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
    ]);

    list.toComplete(1);
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: false,
      },
      {
        id: 2,
        text: 'second',
        active: false,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
    ]);

    list.toActive(2);
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: false,
      },
      {
        id: 2,
        text: 'second',
        active: true,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
    ]);
  });

  it('setFilter', () => {
    list.add('first');
    list.add('second');
    list.add('third');
    list.add('fourth');
    list.toComplete(2);
    list.toComplete(4);

    list.setFilter(FILTER.COMPLETED);
    expect(list.get.value()).toEqual([
      {
        id: 2,
        text: 'second',
        active: false,
      },
      {
        id: 4,
        text: 'fourth',
        active: false,
      },
    ]);

    list.setFilter(FILTER.ACTIVE);
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: true,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
    ]);

    list.add('fifth');
    expect(list.get.value()).toEqual([
      {
        id: 1,
        text: 'first',
        active: true,
      },
      {
        id: 3,
        text: 'third',
        active: true,
      },
      {
        id: 5,
        text: 'fifth',
        active: true,
      },
    ]);
  });
});
