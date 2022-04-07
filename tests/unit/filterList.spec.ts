/* eslint-disable no-plusplus */
import FilterList from '@/components/filterList/filterList.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { defaultFilter, FILTER, filterName } from '@/state/filter';
import { selectedFilter } from '@/components/filterList/adapter';
import { TaskI } from '@/state/types';

// ======================================
jest.mock('@/state/filter', () => {
  enum MOCKED_FILTER {
    ALL,
    ACTIVE,
    COMPLETED
  }
  const mockedDefaultFilter = MOCKED_FILTER.ALL;

  type FindFuncT = (list: TaskI[]) => TaskI[];

  const findAll = (list: TaskI[]) => [...list];
  const findActive = (list: TaskI[]) => list.filter((task) => task.active === true);
  const findCompleted = (list: TaskI[]) => list.filter((task) => task.active === false);

  const filterFunc = new Map<MOCKED_FILTER, FindFuncT>([
    [MOCKED_FILTER.ALL, findAll],
    [MOCKED_FILTER.ACTIVE, findActive],
    [MOCKED_FILTER.COMPLETED, findCompleted],
  ]);

  return {
    __esModule: true,
    FILTER: MOCKED_FILTER,
    defaultFilter: MOCKED_FILTER.ALL,
    filterName: new Map<MOCKED_FILTER, string>([
      [MOCKED_FILTER.ALL, 'Все'],
      [MOCKED_FILTER.ACTIVE, 'Активные'],
      [MOCKED_FILTER.COMPLETED, 'Завершенные'],
    ]),
    toFilter: (list: TaskI[], filterType: MOCKED_FILTER) => {
      const func = filterFunc.get(filterType);
      if (!func) {
        const defaultFunc = filterFunc.get(mockedDefaultFilter);
        if (!defaultFunc) {
          return list;
        }
        return defaultFunc(list);
      }
      return func(list);
    },
  };
});

// ======================================
describe('filterList.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(FilterList);
    expect(wrapper.exists()).toBeTruthy();

    const addingFilter = wrapper.find('.app-filterList');
    expect(addingFilter.exists()).toBeTruthy();
  });

  it('watchs list changes', async () => {
    wrapper = mount(FilterList);
    const listLength = Object.values(FILTER)
      .filter((key) => typeof key !== 'string').length;

    expect(wrapper.findAll('.filterList-filterItem').length).toBe(listLength);

    expect(wrapper.find('.filterList-filterItem__selected').text())
      .toBe(filterName.get(defaultFilter));

    selectedFilter.value = 1 as FILTER;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.filterList-filterItem__selected').text())
      .toBe(filterName.get(1 as FILTER));

    await wrapper.findAll('.filterList-filterItem')[2].find('button').trigger('click');
    expect(wrapper.find('.filterList-filterItem__selected').text())
      .toBe(filterName.get(2 as FILTER));
  });
});
