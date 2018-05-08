<template>
  <div>
    <div id="header">
      <div>
        <h1> My Calendar</h1>
      </div>
      <div>
        <current-month></current-month>
      </div>
    </div>
    <div id="day-bar">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>
    <div id="calendar">
      <div v-for="week in weeks" class="calendar-week">
        <calendar-day v-for="day in week" :day="day"></calendar-day>
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarDay from './CalendarDay.vue';
  import CurrentMonth from './CurrentMonth.vue';

  export default {

    computed: {
      month () {
        return this.$store.state.currentMonth;
      },
      year () {
        return this.$store.state.currentYear;
      },
      days() {
        // Generating all days in currentmonth
        let days = [];
        let currentDay = this.$moment(`${this.year}-${this.month}-1`,'YYYY-M-D');
        do {
          days.push(currentDay);
          currentDay = this.$moment(currentDay).add(1, 'days');
        } while((currentDay.month() + 1) === this.month);

        /* We'd like to have a calendar showing days from Monday - Sunday each row
          Add 'padding' for days that are part of the month before/after
        */

        const SUNDAY = 0;
        const MONDAY = 1;

        // Add 'padding days' at the start
        currentDay = this.$moment(days[0]);
        if (currentDay.day() !== MONDAY) {
          do {
            currentDay = this.$moment(currentDay).subtract(1, 'days');
            days.unshift(currentDay); //push to start of array
          } while(currentDay.day() !== 1);
        }
        // Add 'padding days' at the end of the month
        currentDay = this.$moment(days[days.length-1]);
        if (currentDay.day() !== SUNDAY) {
          do {
            currentDay = this.$moment(currentDay).add(1, 'days');
            days.push(currentDay);
          } while(currentDay.day() !== 0);
        }
        return days;
      },

      weeks () {
        let weeks = [];
        let week = [];
        for (let day of this.days) {
          week.push(day);
          if (week.length === 7) {
            weeks.push(week);
            week = [];
          }
        }
        return weeks;
      }
    },
    created() {
      console.log(this.$moment);
    },
    components: {
      CalendarDay,
      CurrentMonth
    }
}
</script>
