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
        selected: false,
        name: 'before',
      },
    });

    const item = wrapper.find('.taskList-taskItem');
    expect(item.exists()).toBeTruthy();
    expect(item.classes()).toEqual(['taskList-taskItem']);

    await wrapper.setProps({
      ...wrapper.props(),
      selected: true,
    });
    expect(wrapper.props().selected).toBeTruthy();
    expect(item.classes()).toEqual(['taskList-taskItem', 'taskList-taskItem__selected']);

    await wrapper.setProps({
      ...wrapper.props(),
      selected: false,
    });
    expect(wrapper.props().selected).toBeFalsy();
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
