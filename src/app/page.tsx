import React, { useState } from 'react'
import AdminLayout from '../../layout/AdminLayout'
import QuestionAnswer from '../../component/QuestionAnswer'

interface QuestionAnswer {
  question: string
  answer: string
}

function HC_Shipping() {
  
  const [questions, setQuestions] = useState<QuestionAnswer[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [initialQuestion, setInitialQuestion] = useState('')
  const [initialAnswer, setInitialAnswer] = useState('')

  const handleQuestionSubmit = (questionAnswer: QuestionAnswer) => {
    if (isEditing) {
      const updatedQuestions = [...questions]
      updatedQuestions[editIndex] = questionAnswer
      setQuestions(updatedQuestions)
      setIsEditing(false)
      setEditIndex(-1)
      setInitialQuestion('')
      setInitialAnswer('')
    } else {
      setQuestions([...questions, questionAnswer])
    }
  }

  const handleEdit = (index: any) => {
    const updatedQuestions = [...questions]
    const updatedQuestion = prompt(
      'Edit Question',
      updatedQuestions[index].question
    )
    const updatedAnswer = prompt('Edit Answer', updatedQuestions[index].answer)
    if (updatedQuestion && updatedAnswer) {
      updatedQuestions[index] = {
        question: updatedQuestion,
        answer: updatedAnswer,
      } 
      setQuestions(updatedQuestions)
    }
  }

  const handleDelete = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  return (
    <AdminLayout>
      <h1>Shipping</h1>
      <div className="flex my-14 max-w-sm ml-2">
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm rounded-l-lg text-gray-900 bg-gray-50 rounded-r-lg   border border-primary-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 italic dark:text-white dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-100 rounded-r-lg border border-primary-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="my-modal-Caution1"
          className="px-8 py-6 text-xs text-white font-bold bg-[#0043A1] rounded-md ml-4 cursor-pointer text-center"
        >
          Add New Question Answer
        </label>
      </div>
      <div className="pt-8 mt-8">
        <QuestionAnswer
          id="my-modal-Caution1"
          name="exampleName"
          idData="exampleId"
          isArchive={true}
          content="exampleContent"
          onSubmit={handleQuestionSubmit}
          initialQuestion={initialQuestion}
          initialAnswer={initialAnswer}
          handleEdit={handleEdit} // Tambahkan properti handleEdit
        />
      </div>

      <div
        className="table-container"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <table className="w-full ml-4 mr-4">
          <tr className="text-sm  border-slate-700 text-center">
            <th className="px-4 border border-solid border-black ">No</th>
            <th className="px-4 border border-solid border-black">Question</th>
            <th className="px-4 border border-solid border-black">Answer</th>
            <th className="px-4 border border-solid border-black"></th>
          </tr>

          <tbody>
            {questions.map((questionAnswer, index) => (
              <tr
                key={index}
                className="text-sm border-b border-slate-700 text-center"
              >
                <td className="px-4 border border-solid border-black">
                  {index + 1}
                </td>
                <td className="px-4 border border-solid border-black">
                  {questionAnswer.question}
                </td>
                <td className="px-4 border border-solid border-black">
                  {questionAnswer.answer}
                </td>
                <td className="px-4 border border-solid border-black">
                  <button
                    className="edit-button-style mt-4 mb-4 px-2 py-2 text-xs text-blue font-bold bg-[#fafbfc] rounded-md ml-4 cursor-pointer text-center border border-blue-700"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button-style px-2 py-2 text-xs text-white font-bold bg-[#0043A1] rounded-md ml-4 cursor-pointer text-center"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default HC_Shipping
