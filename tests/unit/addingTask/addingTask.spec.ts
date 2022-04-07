import AddingTask from '@/components/addingTask/addingTask.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { value } from '@/components/addingTask/adapter';
import addHandler from '@/components/addingTask/handlers';

jest.mock('@/components/addingTask/adapter', () => {
  const { ref } = jest.requireActual('vue');
  return {
    __esModule: true,
    value: ref('init'),
  };
});

jest.mock('@/components/addingTask/handlers', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  expect(value.value).toBe('init');
});

afterEach(() => {
  value.value = 'init';
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
    expect(value.value).toBe('init');

    expect((wrapper.find('.addingTask-input').element as HTMLInputElement)
      .value).toBe('init');

    const input = wrapper.find('input');

    value.value = 'outer change';
    await wrapper.vm.$nextTick();
    expect(input.element.value).toBe('outer change');

    input.element.value = 'inner change';
    await input.trigger('input');
    expect(value.value).toBe('inner change');
  });

  it('button click', async () => {
    wrapper = mount(AddingTask);

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    input.element.value = 'first';
    await input.trigger('input');
    await button.trigger('click');
    expect(addHandler).toBeCalledTimes(1);
    expect(addHandler).toBeCalledWith('first');
  });
});
