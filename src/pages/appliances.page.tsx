import React from 'react'
import ProfileProjectLayout from '../lib/components/profile.project/profile.project.layout'
import AppliancesTable from '../lib/appliances/appliances.table'
import { DUMMY_APPLIANCES } from '../lib/data/dummy_appliances'

const AppliancesPage = () => {
  return (
    <ProfileProjectLayout>
        <AppliancesTable initialData={DUMMY_APPLIANCES}/>
    </ProfileProjectLayout>
  )
}

export default AppliancesPage
