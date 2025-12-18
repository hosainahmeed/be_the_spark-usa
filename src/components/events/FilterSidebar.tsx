import { useGetCategoryQuery } from '@/app/redux/service/categoryApis'
import { AgeOptionsForFilter, EventStatus, SkillLevel } from '@/constants/constantsOptions'
import { Collapse, Input, Radio, Select } from 'antd'
import React from 'react'

function FilterSidebar({ setAge, setSport, setEventType, setStatus, setSkillLevel, filters }: { setAge: any, setSport: any, setEventType: any, setStatus: any, setSkillLevel: any, filters: any }) {
  const { data: sportCategories } = useGetCategoryQuery({ type: 'sports' })
  const { data: eventTypeCategories } = useGetCategoryQuery({ type: 'event' })

  return (
    <div>
      <Input onChange={(e) => setAge(e.target.value)} size='middle' placeholder='Location (ZIP Code or City)' />
      <Select
        onClear={() => setAge('')}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Sport'
        onChange={(value) => {
          setSport(value)
        }}
        allowClear
      >
        {sportCategories?.data?.result?.map((item: any) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Collapse
        defaultActiveKey={['1']}
        expandIconPlacement='end'
      >
        <Collapse.Panel
          header="Age Group"
          key="1"
        >
          <Radio.Group
            vertical
            onChange={(e) => {
              const data = e.target.value.split('-')
              setAge({ minAge: data[0], maxAge: data[1] })
            }}
            value={filters.minAge ? filters?.minAge + '-' + filters?.maxAge : ''}
          >
            {AgeOptionsForFilter.map((option: any) => (
              <Radio key={option.value} value={option.value}>{option.label}</Radio>
            ))}
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>
      <Select
        onClear={() => setAge('')}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Event Type'
        onChange={(value) => {
          setEventType(value)
        }}
        allowClear
      >
        {eventTypeCategories?.data?.result?.map((item: any) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        onClear={() => setStatus('')}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Event Status'
        onChange={(value) => setStatus(value)}
        allowClear
        options={EventStatus}
      />
      <Select
        onClear={() => setSkillLevel('')}
        style={{ width: '100%', margin: '0.5rem 0' }}
        placeholder='Skill Level'
        onChange={(value) => setSkillLevel(value)}
        allowClear
        options={SkillLevel}
      />
    </div>
  )
}

export default FilterSidebar