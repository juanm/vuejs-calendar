import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
      currentYear: 2018,
      currentMonth: 5,
      eventFormPosX: 0,
      eventFormPosY: 0,
      eventFormActive: false,
      eventFormDate: null,
      events: [
                { description: 'event1', date: moment('2018-05-14', 'YYYY-MM-DD') },
                { description: 'event2', date: moment() },
                { description: 'event3', date: moment('2018-05-16', 'YYYY-MM-DD') }
              ]
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    },
    addEvent(state, payload) {
      state.events.push({
        description: payload,
        date: state.eventFormDate
      });
    }
  }
});
