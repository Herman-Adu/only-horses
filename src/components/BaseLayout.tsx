import { ReactNode } from  "react"

const BaseLayout = ({children, renderRightPanel = true}:{children:ReactNode, renderRightPanel: boolean}) => {
  return (
    <div className="flex gap-10">
        <p>sidebar</p>
        {children}
        {renderRightPanel && <p className="">Suggested Products</p>}
    </div>
  )
}

export default BaseLayout
