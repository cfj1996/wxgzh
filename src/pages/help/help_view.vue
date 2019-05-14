<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";
</style>
<template>
  <div class="page help-view">
    <iframe id="guideFrame" frameborder=0 name="guideFrame" scrolling=auto width="100%" height="100%"
            :src="$route.params.path"></iframe>
  </div>
</template>

