import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Home from './../../src/components/Home.vue';
import Events from './../../src/components/Events.vue';
import VolunteerApplicationForm from './../../src/components/VolunteerApplicationForm.vue';
import Member from './../../src/components/Member.vue';
import MemberEventList from './../../src/components/MemberEventList.vue';
import VolunteerList from './../../src/components/VolunteerList.vue';
import CreateEventForm from './../../src/components/CreateEventForm.vue';
import CampaignChart from './../../src/components/CampaignChart.vue';

//App
// 1. Navigation exist (router)

//Home Page
//1. Content exist
//2. Render props msg 

//Events
//1. Event table exist
//2. Search button in event table is working
//3. When apply link clicked, form should be displayed

//Member
//1. Should have this component:
    //Event List Table exist
    //Volunteer List Table exist
    //Create Event Tab is working
    //Form filled & submit, display success or no error
    //If required field is empty upon submit, error will be displayed

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

describe('Member.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(Member, {
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('has data', () => {
    expect(typeof Member.data).toBe('function')
  });

});  

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
