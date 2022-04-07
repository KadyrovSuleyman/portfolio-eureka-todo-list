import setFilterHandler from '@/components/filterList/handlers';
import { FILTER, toSetTaskFilter, selectedFilter } from '@/components/filterList/adapter';

jest.mock('@/components/filterList/adapter', () => {
  enum MOCKED_FILTER {
    ALL,
    CONNECTED,
  }
  return {
    __esModule: true,
    FILTER: MOCKED_FILTER,
    toSetTaskFilter: jest.fn(),
    selectedFilter: { value: 'init' },
  };
});

it('setFilterHandler', () => {
  setFilterHandler(FILTER.ALL)();
  expect(toSetTaskFilter).toBeCalledTimes(1);
  expect(toSetTaskFilter).toBeCalledWith(FILTER.ALL);
  expect(selectedFilter.value).toBe(FILTER.ALL);
});
