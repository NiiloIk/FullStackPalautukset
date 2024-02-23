import { useEffect, useState } from 'react'
import { Diary } from './types';
import { getAllDiaries } from './diaryService';

import Diaries from './components/diaries';
import DiaryForm from './components/diaryForm';


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Diaries content={diaries} />
    </div>
  )
}

export default App