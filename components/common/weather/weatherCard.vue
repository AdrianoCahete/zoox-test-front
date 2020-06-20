<template>
  <section :id="id" :class="'weatherCard ' + weatherDesc.toLowerCase() + ($moment(date).format('HH') >= 18 ? ' timeNight' : ' timeDay')">
    <section class="time">
      <span>{{ $moment(date).format('HH') }}h</span>
      <span>{{ $moment(date).format('DD MMMM') }}</span>
    </section>
    <section class="temp">
      <span>
        {{ Math.floor(temp) }}
      </span>
    </section>
    <section class="desc">
      <span>{{ weatherDesc }}</span>
      <span v-if="clouds < 1 ? '': 'isHidden'" class="value valuePercent">
        {{ clouds }}
      </span>
    </section>
    <section class="extraInfo">
      <section>
        <span class="title">
          Umidade
        </span>
        <span class="value valuePercent">
          {{ humidity }}
        </span>
        <span class="extraValue">
          <section :data-progress="humidity" /> <!-- TODO: Move to custom component -->
        </span>
      </section>
      <section>
        <span class="title">
          Pressão
        </span>
        <span class="value">
          {{ pressure }}
        </span>
        <span class="extraValue">
          bar <!-- TODO: Verirficar se é BAR mesmo -->
        </span>
      </section>
      <section>
        <span class="title">
          Vento
        </span>
        <span class="value">
          {{ windSpeed.toFixed(1) }}
        </span>
        <span class="extraValue">
          km/h
        </span>
      </section>
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
  background: #f2f2f2; // TODO: Move to vars
  padding: 1rem;
}

.time,
.desc,
.extraInfo {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.extraInfo {
  > section {
    display: flex;
    flex-direction: column;
    width: 33%;
  }

  .title,
  .extraValue {
    font-size: 1.4rem;
  }

  .value {
    font-size: 1.6rem;
    font-weight: 500;

    &.valuePercent {
      &::after {
        content: "%";
      }
    }
  }
}

.temp {
  font-size: 5rem;

  &::after {
    content: "°";
  }
}
</style>
