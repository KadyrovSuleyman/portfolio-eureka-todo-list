import FilterItem from '@/components/filterItem/filterItem.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('filterItem.vue', () => {
  let wrapper: VueWrapper<any>;
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    wrapper = mount(FilterItem);
    expect(wrapper.exists()).toBeTruthy();

    const item = wrapper.find('.filterList-filterItem');
    expect(item.exists()).toBeTruthy();
    expect(item.find('.filterItem-button').exists()).toBeTruthy();
  });

  it('watchs props', async () => {
    wrapper = mount(FilterItem, {
      props: {
        selected: false,
        name: 'before',
      },
    });

    const item = wrapper.find('.filterList-filterItem');
    expect(item.exists()).toBeTruthy();
    expect(item.classes()).toEqual(['filterList-filterItem']);

    await wrapper.setProps({
      ...wrapper.props(),
      selected: true,
    });
    expect(wrapper.props().selected).toBeTruthy();
    expect(item.classes()).toEqual(['filterList-filterItem', 'filterList-filterItem__selected']);

    await wrapper.setProps({
      ...wrapper.props(),
      selected: false,
    });
    expect(wrapper.props().selected).toBeFalsy();
    expect(item.classes()).toEqual(['filterList-filterItem']);

    expect(item.text()).toBe('before');
    await wrapper.setProps({
      ...wrapper.props(),
      name: 'after',
    });
    expect(wrapper.props().name).toBe('after');
    expect(item.text()).toBe('after');
  });
});
