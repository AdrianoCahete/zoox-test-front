<template>
  <section
    :id="id"
    :class="'weatherCard ' + 'weatherStatus-' + weatherStatus.toLowerCase() + ($moment(date).format('HH') >= 18 ? ' timeNight ' : ($moment(date).format('HH') < 6 ? ' timeNight ': ' timeDay ')) + type"
  >
    <section class="time">
      <span v-if="type == 'isFuture'" :title="($moment(date).format('HH') >= 18 ? ' Noite ' : ($moment(date).format('HH') < 6 ? ' Noite ': ' Dia '))">
        {{ $moment(date).format('H') }}h
      </span>
      <span title="Dia do Mês">
        {{ $moment(date).format('DD') }}
      </span>
    </section>
    <section class="temp">
      <span>
        {{ Math.floor(temp) }}
      </span>
    </section>
    <section class="desc">
      <span class="weatherState">
        <Icon v-if="weatherStatus.toLowerCase() == 'clear'" :icon="($moment(date).format('HH') >= 18 ? 'clear-night' : ($moment(date).format('HH') < 6 ? 'clear-night': 'clear-day'))" />
        <Icon v-if="weatherStatus.toLowerCase() == 'clouds'" :icon="(clouds < 50 ? 'cloud' : 'clouds')" />
        <Icon v-if="weatherStatus.toLowerCase() == 'rain'" icon="rain-low" />
        {{ weatherDesc }}
      </span>
      <!-- <span v-if="clouds > 1" class="value">
        {{ clouds }}
      </span> -->
    </section>
    <section class="extraInfo">
      <section>
        <span class="title">
          Umidade
        </span>
        <span class="value valuePercent">
          {{ humidity }}
        </span>
        <!-- TODO: Move to custom component -->
        <!-- <span class="extraValue isProgress">
          <section class="input-progress" :style="'width:' + humidity + '%'" />
        </span> -->
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
        <!-- <span class="value willSpin" :style="'animation-duration:'+(windSpeed.toFixed(1) < 20 ? '4' : (windSpeed.toFixed(1) < 50 ? '.5' : '100'))+'s'">
          <Icon icon="windmotor_alt" />
        </span> -->
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
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon
  },

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
  cursor: default;

  &:hover {
    .willSpin {
      animation: spin 7s linear infinite;
    }
  }
}

.weatherState {
  display: flex;
  justify-items: center;

  > svg {
     margin-right: .8rem;
   }
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

  .extraValue {
    display: flex;
    justify-content: center;
    height: 2.4rem;

    &.isProgress {
      justify-content: flex-start;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .value {
    font-size: 1.6rem;
    font-weight: 500;

    > svg {
      margin-top: 2px;
    }

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
    display: inline-block;
    content: "°";
    width: 0;
  }
}

.desc {
  text-transform: capitalize;
  margin: 1.5rem 0;
  justify-content: center;
}

.isPast {
  background-color: var(--timeIsPast);

  .time {
    justify-content: flex-end;
  }
}

.weatherStatus {
  &-clear {

  }
}

// Time of the Day
.timeDay {
  background-color: var(--timeDay); // TODO: Move to vars
}

.timeNight {
  background-color: var(--timeNight);
  color: var(--textColorInverted);
  fill: var(--textColorInverted);
}
</style>
