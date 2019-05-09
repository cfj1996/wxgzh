<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .schedule {
    .view {
      .body {
        padding: 15px 10px;
        ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li {
            flex: 0 0 33.333%;
            display: flex;
            justify-content: center;
            height: 150px;
            padding: 15px 5px;
            .content{
              background-color: white;
              width: 100%;
              height: 100%;
              padding: 15px 0;
              .img-ku {
                width: 50px;
                height: 50px;
                margin: auto;
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                }
              }
              p{
                text-align: center;
                margin-top: 20px;
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="page schedule">
    <div class="view">
      <div class="body">
        <ul>
          <li v-for="val in pageData.bankList" @click="$router.push('/schedule_form')">
            <div class="content">
              <div class="img-ku">
                <img :src="val.logo" alt="">
              </div>
              <p class="name">{{ val.bankName }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'

  export default {
    name: 'index',
    data() {
      return {
        pageData: {
          bankList: []
        }
      }
    },
    created() {
      userAPI.schedule(res => {
        this.pageData.bankList = res.data
      })
    }
  }
</script>
