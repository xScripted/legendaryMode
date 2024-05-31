<script lang="ts">
  import Button from './Button.svelte'

  let open: boolean = false
</script>

<style lang="scss">
  .btn-main {
    height: fit-content;
    width: fit-content;
    padding: 6px 15px;
    border-radius: 5px;
    transition: 0.3s ease;

    background-color: var(--colorBrand);
    border: 1px solid var(--colorBrand);

    color: var(--colorBase);

    &:hover {
      transition: 0.3s ease;
      background-color: var(--colorBase);

      color: var(--colorBrand);
    }
  }
</style>

<div class="dropdown">
  <button class="btn-main" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Click me</button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"></div>
</div>
