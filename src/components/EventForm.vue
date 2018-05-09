<template>
  <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
    <h4>Add Event</h4>
    <div class="text">
        <input v-focus type="text" v-model="description" placeholder="Dinner Plans?" @keyup.enter="create">
      <div class="buttons">
        <button @click="create">Create</button>
      </div>
    </div>
    <button id="close-button" @click="close">&#10005</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        description: ''
      }
    },
    computed: {
      top() {
        return `${this.$store.state.eventFormPosY}px`;
      },
      left() {
        return `${this.$store.state.eventFormPosX}px`;
      },
      active() {
        return this.$store.state.eventFormActive;
      }
    },
    directives: {
      focus: {
        update(el) { //This is fired everytime form opens.
          el.focus();
        }
      }
    },
    methods: {
      close() {
        this.$store.commit('eventFormActive', false);
      },
      create() {
        if (this.description.length > 0) {
          this.$store.commit('addEvent', this.description);
          this.description = '';
          this.$store.commit('eventFormActive', false);
        }
      }
    }
  }
</script>
