import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'

//const ceva = func => event => (func(event.target.value))
const MyConferenceInfo = props => {
  const { types, categories, conference, dispatch } = props
  const { t } = useTranslation()
  const { name, startDate, endDate, type, category } = conference
  const handleChange = type => value => dispatch({ type: type, payload: value })
  return (
    <Grid container>
      <Grid item lg={9} container spacing={3}>
        <Grid item lg={4} sm={6} xs={12}>
          <CustomTextField label={t('Conference.Name')} fullWidth value={name} onChange={onTextBoxChange(handleChange('name'))} />
        </Grid>
      </Grid>
      <Grid item lg={12} container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <DateTime label={t('Conference.StartDate')} showTime={true} value={startDate} onChange={handleChange('startDate')} />
        </Grid>
      </Grid>
      <Grid item lg={12} container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <DateTime label={t('Conference.EndDate')} showTime={true} value={endDate} onChange={handleChange('endDate')} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Autocomplete label={t('Conference.Type')} isClearable options={types} fullWidth value={type} onChange={handleChange('type')} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} spacing={3}>
        <Autocomplete
          label={t('Conference.Categories')}
          isClearable
          options={categories}
          fullWidth
          value={category}
          onChange={handleChange('category')}
        />
      </Grid>
    </Grid>
  )
}

MyConferenceInfo.propTypes = {
  types: PropTypes.array,
  categories: PropTypes.array,
  conference: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
export default MyConferenceInfo
