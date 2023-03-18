import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Events from './../../src/components/Events.vue';
import VolunteerApplicationForm from './../../src/components/VolunteerApplicationForm.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});


describe('Events.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(Events, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof Events.data).toBe('function')
  })

  test('renders child component VolunteerApplicationForm', () => {
    expect(wrapper.findComponent(VolunteerApplicationForm).exists()).toBe(true);
  });

});
