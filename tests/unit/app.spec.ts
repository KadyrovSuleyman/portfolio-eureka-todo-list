import { mount, VueWrapper } from '@vue/test-utils';
import App from '@/components/app.vue';
import { isLoaded, taskListInit } from '@/components/adapter';

jest.mock('@/components/adapter', () => {
  const { ref } = jest.requireActual('vue');

  return {
    __esModule: true,
    isLoaded: ref(false),
    taskListInit: jest.fn(),
  };
});

describe('app.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', async () => {
    wrapper = mount(App);
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find('.loadPlaceholder').exists()).toBeTruthy();
    expect(taskListInit).toBeCalledTimes(1);

    isLoaded.value = true;
    await wrapper.vm.$nextTick();

    const app = wrapper.find('.app');
    expect(app.exists()).toBeTruthy();
    expect(app.find('.app-addingTask').exists()).toBeTruthy();
    expect(app.find('.emptyListPlaceholder').exists()).toBeTruthy();
    expect(app.find('.app-filterList').exists()).toBeTruthy();
  });
});
