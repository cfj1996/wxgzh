/*
* @class   级联城市选择
* @author  Dennis Lei
* @date    18.05.03
*/
<style scoped>

</style>
<template>
  <!-- 级联国家地区-->
  <vue-city-picker v-if="show" ref="picker" :style="{zIndex: zIndex}" :data="cityPickerData" :title="title" :cancel-txt="cancelTxt"
                   :confirm-txt="confirmTxt"
                   :selected-index="selectedIndex" @select="onOk">
  </vue-city-picker>
</template>

<script>
  import VueCityPicker from 'vue-city-bspicker'
  import city from '@/common/city.json'
  export default {
    name: 'CityPicker',
    components: {
      VueCityPicker
    },
    props: {
      title: {
        type: String,
        default: '选择城市'
      },
      zIndex: {
        type: Number,
        default: 100
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      selectedIndex: {
        type: Array,
        default: () => {
          return [0, 0, 0]
        }
      },
      onOk: {
        type: Function,
        default: () => { }
      }
    },
    data() {
      return {
        provinces: [],
        cities: [],
        counties: [],
        cityPickerData: [[], [], []]
      }
    },
    methods: {
      show() {
        this.$refs.picker.show()
      },
      formatData(data, parentId, arr) {
        if (data && data.length) {
          data.forEach((item, i) => {
            item.value = item.areaId
            item.text = item.areaName
            item.parentId = parentId || -1
            delete item.areaId
            delete item.areaName

            arr.push(item)

            if (item.cities) {
              this.formatData(item.cities, item.value, this.cities)
              delete item.cities
            } else if (item.counties) {
              this.formatData(item.counties, item.value, this.counties)
              delete item.counties
            }
          })
        }
      }
    },
    created() {
      let newCity = this.public.copy(city)
      this.formatData(newCity, -1, this.provinces)
      this.cityPickerData = [this.provinces, this.cities, this.counties]
    },
    mounted() {

    }
  }
</script>
