<script lang="ts">
  import Svg from '@/components/Svg.svelte'

  export let title: string = ''
  export let description: string = ''
  export let icon: string = ''
  export let image: string = ''
  export let href: string = ''
  export let horizontal: boolean = false
  export let reverse: boolean = false
  export let laia: boolean = false
  export let miquel: boolean = false

  const update = async (person: string) => {
    const response = await fetch(`${import.meta.env.PUBLIC_URL}/api/entertainment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person, title }),
    })

    const newValue = await response.json()

    person === 'laia' ? (laia = newValue) : (miquel = newValue)
  }
</script>

<style lang="scss">
  @import '../sass/mixins.scss';

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius);
    width: 100%;
    padding-bottom: 50px;
    background-color: var(--colorBase);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);

    &.reverse {
      flex-direction: column-reverse;
    }

    &.horizontal {
      &.reverse {
        flex-direction: row-reverse;

        @include notDesktop {
          flex-direction: column-reverse;
        }
      }

      @include desktop {
        flex-direction: row;

        img {
          max-width: 200px;
        }
      }
    }

    img {
      width: 100%;
      object-fit: cover;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;

      .title {
        font-size: 24px;
        color: var(--colorText);
      }
      .description {
        color: var(--colorText2);
      }
    }

    .eyes {
      display: flex;
      gap: 10px;
      position: absolute;
      right: 15px;
      bottom: 0px;
    }
  }
</style>

<div title={href ? title : null} class="card" class:horizontal class:reverse>
  {#if image}
    <a {href}>
      <img src={image} alt="card-image" loading="lazy" />
    </a>
  {/if}

  <div class="content">
    {#if icon}
      <Svg name={icon} />
    {/if}
    {#if title}
      <h3 class="title">{title}</h3>
    {/if}

    {#if description}
      <div class="description">
        {description}
      </div>
    {/if}

    <div class="eyes">
      <button on:click={() => update('laia')}>
        <Svg name="eye" width="30" height="30" fill={laia ? 'purple' : 'gray'} />
      </button>
      <button on:click={() => update('miquel')}>
        <Svg name="eye" width="30" height="30" fill={miquel ? 'green' : 'gray'} />
      </button>
    </div>
    <slot />
  </div>
</div>
