<script lang="ts">
  export let tasks

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let now = new Date()
  let day = now.getDate()
  let month = months[now.getMonth()]
  let year = now.getFullYear()

  let date = day + ' ' + month + ' ' + year

  console.log(day, month, year)
</script>

<style lang="scss">
  .task-container {
    height: fit-content;
    width: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    background-color: var(--colorBase);
    border-radius: var(--radius);
    padding: 20px 25px;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tasks {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .task {
        display: flex;
        align-items: center;
        gap: 10px;

        .checkbox {
          height: 15px;
          width: 15px;
          border: 1px solid var(--colorText);
          border-radius: 3px;
        }

        &.active {
          .checkbox {
            border: 2px solid var(--colorText3);
            background-color: var(--colorText3);
          }

          .title {
            color: var(--colorText3);
            text-decoration: line-through;
          }
        }
      }
    }
  }
</style>

<div class="task-container">
  <div class="header">
    <div class="date">
      <div class="arrow"></div>
      <div class="current-date">{date}</div>
      <div class="arrow"></div>
    </div>

    <div class="owner">Miquel</div>
  </div>

  <div class="tasks">
    {#each tasks as task}
      <div class="task" class:active={task.done}>
        <button class="checkbox" />
        <div class="title">{task.title}</div>
      </div>
    {/each}
  </div>
</div>
