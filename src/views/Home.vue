<template>
   <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col> -->
      <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="關鍵字查詢"
            single-line
            hide-details
          ></v-text-field> 
          <v-spacer></v-spacer>
          <v-btn color="success" dark ><v-icon>mdi-refresh</v-icon></v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        >
          <template v-slot:[`item.flag`]="{ item }">
          <div class="flag__box">
            <img :src="item.flag" class="flag__img" alt="">
          </div>
          </template>
          <template v-slot:[`item.detail`]="{ item }">
            <v-icon  small @click="openDialog(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      </v-col>
    </v-row>
    <Dialog v-if="dialog" v-model="dialog" :item="item"></Dialog>
  </v-container>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Home',
  components: {
    Dialog
  },
  data() {
    return {
      value: '',
      search: '',
      dialog: false,
      item: {},
      headers: [
        { text: '國旗', value: 'flag', sortable: false },
        { text: '國家名稱', value: 'name'},
        { text: '2位國家代碼', value: 'alpha2Code', sortable: false },
        { text: '3位國家代碼', value: 'alpha3Code', sortable: false },
        { text: '母語名稱', value: 'nativeName' },
        { text: '替代國家名稱', value: 'altSpellings', sortable: false },
        { text: '國際電話區號', value: 'callingCodes' },
        { text: '詳細資訊', value: 'detail', sortable: false }
      ],
      desserts: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList () {
      $api.testGet('v2/all').then(resp => {
        const { data } = resp
        console.log('data', data[0])
        this.desserts = (data)? data : []
      })
    },
    openDialog (item) {
      console.log('open dialog');
      this.item = item
      this.dialog = true
    }
  },
}
</script>

<style lang="scss" scoped>
.flag {
  &__box {
    text-align: center;
  }
  &__img {
    height: 2rem;
    object-fit: contain;
  }
}
</style>
