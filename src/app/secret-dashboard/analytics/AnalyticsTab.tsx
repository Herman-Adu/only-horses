import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, PoundSterlingIcon } from 'lucide-react'
import React from 'react'

const AnalyticsTab = () => {

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <PoundSterlingIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>£25,345</div>
          </CardContent>
				</Card>

        <Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Sales</CardTitle>
						<PoundSterlingIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+3700</div>
					</CardContent>
				</Card>

        <Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
						<PoundSterlingIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+45</div>
					</CardContent>
				</Card>

      </div>
    </>
  )
}

export default AnalyticsTab
