import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import CampaignChart from './../../src/components/CampaignChart.vue';

let wrapper;

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(Vuetify, {});


describe('CampaignChart.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(CampaignChart, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof CampaignChart.data).toBe('function')
  });

});
