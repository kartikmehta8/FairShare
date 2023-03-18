import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import MemberEventList from './../../src/components/MemberEventList.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('MemberEventList.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(MemberEventList, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof MemberEventList.data).toBe('function')
  });

});
