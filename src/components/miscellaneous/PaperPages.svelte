<script lang="ts">
  import { onMount } from 'svelte'

  let HTMLPaperPages: HTMLElement

  onMount(() => {
    document.addEventListener('scroll', () => {
      const items = HTMLPaperPages.children[0].nodeName === 'ASTRO-SLOT' ? HTMLPaperPages.children[0].children : HTMLPaperPages.children

      for (let item of items) {
        const page = item as HTMLElement

        if (page.getBoundingClientRect().top <= 150) {
          page.classList.add('dropped')
        } else {
          page.classList.remove('dropped')
        }
      }
    })
  })
</script>

<style lang="scss">
  .paper-pages {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 300px;
    height: fit-content;
    margin-bottom: 200px;

    :global(.page-wrapper) {
      transition: 0.5s ease;
      position: sticky;
      top: calc(50px + var(--menuHeight) * var(--y));
      margin-left: calc(50px * var(--x));
      transform: rotateZ(var(--z)) translateY(20px) scale(1);
      border: 1px solid var(--colorBorder);
      background-color: var(--colorBase);
      box-shadow: 20px 20px 20px 0 rgba(19, 19, 19, 0.1);
      padding: 70px;
      width: 100%;
      height: 80vh;
      left: 0;
    }

    :global(.page-wrapper.dropped) {
      transform: rotateZ(var(--z)) translateY(-10px) scale(0.9);
      box-shadow: 0px 0px 0px 0px rgba(19, 19, 19, 0.1);
    }
  }
</style>

<div class="paper-pages g-wrapper" bind:this={HTMLPaperPages}>
  <slot />
</div>
