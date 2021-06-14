<template>
  <div class="">
    <DialogBox v-model="value" @close="close" @confirm="close">
      {{item}}
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

</style>
