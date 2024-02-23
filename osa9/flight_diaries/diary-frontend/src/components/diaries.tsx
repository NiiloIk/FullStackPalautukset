import { Diary } from "../types"

const Diaries = ({ content }: { content: Diary[] } ) => {
  return (
    <>
      <h2>Flight diaries</h2>
      {content.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
        </div>
      ))}
    </>
  )
}

export default Diaries