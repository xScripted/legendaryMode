<script lang="ts">
  import { onMount } from 'svelte'

  const days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  let now
  let weekDay
  let hour: string = ''
  let min: string = ''
  let sec: string = ''

  const time = () => {
    now = new Date()

    weekDay = now.getDay() === 0 ? 6 : now.getDay() - 1
    hour = now.getHours() < 10 ? '0' + `${now.getHours()}` : `${now.getHours()}`
    min = now.getMinutes() < 10 ? '0' + `${now.getMinutes()}` : `${now.getMinutes()}`
    sec = now.getSeconds() < 10 ? '0' + `${now.getSeconds()}` : `${now.getSeconds()}`
  }

  time()

  onMount(() => {
    setInterval(time, 1000)
  })
</script>

<style lang="scss">
  @import '../sass/mixins.scss';
  .clock {
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
  }
</style>

<div class="clock-container">
  <div class="clock">
    <div class="week">
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
  </div>

  <div class="utilities"></div>
</div>
