/* eslint-disable consistent-return */
import PropTypes, { func } from 'prop-types'
import React, { Component, useRef } from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import ReactEcharts from 'echarts-for-react'

const QueryCharts = (props) => {
  const { queryTemplate, chartsData, threshold, showTableData } = props
  const option = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let formatterTips = params[0].name
        params.forEach((d) => {
          if (
            (d.seriesName === 'Leakage Rate' ||
              d.seriesName === 'Detection Rate') &&
            d.value !== 'NaN' &&
            d.value !== 'N/A'
          ) {
            formatterTips += `<br/>${d.marker}${d.seriesName} ${d.value}%`
          } else if (typeof d.value === 'number') {
            formatterTips += `<br/>${d.marker}${d.seriesName} ${d.value}`
          }
        })
        return formatterTips
      },
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: false,
    },
    yAxis: [
      {
        id: 'val',
        type: 'value',
        position: 'left',
      },
      {
        id: 'rate',
        type: 'value',
        name:
          queryTemplate === 'LEAKAGE' ? 'Leakage Rate(%)' : 'Detection Rate(%)',
        position: 'right',
        splitLine: {
          show: false,
        },
        // max: function (value) {
        //     return parseInt(value.max + 1) > 2 ? parseInt(value.max + 1) : 2;
        // },
      },
    ],
    xAxis: {
      type: 'category',
      data: chartsData.categoryData,
    },
    legend: {
      data: [
        'Total',
        queryTemplate === 'LEAKAGE' ? 'Leakage' : 'Detection',
        queryTemplate === 'LEAKAGE' ? 'Leakage Rate' : 'Detection Rate',
      ],
      selected: {},
    },
    series: [
      {
        name: 'Total',
        type: 'bar',

        yAxisIndex: 0,
        barMaxWidth: 20,
        label: {
          show: true,
          position: 'top',
          offset: [0, 0],
          //formatter: '{c}',
          formatter: (params) => {
            if (params.value === null) {
              return ''
            }
          },
        },
        itemStyle: {
          normal: {
            color: '#66BB6A',
          },
          emphasis: {
            color: '#66BB6A',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        data: chartsData.detectionTotalData,
      },
      {
        name: queryTemplate === 'LEAKAGE' ? 'Leakage' : 'Detection',
        type: 'bar',
        //stack: "recon",
        yAxisIndex: 0,
        barMaxWidth: 20,
        label: {
          show: true,
          position: 'top',
          offset: [0, -10],
          formatter: (params) => {
            if (params.value === null) {
              return ' '
            }
          },
        },
        itemStyle: {
          normal: {
            color: '#FF5252',
          },
          emphasis: {
            color: '#FF5252',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        data: chartsData.detectionData,
      },

      {
        name: queryTemplate === 'LEAKAGE' ? 'Leakage Rate' : 'Detection Rate',
        type: 'line',
        yAxisIndex: 1,
        connectNulls: true,
        data: chartsData.rateData,
        smooth: false,
        tooltip: {
          show: true,
        },
        markLine: null,
      },
    ],
  }

  // function onChartClick(param, echarts) {
  //     console.log(param, echarts);
  //     showTableData(param)
  // };
  const onEvents = {
    click(param) {
      console.log(param)
      showTableData(param)
    },
  }

  return (
    <ReactEcharts
      notMerge={true}
      lazyUpdate={true}
      option={option}
      style={{ height: '400px', width: '100%' }}
      onEvents={onEvents}
    />
  )
}

QueryCharts.propTypes = {
  threshold: PropTypes.number,
  chartsData: PropTypes.object.isRequired,
  showTableData: PropTypes.func,
}

export default QueryCharts
