<script lang="ts">
  import { onMount } from 'svelte'
  import Svg from '@/components/Svg.svelte'

  export let itemWidth: number = 350
  export let gap: string = '0'

  let HTMLslides: HTMLElement
  let index: number = 0

  let disableNext: boolean = false
  let disablePrev: boolean = true
  let onMounted: boolean = false

  $: if (HTMLslides) HTMLslides.style.transform = `translateX(${itemWidth * index}px)`

  const disableBtns = () => {
    setTimeout(() => {
      disableNext = window.innerWidth > HTMLslides.getBoundingClientRect().right
    }, 300)

    disablePrev = index === 0
  }

  const previous = () => {
    if (index < 0) index++
    disableBtns()
  }

  const next = () => {
    if (0 > window.innerWidth - HTMLslides.getBoundingClientRect().right) index--
    disableBtns()
  }

  onMount(() => {
    const nItems: number =
      HTMLslides.children[0].nodeName === 'ASTRO-SLOT' ? HTMLslides.children[0].children.length : HTMLslides.children.length

    HTMLslides.style.width = `${nItems * itemWidth}px`

    onMounted = true
  })
</script>

<style lang="scss">
  @import '../sass/mixins.scss';

  .container-slider {
    padding: 20px 0;

    .slider-x {
      height: fit-content;
      overflow-x: auto;
      opacity: 0;

      &.onMounted {
        transition: 0.3s ease;
        opacity: 1;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      .arrows {
        display: flex;
        gap: 10px;

        .arrow {
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 5px;

          display: flex;
          justify-content: center;
          align-items: center;

          border: 1px solid transparent;
          border-radius: 100%;
          transition: 0.3s ease;

          :global(svg) {
            transform: translateX(1px);
          }

          &.disabled {
            opacity: 0.2;
          }

          &.left {
            :global(svg) {
              transform: rotate(180deg);
            }
          }

          &:hover {
            transition: 0.3s ease;
            border: 1px solid var(--colorBorder);
          }
        }
      }

      .slides {
        display: flex;
        transition: 0.3s ease-in-out;
        padding: 10px 0;
      }
    }

    .arrows {
      display: flex;
      gap: 20px;
      padding: 20px;

      .arrow {
        width: 100px;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
        transition: 0.3s ease;
        background-color: var(--colorBase);
        box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);

        :global(svg) {
          transform: translateX(1px);
        }

        &.disabled {
          opacity: 0.2;
        }

        &.left {
          transform: rotate(180deg);
        }

        &:hover:not(.disabled) {
          transition: 0.3s ease;
          background-color: var(--colorBrandSoft);
        }
      }
    }
  }
</style>

<div class="container-slider">
  <div class="slider-x" class:onMounted>
    <div class="g-wrapper">
      <div class="slides" bind:this={HTMLslides} style:gap={gap + 'px'}>
        <slot />
      </div>
    </div>
  </div>

  <div class="arrows g-wrapper">
    <button class="arrow left" class:disabled={disablePrev} on:click={previous}>
      <Svg name="arrowSlim" width="35" height="35" fill="var(--colorBrand)" />
    </button>

    <button class="arrow right" class:disabled={disableNext} on:click={next}>
      <Svg name="arrowSlim" width="35" height="35" fill="var(--colorBrand)" />
    </button>
  </div>
</div>
