<template>
  <div class="">
    <v-row justify="center">
     <v-dialog scrollable  v-model="value" persistent :max-width="width" >
        <v-card class="dialog__out">
          <div class="dialog__box">
            <slot>
              <!-- 主要內容會被放在這裡 -->
            </slot>
          </div>
          <v-card-actions>
            <slot name="btn">
              <v-row v-if="showBtn">
                <v-col cols="6">
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn block color="cancel" dark @click="confirm">關閉</v-btn>
                </v-col>
              </v-row>
            </slot>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-row>
  </div>
</template>

<script>
//  使用DialogBox components
// 必須傳遞 v-model(布林值), close（方法）, confirm （方法）
// 範例： <DialogBox v-model="value" @close="close" @confirm="confirm"></DialogBox>
// import DialogBox from '@/components/general/DialogBox'
export default {
  name: 'DialogBox',
  props: {
    value: {
      type: [Boolean],
      required: true
    },
    width: {
      type: [Number],
      default: 700
    },
    showBtn: {
      type: [Boolean],
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &__box {
    padding: 1rem;
    padding-bottom: 0;
  }
}
</style>
