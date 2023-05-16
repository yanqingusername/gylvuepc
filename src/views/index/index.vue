<template>
  <div class="people-index-container">
    <div class="people-container-right people-pulic_box_shadow">
      <el-form :inline="true" class="people-demo-form-inline">
        <el-form-item label="姓名" prop="search_name">
          <el-input v-model="search_name" placeholder="请输入姓名" clearable />
        </el-form-item>

        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getEmployeesLists()">查询</el-button>

        <el-button
          type="primary"
          size="medium"
          @click="exportData()"
          style="margin-left: 20px"
          icon="el-icon-folder">导出</el-button>
      </el-form>

      <el-table :data="list" stripe style="width: 1120px" border
        :row-style="iRowStyle"
        :cell-style="iCellStyle"
        :header-row-style="iHeaderRowStyle"
        :header-cell-style="iHeaderCellStyle" >
        <el-table-column
          prop="head_url"
          width="120"
          label="头像"
          align="center">
          <template slot-scope="scope">
            <div class="people-img">
              <!-- <el-avatar shape="square" :size="50" fit="scale-down" :src="scope.row.head_url"></el-avatar> -->
              <!-- <img :src="scope.row.head_url" style="width:30px;height:30px;border-radius: 100%;"></img> -->
              <el-image
                style="width:30px;height:30px;border-radius: 100%;"
                :src="scope.row.head_url"
                :preview-src-list="srcList"
                fit="cover"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_name"
          width="140"
          label="姓名"
          align="center"
        />

        <el-table-column
          prop="job_number"
          width="200"
          label="工号/卡号"
          align="center"
        />
        <el-table-column
          prop="role_name"
          width="160"
          label="岗位"
          align="center"
        />
        <el-table-column
          prop="phone"
          width="200"
          label="手机号"
          align="center"
        />

        <el-table-column prop="gender" width="100" label="性别" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.gender == '0'">男</p>
            <p v-if="scope.row.gender == '1'">女</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          
        </el-table-column>
      </el-table>

      <div class="people-block" style="margin-top: 0px">
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, sizes, prev, pager, next"
          @current-change="getEmployeesLists"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>

    <div class="dis-echarts_view">
        <div class="dis-echarts_view_top">
          <div class="dis-echarts_view_l">
            <div class="dis-echarts_view_title">员⼯淋浴监控⽉统计表</div>
            <el-form :inline="true" class="ozone-demo-form-inline">
                <el-form-item label="时间范围">
                  <el-date-picker
                    v-model="currentMonth"
                    align="right"
                    type="month"
                    placeholder="选择月份"
                    :clearable="false">
                  </el-date-picker>
                </el-form-item>

                <el-button
                  style="margin-left: 20px"
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getIwadomChart()">查询</el-button>
              </el-form>
            <div
              id="echarttemp"
              style="width: 1390px; height: 400px"
              ref="echarttemp"
            ></div>
          </div>
          <div class="dis-echarts_view_r">
          </div>
        </div>
        <div class="dis-echarts_view_center"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import {
  getEmployeesLists,
  getRoleinfo,
  deleteEmployee,
  adduserinfo,
  getuserinfo,
  edituserinfo,
  getIwadomChart
} from "../../request/api";
import { Message } from "element-ui";
import { stringify } from "qs";

export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      search_name: "",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      list: [],
      srcList: [],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      currentMonth: new Date().getTime(),
      
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.getEmployeesLists();
      this.getIwadomChart();
    });
    
  },
  methods: {
    iRowStyle: function ({ row, rowIndex }) {
      return "height:35px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:46px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    iHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    dateFormatMonth: function (date) {
      // var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM");
    },
    //日期格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    getEmployeesLists(page = 1) {
      this.current = page;

      getEmployeesLists({
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        real_name: this.search_name,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.list = res.data.info;
          this.total = parseInt(res.data.count);
          this.list.forEach(element => {
            this.srcList.push(element.head_url)
          });
        } else {
          Message({
            type: "warning",
            message: res.data.msg,
            showClose: true,
            duration: 3000,
          });
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getEmployeesLists();
    },
    //导出数据
    exportData() {
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        real_name: this.search_name,
      };
      window.open(
        `https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/PCpersonnelManagement/ExportEmployeesLists.hn?${stringify(
          params
        )}`
      );
    },
    getIwadomChart() {
      getIwadomChart({
        pig_farm_id: this.userInfo.farm_id,
         month: this.dateFormatMonth(this.currentMonth)
      }).then((res) => {
        if (res.data.success) {
          let xdata = res.data.xdata;
          let ysuccess = res.data.ysuccess;
          let yfail = res.data.yfail;
          let series = [
            {
              name: "成功",
              type: "bar",
              color: '#5470c6',
              data: ysuccess,
              barWidth: 12
            },
            {
              name: "失败",
              type: "bar",
              color: '#91cc75',
              data: yfail,
              barWidth: 12
            }
          ];
          this.initChart(xdata,series);
        } else {
          Message({
            type: "warning",
            message: res.data.msg,
            showClose: true,
            duration: 3000,
          });
        }
      });
    },
    initChart(xdata, series) {
      // 绘制图表

      this.myChartTemp.setOption({
      //   dataZoom: [{
      //   type: 'inside', //1平移 缩放
      //   throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
      //   minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
      //   start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
      //   end: 50, //数据窗口范围的结束百分比。范围是：0 ~ 100。
      //   zoomLock: true, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
      // }],
        title: {
          // text: "成功/失败",
          // fontSize: 12
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: false }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          name: "天",
          data: xdata,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 40
          },
        },
        yAxis: {
          name: "数量(次)",
          min: 0,
          minInterval: 1,
        },
        series: series,
      });
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.people-index-container {
  display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
}

.people-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.people-container-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 0px 20px; */
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.people-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.people-demo-form-inline {
  margin-top: 20px;
}

.people-flex-space {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.people-avatar{
  width: 178px;
  height: 178px;
  display: block;
}

.people-from-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.people-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}

.dis-echarts_view {
  margin-top: 30px;
}

.dis-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
}

.dis-echarts_view_l {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dis-echarts_view_title {
  font-size: 24px;
  padding: 10px 0px;
}

.dis-echarts_view_center {
}
</style>