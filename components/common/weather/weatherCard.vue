<template>
  <section :id="id" :class="'weatherCard ' + 'weatherStatus-' + weatherStatus.toLowerCase() + ($moment(date).format('HH') >= 18 ? ' timeNight ' : ($moment(date).format('HH') < 6 ? ' timeNight ': ' timeDay ')) + type">
    <section class="time">
      <span v-if="type == 'isFuture'">
        {{ $moment(date).format('HH') }}h
      </span>
      <span>
        {{ $moment(date).format('DD MMMM') }}
      </span>
    </section>
    <section class="temp">
      <span>
        {{ Math.floor(temp) }}
      </span>
    </section>
    <section class="desc">
      <span>{{ weatherDesc }}</span>
      <span v-if="clouds > 1" class="value valuePercent">
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
          <section class="input-progress" :data-progress="humidity" /> <!-- TODO: Move to custom component -->
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
          bar
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
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'isFuture'
    },
    date: {
      type: [Date, String, Number],
      required: true,
      default: null
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
    weatherStatus: {
      type: String,
      default: ''
    },
    weatherDesc: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.weatherCard {
  padding: 1rem;
  border-radius: 4px;
}

.weatherStatus {
  &-clear {

  }
}

// Time of the Day
.timeDay {
  background-color: #f2f2f2; // TODO: Move to vars
}

.timeNight {
  background-color: #1c2632;  // TODO: Move to vars
  color: #ffffff;
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
        font-weight: normal;
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

.desc {
  text-transform: capitalize;
  margin: 1rem 0;
}

.isPast {
  .time {
    justify-content: flex-end;
  }
}
</style>
