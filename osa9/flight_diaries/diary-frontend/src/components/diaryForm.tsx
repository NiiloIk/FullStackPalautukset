import React, { useEffect, useState } from "react";
import { createDiary } from "../diaryService";
import { Diary } from "../types";
import { AxiosError } from "axios";


interface DiaryFormProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const [date, setDate] = useState("")
  const [weather, setWeather] = useState("")
  const [visibility, setVisibility] = useState("")
  const [comment, setComment] = useState("")

  const [message, setMessage] = useState("")

  const messageStyle = {
    "color": "red"
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }, [message])

  const createNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const newDiary = await createDiary({
        comment, date,
        weather, visibility,
      })

      setDiaries(diaries.concat(newDiary))

      setDate("")
      setWeather("")
      setVisibility("")
      setComment("")
    } catch (e: unknown) {
      const error = e as AxiosError
      if (error.response && error.response.data) {
        const errorMessage = JSON.stringify(error.response.data)
        setMessage(errorMessage)
      } else {
        setMessage("unknown error occurred")
      }
    }

  }

  return (
    <>
      <h2>Create a new entry</h2>
      {message && (
        <div>
          <p style={messageStyle}>{message}</p>
        </div>
      )}

      <form onSubmit={createNewDiary}>
        <table>
          <tbody>
            <tr>
              <td>date</td>
              <td>
                <input value={date} type="date" onChange={(event) => setDate(event.target.value)} />
              </td>
            </tr>
            <tr>
              <td>weather</td>
              <td>
                <label htmlFor="sunny">sunny</label>
                <input
                  type="radio"
                  name="weather"
                  id="sunny"
                  value="sunny"
                  onChange={(event) => setWeather(event.target.value)}
                />

                <label htmlFor="rainy">rainy</label>
                <input
                  type="radio"
                  name="weather"
                  id="rainy"
                  value="rainy"
                  onChange={(event) => setWeather(event.target.value)}
                />

                <label htmlFor="cloudy">cloudy</label>
                <input
                  type="radio"
                  name="weather"
                  id="cloudy"
                  value="cloudy"
                  onChange={(event) => setWeather(event.target.value)}
                />

                <label htmlFor="stormy">stormy</label>
                <input
                  type="radio"
                  name="weather"
                  id="stormy"
                  value="stormy"
                  onChange={(event) => setWeather(event.target.value)}
                />

                <label htmlFor="windy">windy</label>
                <input
                  type="radio"
                  name="weather"
                  id="windy"
                  value="windy"
                  onChange={(event) => setWeather(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>visibility</td>
              <td>
                <div>
                  <label htmlFor="great">great</label>
                  <input
                    type="radio"
                    name="visibility"
                    id="great"
                    value="great"
                    onChange={(event) => setVisibility(event.target.value)}
                  />

                  <label htmlFor="good">good</label>
                  <input
                    type="radio"
                    name="visibility"
                    id="good"
                    value="good"
                    onChange={(event) => setVisibility(event.target.value)}
                  />

                  <label htmlFor="ok">ok</label>
                  <input
                    type="radio"
                    name="visibility"
                    id="ok"
                    value="ok"
                    onChange={(event) => setVisibility(event.target.value)}
                  />

                  <label htmlFor="poor">poor</label>
                  <input
                    type="radio"
                    name="visibility"
                    id="poor"
                    value="poor"
                    onChange={(event) => setVisibility(event.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>comment</td>
              <td>
                <input value={comment} onChange={(event) => setComment(event.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
        <button>create new</button>
      </form>

    </>
  )
}

export default DiaryForm