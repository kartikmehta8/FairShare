import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Home from './../../src/components/Home.vue';
import Events from './../../src/components/Events.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('Home.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(Home, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof Home.data).toBe('function')
  })

  test('renders props.msg when passed', () => {
    const msg = 'Welcome to Sejiwa ';
    wrapper.setProps ({ msg });
    expect(wrapper.text()).toMatch(msg);
  });

  test('renders child component Events', () => {
    expect(wrapper.findComponent(Events).exists()).toBe(true);
  });

});  
