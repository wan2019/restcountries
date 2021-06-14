<template>
  <div class="">
    <DialogBox v-model="value" @close="close" @confirm="close">
      <div class="box">
        <img :src="item.flag" class="flag__img" alt="">
        <p>國家: {{item.name}}</p>
        <p>頂級網域: {{item.topLevelDomain}}</p>
        <p>2位國家代碼: {{item.alpha2Code}}</p>
        <p>3位國家代碼: {{item.alpha3Code}}</p>
        <p>母語名稱: {{item.nativeName}}</p>
        <p>替代國家名稱: {{item.altSpellings}}</p>
        <p>國際電話區號: {{item.callingCodes}}</p>
        <p>頂級網域: {{item.topLevelDomain}}</p>
        <p>首都: {{item.capital}}</p>
        <p>地區: {{item.region}}</p>
        <p>次區域: {{item.subregion}}</p>
        <p>人口: {{item.population}}</p>
      </div>
    </DialogBox>
  </div>
</template>

<script>
import DialogBox from '@/components/general/DialogBox'

export default {
  name: '',
  components: {
    DialogBox
  },
  props: {
    value: {
      type: [Boolean],
      require: true
    },
    item: {
      type: [Object],
      require: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    close () {
      this.$emit('input', false)
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
}
.flag__img {
  position: absolute;
  top: 0;
  right: 0;
  height: 6rem;
  object-fit: contain;
}
</style>
