import BaseLayout from '@/components/BaseLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const Page = () => {
  return (
    <BaseLayout renderRightPanel={false}>
      
      <Tabs defaultValue='content' className='w-full mx-auto my-10 px-2 md:px-10'>
        <TabsList className='flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto'>
        <TabsTrigger value='content' className='w-full md:w-auto'>
						Content
					</TabsTrigger>
					<TabsTrigger value='store' className='w-full md:w-auto'>
						Store
					</TabsTrigger>
					<TabsTrigger value='analytics' className='w-full md:w-auto'>
						Analytics
					</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

    </BaseLayout>
  )
}

export default Page
