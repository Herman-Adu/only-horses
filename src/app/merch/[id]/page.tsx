import BaseLayout from "@/components/BaseLayout"

/* by default Next gives all server components params as props */
const page = ({params}:{params: {id: string}}) => {
  return (
    <BaseLayout renderRightPanel={false}>
      Merch Details Page 
    </BaseLayout>
  )
}

export default page
