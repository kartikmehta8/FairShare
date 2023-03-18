import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import CreateEventForm from './../../src/components/CreateEventForm.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});


describe('CreateEventForm.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(CreateEventForm, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof CreateEventForm.data).toBe('function')
  });

});
