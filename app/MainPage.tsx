'use client'
import { Button, Card, Dropdown, TextInput } from 'flowbite-react'
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
    <Card className="max-h-48 text-white" href="#">
      <h5 className="text-xl font-bold tracking-tight text-white">
        <span className={'text-blue-600/75'}>Q. </span>minishell 질문입니다
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden ">
        minishell 너무 오래걸려요 힘들어요. minishell 너무 오래걸려요 힘들어요.
        minishell 너무 오래걸려요 힘들어요. minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요 minishell 너무 오래걸려요 힘들어요
        minishell 너무 오래걸려요 힘들어요
      </div>
      <div className={'flex gap-2'}>
        <span>추천</span>
        <span>답변</span>
      </div>
    </Card>
  )
}

const MainPage = () => {
  return (
    <div>
      <div className={'flex justify-between'}>
        <div className={'flex gap-0.5 '}>
          <TextInput
            id="small"
            sizing="md"
            type="text"
            placeholder={'제목을 입력하세요'}
          />
          <Button className={'w-10'} color="dark" size="lg">
            <AiOutlineSearch />
          </Button>
        </div>
        <DefaultDropdown />
      </div>
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <div className={'flex'}>
        <DefaultPagination />
        <Button>새 글</Button>
      </div>
    </div>
  )
}
export default MainPage
