import AddingTask from '@/components/addingTask/addingTask.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import inputValue from '@/components/addingTask/adapter';
import toWriteInput from '@/components/addingTask/handlers';
import list from '@/state/list';

jest.mock('@/components/addingTask/adapter', () => {
  const { ref } = jest.requireActual('vue');
  return {
    __esModule: true,
    default: ref('init'),
  };
});

jest.mock('@/components/addingTask/handlers', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/state/list', () => ({
  __esModule: true,
  default: { value: 'mockedValue' },
}));

beforeEach(() => {
  expect(inputValue.value).toBe('init');
});

afterEach(() => {
  inputValue.value = 'init';
});

// написал тесты
describe('addingTask.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(AddingTask);
    expect(wrapper.exists()).toBeTruthy();

    const addingTask = wrapper.find('.app-addingTask');
    expect(addingTask.exists()).toBeTruthy();
    expect(addingTask.find('.addingTask-input').exists()).toBeTruthy();
    expect(addingTask.find('.addingTask-button').exists()).toBeTruthy();
  });

  it('binds value', async () => {
    wrapper = mount(AddingTask);
    expect(inputValue.value).toBe('init');

    expect((wrapper.find('.addingTask-input').element as HTMLInputElement)
      .value).toBe('init');

    const input = wrapper.find('input');

    inputValue.value = 'outer change';
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('outer change');

    input.element.value = 'inner change';
    await input.trigger('input');
    expect(inputValue.value).toBe('inner change');
  });

  it('button click', async () => {
    wrapper = mount(AddingTask);

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    input.element.value = 'first';
    await input.trigger('input');
    await button.trigger('click');
    expect(toWriteInput).toBeCalledTimes(1);

    expect(toWriteInput).toBeCalledWith(list.value, 'first');
    expect(input.element.value).toBe('');
  });
});
