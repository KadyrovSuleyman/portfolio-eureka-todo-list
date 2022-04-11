/* eslint-disable no-plusplus */
import TaskList from '@/components/taskList/taskList.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import list from '@/state/list';
import { FILTER } from '@/state/filter';

// ======================================
jest.mock('@/state/filter', () => {
  const originalModule = jest.requireActual('@/state/filter');
  enum MOCKED_FILTER {
    ALL,
    ACTIVE,
    COMPLETED,
  }

  return {
    __esModule: true,
    ...originalModule,
    FILTER: MOCKED_FILTER,
  };
});

jest.mock('@/state/list', () => {
  const mockedFilter = jest.requireMock('@/state/filter');
  const { ref, computed } = jest.requireActual('vue');

  const List = () => {
    const mockedList = ref([]);
    let id = 0;

    const filter = ref(mockedFilter.FILTER.ALL);

    const findTask = (targetId: number) => mockedList.value.find(
      (targetTask: any) => targetTask.id === targetId,
    );

    return {
      get: computed(() => () => mockedFilter.toFilter(mockedList.value, filter.value)),

      isEmpty: computed(() => mockedList.value.length === 0),

      clean: () => {
        mockedList.value = [];
        id = 0;
      },

      add: (text: string) => {
        mockedList.value.push({
          id: ++id,
          text,
          active: true,
        });
      },

      delete: (targetId: number) => {
        mockedList.value = mockedList.value.filter((task: any) => task.id !== targetId);
      },

      toActive: (targetId: number) => {
        const task = findTask(targetId);
        if (!task) {
          return;
        }
        task.active = true;
      },

      toComplete: (targetId: number) => {
        const task = findTask(targetId);
        if (!task) {
          return;
        }
        task.active = false;
      },

      setFilter: (newFilter: FILTER) => {
        filter.value = newFilter;
      },
    };
  };

  return {
    __esModule: true,
    default: List(),
  };
});

// ======================================
describe('taskList.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(TaskList);
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find('.emptyListPlaceholder').exists()).toBeTruthy();
    const taskList = wrapper.find('.app-taskList');
    expect(taskList.exists()).toBeFalsy();
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
    expect(wrapper.find('.app-taskList').exists).toBeTruthy();
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
