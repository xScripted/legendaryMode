<script lang="ts">
  import { onMount } from 'svelte'
  import Svg from './Svg.svelte'

  const days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  let now
  let weekDay
  let hour: string = ''
  let min: string = ''
  let sec: string = ''

  const setTime = () => {
    now = new Date()

    weekDay = now.getDay() === 0 ? 6 : now.getDay() - 1
    hour = now.getHours() < 10 ? '0' + `${now.getHours()}` : `${now.getHours()}`
    min = now.getMinutes() < 10 ? '0' + `${now.getMinutes()}` : `${now.getMinutes()}`
    sec = now.getSeconds() < 10 ? '0' + `${now.getSeconds()}` : `${now.getSeconds()}`
  }

  setTime()

  let mode: string = 'clock'
  let intervalID
  let play: boolean = false

  const changeTimer = () => {
    mode = mode === 'timer' ? 'clock' : 'timer'

    hour = '00'
    min = '00'
    sec = '00'

    clearInterval(intervalID)

    if (mode === 'clock') {
      setTime()
      intervalID = setInterval(setTime, 1000)
    }
  }

  const hola = () => {
    sec = sec < '10' ? '0' + `${Number(sec) + 1}` : '00'
    min = `${Number(min) + 1}`
    hour = `${Number(hour) + 1}`
  }

  const changePomodoro = () => {
    mode = mode === 'pomodoro' ? 'clock' : 'pomodoro'

    if (mode === 'clock') {
      intervalID = setInterval(setTime, 1000)
    }
  }

  const changeCountdown = () => {
    mode = mode === 'countdown' ? 'clock' : 'countdown'

    if (mode === 'clock') {
      intervalID = setInterval(setTime, 1000)
    }
  }

  onMount(() => {
    intervalID = setInterval(setTime, 1000)
    setInterval(hola, 1000)
  })
</script>

<style lang="scss">
  @import '../sass/mixins.scss';

  .clock {
    position: relative;
    background-color: var(--colorBase);
    border-radius: var(--radius);
    width: 100%;
    max-width: 400px;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);

    .week {
      width: 100%;
      display: flex;
      justify-content: space-around;
      opacity: 0;

      &.active {
        opacity: 1;
      }

      .day {
        color: var(--colorText3);
        font-size: 13px;

        &.active {
          color: white;
        }
      }
    }

    .time {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;

      .hour {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 75px;
        width: 85px;

        .title {
          margin-top: -15px;
          color: var(--colorText3);
          font-size: 13px;
        }
      }

      .mid {
        font-size: 50px;
        color: var(--colorText3);
      }

      @include notDesktop {
        .hour {
          font-size: 50px;
        }

        .mid {
          font-size: 35px;
        }
      }
    }

    .utilities {
      margin-top: 25px;

      width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;

      .function {
        border: 1px solid var(--colorText3);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 100%;

        &:hover {
          border: 1px solid white;

          :global(svg) {
            fill: var(--colorText);
            stroke: var(--colorText);
          }
        }

        :global(svg) {
          fill: var(--colorText3);
          stroke: var(--colorText3);
        }

        &.selected {
          border: 1px solid white;

          :global(svg) {
            fill: var(--colorText);
            stroke: var(--colorText);
          }
        }
      }
    }

    .actions {
      position: absolute;
      display: none;
      gap: 10px;

      bottom: 20px;
      right: 25px;

      &.showed {
        display: flex;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          :global(svg) {
            fill: var(--colorText);
          }
        }
      }
    }
  }
</style>

<div class="clock-container">
  <div class="clock">
    <div class="week" class:active={mode === 'clock'}>
      {#each days as day, i}
        <div class="day" class:active={weekDay === i}>{day}</div>
      {/each}
    </div>
    <div class="time">
      <div class="hour">{hour}<span class="title">HOURS</span></div>
      <div class="mid">:</div>
      <div class="hour">{min}<span class="title">MINUTES</span></div>
      <div class="mid">:</div>
      <div class="hour">{sec}<span class="title">SECONDS</span></div>
    </div>

    <div class="utilities">
      <button class="function" class:selected={mode === 'timer'} on:click={changeTimer}>
        <Svg name="timer" width="20" height="20" />
      </button>
      <button class="function" class:selected={mode === 'pomodoro'} on:click={changePomodoro}>
        <Svg name="pomodoro" width="20" height="20" />
      </button>
      <button class="function" class:selected={mode === 'countdown'} on:click={changeCountdown}>
        <Svg name="hourglass" width="20" height="20" />
      </button>
    </div>

    <div class="actions" class:showed={mode != 'clock'}>
      <button on:click={() => (play = !play)}>
        {#if !play}
          <Svg name="play" width="13" height="13" fill="var(--colorText3)" />
        {:else}
          <Svg name="pause" width="13" height="13" fill="var(--colorText3)" />
        {/if}
      </button>
      <button>
        <Svg name="reset" width="15" height="15" fill="var(--colorText3)" />
      </button>
    </div>
  </div>
</div>
