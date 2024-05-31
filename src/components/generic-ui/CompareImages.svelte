<script lang="ts">
  export let imageA: string = ''
  export let imageB: string = ''
</script>

<style lang="scss">
  .compare-images {
    height: 200px;
    width: 100%;

    img {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>

<div class="compare-images">
  <img src={imageA} alt="" />
  <img src={imageB} alt="" />
</div>
