<template>
   <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      <br>
      <v-card>
        
        <v-card-title>
          <v-row >
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                label="國名查詢"
                single-line
                hide-details
                @blur="checkList"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn class="btn__style" @click="checkList">查詢</v-btn>
              <v-btn class="btn__style" @click=" desserts = initDesserts">正序</v-btn>
              <v-btn class="btn__style" @click="desserts = reverseDesserts">倒序</v-btn>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
           <!-- <v-btn color="success" dark ><v-icon>mdi-refresh</v-icon></v-btn> -->
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          hide-default-footer
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
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
        <br>
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
      itemsPerPage: 25,
      page: 1,
      pageCount: 0,
      value: '',
      search: '',
      dialog: false,
      item: {},
      headers: [
        { text: '國旗', value: 'flag', sortable: false},
        { text: '國家名稱', value: 'name', sortable: false },
        { text: '2位國家代碼', value: 'alpha2Code', sortable: false},
        { text: '3位國家代碼', value: 'alpha3Code', sortable: false},
        { text: '母語名稱', value: 'nativeName', sortable: false},
        { text: '替代國家名稱', value: 'altSpellings', sortable: false},
        { text: '國際電話區號', value: 'callingCodes', sortable: false},
        { text: '詳細資訊', value: 'detail', sortable: false }
      ],
      initDesserts: [],
      reverseDesserts: [],
      desserts: []
    }
  },
  created() {
    this.checkList()
  },
  methods: {
    checkList () {
      if (!this.search) {
        this.getList()
      } else {
        this.getNameList()
      }
    },
    getList () {
      $api.testGet('v2/all').then(resp => {
        const { data } = resp
        this.getDesserts(data)
      })
    },
    getNameList () {
      $api.testGet(`v2/name/${this.search}`).then(resp => {
        if (resp) {
          const { data } = resp
          this.getDesserts(data)
        } else {
          this.desserts = []
        }
      })
    },
    getDesserts (data) {
      if (data) {
        this.desserts = JSON.parse(JSON.stringify(data))
        this.initDesserts = JSON.parse(JSON.stringify(data))
        this.reverseDesserts = data.reverse();
        this.page = 1
      } else {
        this.desserts = []
        this.initDesserts = []
        this.reverseDesserts = []
        this.page = 1
      }
    },
    openDialog (item) {
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
.btn__style {
  margin: 0 0.5rem;
  background-color: blue;
}
</style>
