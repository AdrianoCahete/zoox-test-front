<template>
  <section :class="'alert alert-'+ status.toLowerCase()">
    <span>
      {{ message }}
    </span>
    <section class="dismiss">
      x <!-- TODO: Move to svg icon -->
    </section>
  </section>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
      default: 'info'
    },
    message: {
      type: String,
      required: true,
      default: 'Message'
    }
  }
}
</script>

<style lang="scss" scoped>
  .alert {
    display: flex;
    justify-content: center;
    position: fixed;
    align-items: center;
    width: auto;
    max-width: 80%;
    top: 7rem; // TODO: Get Navbar height
    height: 5rem;
    z-index: 99999;
    color: var(--textColorInverted);
    margin-left: auto;
    margin-right: auto;
    padding: 1rem 0 1rem 1rem;
    transition: ease-in-out 1s all;

    $status: info success warning error;
    @each $s in $status {
      &.alert-#{$s} {
        background-color: var(--#{$s}Color);
      }
    }

    .dismiss {
      height: 5rem;
      width: 5rem;
      padding: 1.2rem 2rem;
      margin-left: 1rem;
      background-color: rgba(0, 0, 0, 0.3);
      transition: ease-in-out .5s background-color;

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        transition: ease-in-out .5s background-color;
      }
    }
  }
</style>
