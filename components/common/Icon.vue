<template>
  <svg class="">
    <use :xlink:href="'#'+ icon" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  svg {
    width: 2rem;
    height: 2rem;
    fill: inherit;

    &:hover {
      fill: inherit;
    }
  }
</style>
