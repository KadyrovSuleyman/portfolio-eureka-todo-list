import { mount, VueWrapper } from '@vue/test-utils';
import App from '@/components/app.vue';

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
