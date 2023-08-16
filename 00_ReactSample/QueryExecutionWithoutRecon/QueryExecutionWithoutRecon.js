/* eslint-disable react/display-name */

import React, { useEffect, useState, useContext, Children } from 'react'
import {
  Row,
  Col,
  PageHeader,
  Icon,
  Button,
  Input,
  Tabs,
  notification,
  Collapse,
  Spin,
  Table,
} from 'antd'
import { makeStyles } from '@material-ui/styles'
import api from 'utils/axios.js'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import 'moment-timezone'
import PropTypes from 'prop-types'
import QueryHeader from 'components/QueryHeader'
import Moment from 'react-moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { QueryContext, PolicyContext } from 'contexts'
import QuerySummaryWithoutRecon from 'components/QuerySummaryWithoutRecon'
import QueryChart from './QueryChart'
import { getDatePair, getDateListBetweenDate } from 'utils/dateUtil.js'
import { CSVLink } from 'react-csv'
import Highlighter from 'react-highlight-words'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  policyMain: {
    marginLeft: theme.spacing(2),
    width: '98%',
    // marginRight:theme.spacing(5),
    borderRadius: '1px',
    // boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
  },
  statistic: {
    padding: '16px 24px',
  },

  card: {
    fontSize: '14px',
    lineHeight: '30px',
    padding: '2px 5px',
  },
  button: {
    width: '140px',
    height: '35px',
    border: '#e5e5e7',
    color: '#FFFFFF',
    backgroundColor: '#66BB6A',
    padding: '10px',
    borderRadius: '5px',
    margin: '20px 45px',
  },
  input: {
    width: '99%',
    margin: '0px',
  },
  summary: {
    background: '#FFFFFF',
    borderRadius: 2,
    margin: '10px 20px',
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    border: 'none',
    overflow: 'hidden',
  },
  tableHide: {
    display: 'none',
  },
  Table: {
    margin: '20px 45px',
    fontSize: '12px',
    borderRadius: '10px',
  },
  codemirror: {
    // padding: '16px 24px',
    marginTop: '20px',
    border: '1px solid #e5e5e7',
  },
}))
const { Panel } = Collapse
const { TabPane } = Tabs
const options = {
  tabSize: 4,
  styleActiveLine: true,
  lineNumbers: true,
  line: true,
  mode: 'text/x-mysql',
  theme: 'default',
  lineWrapping: true,
  readOnly: false,
}
const customPanelStyle = {
  background: '#ffffff',
  borderRadius: 4,
  marginBottom: 5,
  border: 'none',
  overflow: 'hidden',
}
const dateFormat = 'YYYY-MM-DD'
const detailHeader = [
  {
    title: 'Date',
    dataIndex: 'breachDate',
    key: 'date',
  },
  {
    title: 'Total Count',
    dataIndex: 'totalAccounts',
    key: 'total',
  },
  {
    title: 'Leakage Count',
    dataIndex: 'detected',
    key: '',
  },

  {
    title: 'Rate(%)',
    dataIndex: 'rate',
    key: 'rate',
  },
]

const QueryExecutionWithoutRecon = (props) => {
  const classes = useStyles()
  const queryData = useContext(QueryContext)
  const policyData = useContext(PolicyContext)
  const { location, history } = props
  const [ChartsData, setData] = useState({})
  const [dailyTableData, setDailyTableData] = useState([])
  const [detailTableData, setDetailTableData] = useState([])
  const [fileName, setFileName] = useState('a.csv')
  const [showTableDetail, setTableDetailStatus] = useState(false)
  const [exportData, setExportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isPO_box, setPoBox] = useState(false)
  const [searchedColumn, setSearchColumn] = useState('')
  const URLparams = new URLSearchParams(location.search)
  const [statics, setStatics] = useState({
    totalAccounts: 0,
    detectedAccounts: 0,
    reconAccounts: 0,
    selfHealedAccounts: 0,
    leakageAccounts: 0,
    rateData: 0,
    reconData: 0,
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const dailyHeaders = [
    {
      title: 'Date',
      dataIndex: 'detectedAt',
      key: 'detectedAt',
      render: (text) =>
        text ? (
          <Moment format={dateFormat} unix tz="America/Los_Angeles">
            {text}
          </Moment>
        ) : (
          ''
        ),
    },
    {
      title: 'Region Code',
      dataIndex: 'regionCode',
      key: 'regionCode',
    },
    {
      title: 'Country Code',
      dataIndex: 'countryCode',
      key: 'countryCode',
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      ...getColumnSearchProps('accountNumber'),
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Entity Level',
      dataIndex: 'entityLevel',
      key: 'entityLevel',
    },
    {
      title: 'Entity Level Status',
      dataIndex: 'entityLevelStatus',
      key: 'entityLevelStatus',
    },
    {
      title: 'Restriction Status',
      dataIndex: 'restrictionStatus',
      key: 'restrictionStatus',
    },
    {
      title: 'Breach Date',
      dataIndex: 'breachAt',
      key: 'breachAt',
      render: (text) =>
        text ? (
          <Moment format={dateFormat} unix tz="America/Los_Angeles">
            {text}
          </Moment>
        ) : (
          ''
        ),
    },
    {
      title: ' Recon Status ',
      dataIndex: 'reconStatus',
      key: 'reconStatus',
    },
    {
      title: 'Batch Recon Date',
      dataIndex: 'reconAt',
      key: 'reconAt',
      render: (text) =>
        text ? (
          <Moment format={dateFormat} unix tz="America/Los_Angeles">
            {text}
          </Moment>
        ) : (
          ''
        ),
    },

    {
      title: 'Batch Recon Source Type',
      dataIndex: 'reconSourceType',
      key: 'reconSourceType',
    },
    {
      title: 'Review Status',
      dataIndex: 'reviewStatus',
      key: 'reviewStatus',
    },
    {
      title: 'Additional Data',
      dataIndex: 'additionalData',
      key: 'additionalData',
      className: isPO_box ? 'show' : classes.tableHide,
    },
  ]

  function showTableData(params) {
    let date = params.name
    setFileName(`${params.name}-${queryData.name}.csv`)
    let breachId = URLparams.get('breachId')
    setLoading(true)
    return api
      .get(
        `/v1/compargusserv/detectionresult/data?detectionId=${breachId}&date=${date}`,
      )
      .then((response) => response.data.detectionResults)
      .then((data) => {
        let exportTemp = []
        data.forEach((t) => {
          if (t.additionalData) {
            setPoBox(true)
            // let metaData = JSON.parse(t.additionalData)
            // t.additionalData = metaData
            exportTemp.push({
              Date: moment(moment(t.detectedAt, 'X')).format(dateFormat),
              Region: t.regionCode,
              Country: t.countryCode,
              'Account Number': t.accountNumber + '\t',
              'Account Type': t.accountType,
              'Entity Level': t.entityLevel,
              'Entity Level Status': t.entityLevelStatus,
              'Restriction Status': t.restrictionStatus,
              'Breach Date': moment(moment(t.breachAt, 'X')).format(dateFormat),
              'Recon Status': t.reconStatus,
              'Batch Recon Date': moment(moment(t.updatedAt, 'X')).format(
                dateFormat,
              ),
              'Recon Source Type': t.reconSourceType,
              'Additional Data': t.additionalData,
            })
          } else {
            exportTemp.push({
              Date: moment(moment(t.detectedAt, 'X')).format(dateFormat),
              Region: t.regionCode,
              Country: t.countryCode,
              'Account Number': t.accountNumber + '\t',
              'Account Type': t.accountType,
              'Entity Level': t.entityLevel,
              'Entity Level Status': t.entityLevelStatus,
              'Restriction Status': t.restrictionStatus,
              'Breach Date': moment(moment(t.breachAt, 'X')).format(dateFormat),
              'Recon Status': t.reconStatus,
              'Batch Recon Date': moment(moment(t.updatedAt, 'X')).format(
                dateFormat,
              ),
              'Recon Source Type': t.reconSourceType,
            })
          }
        })
        setLoading(false)
        setExportData(exportTemp)
        setDailyTableData(data)
        setTableDetailStatus(true)
        return ''
      })
  }

  function getDetectionResult(params) {
    let fromDate =
      moment(params.fromDate).format(dateFormat) ||
      getDatePair().fromDate.format(dateFormat)
    let toDate =
      moment(params.toDate).format(dateFormat) ||
      getDatePair().toDate.format(dateFormat)
    let breachId = params.breachId
    let mode = params.mode
    let dateArray = getDateListBetweenDate(fromDate, toDate)
    let chartData = {
      categoryData: [],
      detectionData: [],
      detectionTotalData: [],
      rateData: [],
      tableData: [],
    }

    let staticsTemp = {
      totalAccounts: 0,
      detectedAccounts: 0,
      leakageRate: 0,
    }
    return api
      .get(
        `/v1/compargusserv/detectionresult/statistic/?detectionId=${breachId}&fromDate=${fromDate}&toDate=${toDate}&detectionTemplate=LEAKAGE`,
      )
      .then((response) => response.data)
      .then((data) => {
        dateArray.forEach((d, index) => {
          chartData.categoryData.push(d)
          if (
            data.detectionResultStats.find((t) => t.category === 'TOTAL') &&
            data.detectionResultStats
              .find((t) => t.category === 'TOTAL')
              .dailyNumbers.find((dn) => dn.date === d)
          ) {
            chartData.detectionTotalData.push(
              data.detectionResultStats
                .find((t) => t.category === 'TOTAL')
                .dailyNumbers.find((dn) => dn.date === d).countNumber,
            )
          } else {
            chartData.detectionTotalData.push(null)
          }

          if (
            data.detectionResultStats.find((t) => t.category === 'DETECTED') &&
            data.detectionResultStats
              .find((t) => t.category === 'DETECTED')
              .dailyNumbers.find((dn) => dn.date === d)
          ) {
            chartData.detectionData.push(
              data.detectionResultStats
                .find((t) => t.category === 'DETECTED')
                .dailyNumbers.find((dn) => dn.date === d).countNumber,
            )
          } else {
            chartData.detectionData.push(null)
          }

          chartData.tableData.push({
            breachDate: d,
            total: chartData.detectionTotalData[index],
            detected: chartData.detectionData[index],
            rate:
              chartData.detectionTotalData[index] !== 0 &&
              chartData.detectionTotalData[index]
                ? (
                    (chartData.detectionData[index] /
                      chartData.detectionTotalData[index]) *
                    100
                  ).toFixed(4)
                : 'N/A',
          })
          chartData.rateData[index] =
            chartData.detectionTotalData[index] !== 0 &&
            chartData.detectionTotalData[index]
              ? (
                  (chartData.detectionData[index] /
                    chartData.detectionTotalData[index]) *
                  100
                ).toFixed(4)
              : 'N/A'
          staticsTemp.totalAccounts += chartData.detectionTotalData[index]
          staticsTemp.detectedAccounts += chartData.detectionData[index]
        })

        if (mode === 'FULL') {
          staticsTemp.totalAccounts =
            chartData.detectionTotalData[
              chartData.detectionTotalData.length - 1
            ]

          staticsTemp.detectedAccounts =
            chartData.detectionData[chartData.detectionTotalData.length - 1]
        }

        if (staticsTemp.totalAccounts && staticsTemp.totalAccounts !== 0) {
          staticsTemp.leakageRate = Number(
            (
              (staticsTemp.detectedAccounts / staticsTemp.totalAccounts) *
              100
            ).toFixed(4),
          )
        } else {
          staticsTemp.leakageRate = 'N/A'
        }

        setData(chartData)
        setStatics(staticsTemp)
        setDetailTableData(chartData.tableData)
        setLoading(false)
        return chartData
      })
      .catch((exception) => {
        if (exception) {
          notification.error({
            message: 'Error',
            duration: 3,
            description:
              (exception.response &&
                exception.response.data &&
                exception.response.data.message) ||
              exception.message,
            style: {
              width: 400,
              marginTop: 100,
            },
          })
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    let params = new URLSearchParams(location.search)
    setLoading(true)
    if (params.get('fromDate') && params.get('toDate')) {
      getDetectionResult({
        breachId: params.get('breachId'),
        mode: params.get('mode'),
        fromDate: params.get('fromDate'),
        toDate: params.get('toDate'),
      })
    }

    setExportData([])
    setDailyTableData([])
    setTableDetailStatus(false)
  }, [location.search])

  function callback(key) {
    console.log(key)
  }
  return (
    <div className={classes.root}>
      <Row className={classes.summary}>
        <PageHeader title="Query" subTitle="Query Execution" />
        <Col span={24} className={classes.policyMain}>
          <QueryHeader />
        </Col>
        <Col span={24} className={classes.policyMain}>
          <Collapse
            onChange={callback}
            defaultActiveKey={['1', '2']}
            bordered={false}
            expandIcon={({ isActive }) => (
              <Icon type="caret-right" rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="OVERVIEW" key="0" style={customPanelStyle}>
              <CKEditor
                editor={ClassicEditor}
                disabled
                config={{
                  toolbar: [],
                  isReadOnly: true,
                }}
                data={queryData.description}
                name="description"
                className={classes.codemirror}
                style={{ border: '1px solid rgba(0,0,0,0.14)' }}
                placeholder="Policy Description"
              />
            </Panel>
            <Panel header="SUMMARY" key="1" style={customPanelStyle}>
              <Spin spinning={loading}>
                <QuerySummaryWithoutRecon
                  statics={statics}
                  queryTemplate={queryData.template}
                />
              </Spin>
            </Panel>
            <Panel header="CHART" key="2" style={customPanelStyle}>
              <Spin spinning={loading}>
                <QueryChart
                  queryTemplate={queryData.template}
                  chartsData={ChartsData}
                  showTableData={showTableData}
                />
              </Spin>
              {showTableDetail ? (
                <Row className={classes.policyMain}>
                  <Col span={2}>
                    <CSVLink
                      data={exportData}
                      separator={','}
                      filename={fileName}
                      className={classes.button}
                    >
                      EXPORT
                    </CSVLink>
                  </Col>
                  <Col span={24}>
                    <Table
                      pagination={false}
                      columns={dailyHeaders}
                      dataSource={dailyTableData}
                      className={classes.Table}
                      size="small"
                      rowKey={(record) => record.key}
                    />
                  </Col>
                </Row>
              ) : (
                ''
              )}
            </Panel>
            <Panel header="DETAIL" key="3" style={customPanelStyle}>
              <Table
                pagination={false}
                columns={detailHeader}
                dataSource={detailTableData}
                className={classes.Table}
                bordered
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  )
}
QueryExecutionWithoutRecon.propTypes = {
  //className: PropTypes.string,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(QueryExecutionWithoutRecon)
