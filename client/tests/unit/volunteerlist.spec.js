import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import VolunteerList from './../../src/components/VolunteerList.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});


describe('VolunteerList.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(VolunteerList, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof VolunteerList.data).toBe('function')
  });

});
