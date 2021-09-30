import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import conferences from 'utils/mocks/attendeeList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import { AddButton } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'

const MyConferenceListContainer = () => {
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const [, setHeader] = useHeader()
  const [, setFooter] = useFooter()
  const { t } = useTranslation()
  const history = useHistory()
  const [email] = useEmail()
  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters: { ...filters, organizerEmail: email }, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const handleAddClick = useCallback(() => {
    history.push('myConference/new')
  }, [history])
  history.push

  useEffect(() => {
    //did mount
    return () => {
      //will unmount
      setHeader(null)
      setFooter(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferences')}
        actions={<AddButton title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [setHeader, t])
  const handlePageChange = useCallback(page => {
    setPager(state => ({ ...state, page }))
  }, [])

  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 12, 24, 100]}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />
    )
  })

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])

  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}

export default MyConferenceListContainer
