<script lang="ts">
  import Svg from '@/components/Svg.svelte'
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

  let name: string = 'Laia'
  let ownerTasks = tasks.filter((task) => task.name === name)

  const ownerChange = () => {
    name = name === 'Miquel' ? 'Laia' : 'Miquel'
    let owner = tasks.filter((task) => task.name === name)

    ownerTasks = owner
  }

  const addDays = (date, days) => {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const dateChange = (direction: 'future' | 'past') => {
    console.log(tasks)

    // 1 - Convertir date a un objeto date: new Date(date)
    // Add / remove day using addDays (He buscado en google: sum day to date javascript y he llegado hasta aqui: https://stackoverflow.com/questions/563406/how-to-add-days-to-date)
  }

  // Mostrar solo las tareas de este dia en concreto (parecido a lo del owner)
</script>

<style lang="scss">
  .task-container {
    height: fit-content;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    background-color: var(--colorBase);
    border-radius: var(--radius);
    padding: 20px 25px;

    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);

    .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .date {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .arrow {
          height: 30px;
          width: 30px;
          border: 1px solid var(--colorBase);
          border-radius: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s ease;

          &:hover {
            transition: 0.3s ease;
            border: 1px solid var(--colorText3);
          }
        }
      }

      .owner {
        color: var(--colorText2);
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 2px 15px;
        border-radius: 5px;
        border: 1px solid var(--colorBase);
        transition: 0.3s ease;

        &:hover {
          transition: 0.3s ease;
          border: 1px solid var(--colorText3);
        }
      }
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
      <button on:click={() => dateChange('past')} class="arrow" style="transform: rotate(90deg);">
        <Svg name="arrow" fill="var(--colorText2)" height="20" width="20" />
      </button>
      <div class="current-date">{date}</div>
      <button on:click={() => dateChange('future')} class="arrow" style="transform: rotate(-90deg);">
        <Svg name="arrow" fill="var(--colorText2)" height="20" width="20" />
      </button>
    </div>

    <button class="owner" on:click={ownerChange}>{name}</button>
  </div>

  <div class="tasks">
    {#each ownerTasks as task}
      <div class="task" class:active={task.done}>
        <button class="checkbox" />
        <div class="title">{task.title}</div>
      </div>
    {/each}
  </div>
</div>
