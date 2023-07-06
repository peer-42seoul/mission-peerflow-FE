import DetailPage from '../../../components/detailPage/detailPageWrap'
import { IQuestion } from '../../../types/Question'

export default function Page({ params }: { params: { id: number } }) {
  return (
    <>
      <DetailPage param={params.id} />
    </>
  )
}
