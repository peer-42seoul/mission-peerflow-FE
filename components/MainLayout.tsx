'use client'
import { Sidebar } from 'flowbite-react'

const Category = () => {
  return (
    <Sidebar aria-label="peer-flow" className={'h-screen'}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#">
            <p>peerFlow</p>
          </Sidebar.Item>
          <Sidebar.Item href="#">
            <p># Minishell</p>
          </Sidebar.Item>
          <Sidebar.Item href="#">
            <p># Minirt</p>
          </Sidebar.Item>
          <Sidebar.Item href="#">
            <p># Fdf</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

const MainLayout = ({ children }) => {
  return (
    <div className={'flex'}>
      <Category />
      <div className={'flex-1 h-screen'}>
        <h5 className={'py-4 px-8 bg-blue-50'}>peerFlow</h5>
        <div className={'w-full bg-red-50'}>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
