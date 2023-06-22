'use client'
import { Button, Card, Dropdown, Sidebar, TextInput } from 'flowbite-react'
import 'flowbite'
import { AiOutlineSearch } from 'react-icons/ai'

import { Pagination } from 'flowbite-react'
import { useState } from 'react'

const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => setCurrentPage(page)

  return (
    <Pagination
      nextLabel={''}
      previousLabel={''}
      showIcons
      currentPage={currentPage}
      onPageChange={() => onPageChange(currentPage)}
      totalPages={100}
    />
  )
}
const Category = () => (
  <>
    <Sidebar aria-label="peer-flow">
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
  </>
)

const DefaultDropdown = () => {
  return (
    <Dropdown label="게시글 정렬">
      <Dropdown.Item>최신순</Dropdown.Item>
      <Dropdown.Item>조회순</Dropdown.Item>
      <Dropdown.Item>추천순</Dropdown.Item>
    </Dropdown>
  )
}

const DefaultCard = () => {
  return (
    <Card className="max-w-sm max-h-48 flex flex-col" href="#">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex-1">
        <span className={'text-blue-600/75'}>Q. </span>minishell 질문입니다
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400 flex-none">
        minishell 너무 오래걸려요 힘들어요. minishell 너무 오래걸려요 힘들어요.
        minishell 너무 오래걸려요 힘들어요. minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요
      </div>
      <div className={'flex-1'}>추천</div>
      <div className={'flex-1'}>답변</div>
    </Card>
  )
}

const MainPage = () => {
  return (
    <div>
      <Category />
      <div className={'flex'}>
        <TextInput
          id="small"
          sizing="sm"
          type="text"
          placeholder={'제목을 입력하세요'}
        />
        <Button className={'w-10'} color="dark">
          <AiOutlineSearch />
        </Button>
      </div>
      <DefaultDropdown />
      <DefaultCard />
      <DefaultPagination />
      <Button>새 글</Button>
    </div>
  )
}
export default MainPage
