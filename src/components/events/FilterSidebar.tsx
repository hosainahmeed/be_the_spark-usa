import { useGetCategoryQuery } from '@/app/redux/service/categoryApis'
import { AgeOptions, EventStatus } from '@/constants/constantsOptions'
import { Input, Select } from 'antd'
import React from 'react'

function FilterSidebar({ setFilters }: { setFilters: any }) {
  const { data: sportCategories } = useGetCategoryQuery({ type: 'sports' })
  const { data: eventTypeCategories } = useGetCategoryQuery({ type: 'event' })
  return (
    <div>
      <Input onChange={(e) => setFilters({ location: e.target.value })} size='middle' placeholder='Location (ZIP Code or City)' />
      <Select
        onClear={() => setFilters({ sport: '' })}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Sport'
        onChange={(value) => setFilters({ sport: value })}
        allowClear
      >
        {sportCategories?.data?.result?.map((item: any) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        onClear={() => setFilters({ age_group: '' })}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Age Group'
        onChange={(value) => {
          const data = value.split('-')
          setFilters({ minAge: data[0], maxAge: data[1] })
        }}
        allowClear
        options={AgeOptions}
      />

      <Select
        onClear={() => setFilters({ event_type: '' })}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Event Type'
        onChange={(value) => setFilters({ event_type: value })}
        allowClear
      >
        {eventTypeCategories?.data?.result?.map((item: any) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        onClear={() => setFilters({ age_group: '' })}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Age Group'
        onChange={(value) => {
          const data = value.split('-')
          setFilters({ minAge: data[0], maxAge: data[1] })
        }}
        allowClear
        options={EventStatus}
      />
    </div>
  )
}

export default FilterSidebar