import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import VolunteerApplicationForm from './../../src/components/VolunteerApplicationForm.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('VolunteerApplicationForm.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(VolunteerApplicationForm, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof VolunteerApplicationForm.data).toBe('function')
  });

});
