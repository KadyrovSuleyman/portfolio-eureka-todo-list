/* eslint-disable no-plusplus */
import TaskList from '@/components/taskList/taskList.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import list, { FILTER } from '@/state/list';

describe('taskList.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(TaskList);
    expect(wrapper.exists()).toBeTruthy();

    const addingTask = wrapper.find('.app-taskList');
    expect(addingTask.exists()).toBeTruthy();
  });

  it('watchs list changes', async () => {
    wrapper = mount(TaskList);
    expect(wrapper.findAll('.taskList-taskItem').length).toBe(0);

    list.add('first');

    list.add('second');
    list.toComplete(2);

    list.add('third');

    list.add('fourth');
    list.toComplete(4);

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.taskList-taskItem').length).toBe(4);

    expect(wrapper.findAll('.taskList-taskItem')[0].find('span').text()).toBe('first');
    expect(wrapper.findAll('.taskList-taskItem')[1].find('span').text()).toBe('second');
    expect(wrapper.findAll('.taskList-taskItem')[2].find('span').text()).toBe('third');
    expect(wrapper.findAll('.taskList-taskItem')[3].find('span').text()).toBe('fourth');

    list.delete(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.taskList-taskItem')[0].find('span').text()).toBe('second');
    expect(wrapper.findAll('.taskList-taskItem')[1].find('span').text()).toBe('third');
    expect(wrapper.findAll('.taskList-taskItem')[2].find('span').text()).toBe('fourth');

    list.setFilter(FILTER.ACTIVE);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.taskList-taskItem').length).toBe(1);
    expect(wrapper.findAll('.taskList-taskItem')[0].find('span').text()).toBe('third');

    list.setFilter(FILTER.COMPLETED);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.taskList-taskItem').length).toBe(2);
    expect(wrapper.findAll('.taskList-taskItem')[0].find('span').text()).toBe('second');
    expect(wrapper.findAll('.taskList-taskItem')[1].find('span').text()).toBe('fourth');

    list.setFilter(FILTER.ALL);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.taskList-taskItem').length).toBe(3);
    expect(wrapper.findAll('.taskList-taskItem')[0].find('span').text()).toBe('second');
    expect(wrapper.findAll('.taskList-taskItem')[1].find('span').text()).toBe('third');
    expect(wrapper.findAll('.taskList-taskItem')[2].find('span').text()).toBe('fourth');
  });
});
