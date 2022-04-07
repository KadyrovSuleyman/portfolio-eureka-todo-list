import { mount, VueWrapper } from '@vue/test-utils';
import App from '@/components/app.vue';

const list = [
  {
    id: 1,
    text: 'foo',
    active: false,
  },
  {
    id: 2,
    text: 'bar',
    active: false,
  },
  {
    id: 3,
    text: 'foo-bar',
    active: true,
  },
];

jest.mock(('@/components/handlers'), () => {
  const originalModule = jest.requireActual('@/components/handlers');
  return {
    __esModule: true,
    ...originalModule,
    toLoadTaskList: () => new Promise((resolve) => {
      resolve([...list]);
    }),
  };
});

describe('app.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(App);
    expect(wrapper.exists()).toBeTruthy();

    const app = wrapper.find('.app');
    expect(app.exists()).toBeTruthy();
    expect(app.find('.app-addingTask').exists()).toBeTruthy();
    expect(app.find('.app-taskList').exists()).toBeTruthy();
    expect(app.find('.app-filterList').exists()).toBeTruthy();
  });
});
