import TaskItem from '@/components/taskItem/taskItem.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('taskItem.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(TaskItem);
    expect(wrapper.exists()).toBeTruthy();

    const item = wrapper.find('.taskList-taskItem');
    expect(item.exists()).toBeTruthy();
    expect(item.find('.taskItem-name').exists()).toBeTruthy();
    expect(item.find('.taskItem-delete').exists()).toBeTruthy();
  });

  it('watchs props', async () => {
    wrapper = mount(TaskItem, {
      props: {
        active: false,
        name: 'before',
      },
    });

    const item = wrapper.find('.taskList-taskItem');
    expect(item.exists()).toBeTruthy();
    expect(item.classes()).toEqual(['taskList-taskItem']);

    await wrapper.setProps({
      ...wrapper.props(),
      active: true,
    });
    expect(wrapper.props().active).toBeTruthy();
    expect(item.classes()).toEqual(['taskList-taskItem', 'taskList-taskItem__active']);

    await wrapper.setProps({
      ...wrapper.props(),
      active: false,
    });
    expect(wrapper.props().active).toBeFalsy();
    expect(item.classes()).toEqual(['taskList-taskItem']);

    expect(item.find('span').text()).toBe('before');
    await wrapper.setProps({
      ...wrapper.props(),
      name: 'after',
    });
    expect(wrapper.props().name).toBe('after');
    expect(item.find('span').text()).toBe('after');
  });
});
