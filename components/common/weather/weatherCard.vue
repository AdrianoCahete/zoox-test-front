<template>
  <section :id="id" :class="'weatherCard ' + weatherDesc + ($moment(date).format('HH') >= 18 ? ' timeNight' : ' timeDay')">
    <section>
      <span>{{ $moment(date).format('HH') }}h - {{ $moment(date).format('DD MMMM') }}</span>
    </section>
    <section class="temp">
      <p>{{ temp }}</p>
    </section>
    <section class="desc">
      <p>clima: {{ weatherDesc }}</p>
      <p>nuvens: {{ clouds }}</p>
    </section>
    <section>
      <p>umidade: {{ humidity }}</p>
      <p>pressao: {{ pressure }}</p>
      <p>vento: {{ windSpeed }} @ {{ windDeg }}º</p>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: ''
    },
    temp: {
      type: Number,
      required: true,
      default: 0
    },
    humidity: {
      type: Number,
      default: 0
    },
    pressure: {
      type: Number,
      default: 0
    },
    clouds: {
      type: Number,
      default: 0
    },
    windSpeed: {
      type: Number,
      default: 0
    },
    windDeg: {
      type: Number,
      default: 0
    },
    weatherDesc: {
      type: String,
      default: ''
    }
  }

  // methods: {
  //   // Get time of the day and convert to human readable format
  //   // eslint-disable-next-line require-await
  //   async convertToHumanTime ({ time }) {
  //     const srcTime = time

  //     // eslint-disable-next-line no-console
  //     console.log(srcTime)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.weatherCard {
  background: #f2f2f2; // TOdo: Move to vars
  padding: 1rem;
}
// .isOffline {
// }
</style>
