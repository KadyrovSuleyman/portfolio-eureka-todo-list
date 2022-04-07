import addHandler from '@/components/addingTask/handlers';
import { toAddTask, value } from '@/components/addingTask/adapter';

jest.mock('@/components/addingTask/adapter', () => ({
  __esModule: true,
  toAddTask: jest.fn(),
  value: { value: 'init' },
}));

it('addHandler', () => {
  addHandler('')(new Event('submit'));
  expect(toAddTask).toBeCalledTimes(0);

  addHandler('value')(new Event('submit'));
  expect(toAddTask).toBeCalledTimes(1);
  expect(toAddTask).toBeCalledWith('value');
  expect(value.value).toBe('');
});
