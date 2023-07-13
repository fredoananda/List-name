import React, { useRef, useState } from 'react';
import { useCountry } from '../../hooks/useCountry';
import { useInterShipping } from '../../hooks/useInterShipping';
import { useLang } from '../../hooks/useLang';
import { useProductCategory } from '../../hooks/useProductCat';
import { useProductCondition } from '../../hooks/useProductCon';
import { useWarehouse } from '../../hooks/useWarehouse';
import PfsButtonOne from '../../components/atoms/Pfs_ButtonOne';
import PfsMainInputOne from '../../components/atoms/Pfs_MainInputOne';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faListUl,
  faQuoteRight,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faPaperclip,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

interface QuestionAnswerProps {
  id: string;
  onSubmit: (questionAnswer: QuestionAnswerData) => void;
}

interface QuestionAnswerData {
  question: string;
  answer: string;
}

interface QuestionAnswerPropsExtended extends QuestionAnswerProps {
  name: string;
  idData: string;
  isArchive: any;
  content: string;
  content2?: string;
  initialQuestion?: string;
  initialAnswer?: string;
  handleEdit: (index: number) => void;
}

export default function QuestionAnswer({
  id,
  name,
  content,
  content2,
  idData,
  isArchive,
  onSubmit,
  initialQuestion = '',
  initialAnswer = '',
  handleEdit,
}: QuestionAnswerPropsExtended) {
  const modal = useRef<HTMLInputElement>(null);
  const { archive } = useProductCategory();
  const { archiveCon } = useProductCondition();
  const { archiveCountry } = useCountry();
  const { archiveLanguage } = useLang();
  const { archiveWarehouse } = useWarehouse();
  const { archiveInterShipping } = useInterShipping();

  const handleArchive = () => {
    if (name === 'category') {
      archive(idData, isArchive);
    } else if (name === ' condition') {
      archiveCon(idData, isArchive);
    } else if (name === 'country') {
      archiveCountry(idData, isArchive);
    } else if (name === 'language') {
      archiveLanguage(idData, isArchive);
    } else if (name === 'warehouse') {
      archiveWarehouse(idData, isArchive);
    } else if (name === 'International_Shipping') {
      archiveInterShipping(idData);
    }
  };

  const [picture, setPicture] = useState<File>();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [yesButtonClicked, setYesButtonClicked] = useState(false);

  
  const handleSendClick = () => {
    setResult(text);
  };

  const handleDoneClick = () => {
    setInputValue('');
    setShowResult(false);
    // Logika lain yang ingin Anda tambahkan setelah selesai
  };

  const handleOkClick = () => {
    // Logika ketika tombol OK diklik
    // Anda dapat melakukan tindakan yang diperlukan
    setShowResult(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleChecklistChange = () => {
    setShowResult(!showResult);
  };

  const handleYesButtonClick = () => {
    if (showResult && yesButtonClicked) {
      // Tindakan yang akan diambil jika checklist dicentang dan tombol "Yes" diklik
      console.log('Yes button clicked and checklist is checked.');
    } else {
      // Tindakan yang akan diambil jika checklist tidak dicentang atau tombol "Yes" belum diklik
      console.log('Yes button clicked and checklist is not checked.');
    }
  };

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const [bulletsActive, setBulletsActive] = useState(false);
  const handleBulletsClick = () => {
    setBulletsActive(!bulletsActive);
  };

  const [quotesActive, setQuotesActive] = useState(false);
  const [alignLeftActive, setAlignLeftActive] = useState(false);
  const handleQuotesClick = () => {
    setQuotesActive(!quotesActive);
  };

  const handleAlignLeftClick = () => {
    setAlignLeftActive(!alignLeftActive);
  };

  const handleAlignCenterClick = () => {
    // Implement align center functionality
  };

  const handleAlignRightClick = () => {
    // Implement align right functionality
  };

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileAttached, setFileAttached] = useState(false);

  const handleAttachFileClick = () => {
    inputFileRef.current!.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    // Lakukan logika yang sesuai untuk mengelola file yang diunggah
    // Misalnya, simpan file ke state, lakukan pengolahan, atau kirim ke server
    console.log('File selected:', selectedFile);

    // Set state fileAttached menjadi true setelah file diunggah
    setFileAttached(true);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddPictureClick = () => {
    inputFileRef.current!.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  const handleNoClick = () => {
    // Tindakan yang dilakukan ketika tombol "No" diklik
  };

  const [state, setState] = useState<QuestionAnswerData>({
    question: initialQuestion,
    answer: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const questionAnswer: QuestionAnswerData = {
      question: state.question,
      answer: text,
    };
    onSubmit(questionAnswer);
  
    // Uncheck the modal checkbox to close the modal
    if (modal.current) {
      modal.current.checked = false;
    }
  };


  return (
    <div>
      <input type="checkbox" ref={modal} id={id} className="modal-toggle" />
      <div className="modal">
        <div className="relative p-10 bg-white">
          <label
            htmlFor={id}
            className="text-xl font-bold absolute right-5 top-3 cursor-pointer text-black"
          >
           ✕
          </label>
          <div className="flex flex-col w-full ">
            <h2 className="m-start">Question</h2>
            <div className="mt-5 w-full">
              <input
                onChange={(e) =>
                  setState({ ...state, question: e.target.value })
                }
                value={state.question}
                type="text"
                placeholder="Enter title’s here"
                className={` border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>

            <div className="flex gap-2 max-w-4xl pl-2 mt-8">Answer</div>

            <div className="bg-[#FAFAFA]">
              <div className="toolbar">
                <select className="font-type-select1">
                  <option value="Arial">Paragraph</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <div className="toolbar-button" onClick={handleBoldClick}>
                  <FontAwesomeIcon icon={faBold} />
                </div>
                <div className="toolbar-button" onClick={handleItalicClick}>
                  <FontAwesomeIcon icon={faItalic} />
                </div>
                <div className="toolbar-button" onClick={handleBulletsClick}>
                  <FontAwesomeIcon icon={faListUl} />
                </div>
                <div className="toolbar-button" onClick={handleQuotesClick}>
                  <FontAwesomeIcon icon={faQuoteRight} />
                </div>
                <div className="toolbar-button" onClick={handleAlignLeftClick}>
                  <FontAwesomeIcon icon={faAlignLeft} />
                </div>
                <div
                  className="toolbar-button"
                  onClick={handleAlignCenterClick}
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </div>
                <div className="toolbar-button" onClick={handleAlignRightClick}>
                  <FontAwesomeIcon icon={faAlignRight} />
                </div>
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                <div className="toolbar-button" onClick={handleAttachFileClick}>
                  <FontAwesomeIcon icon={faPaperclip} />
                </div>
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />

                <div className="toolbar-button" onClick={handleAddPictureClick}>
                  <FontAwesomeIcon icon={faImage} />
                </div>

                <td className="containertype">
                  <select className="font-type-select2">
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                  <div>
                    <select className="font-size-select">
                      <option value="12">size</option>
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                    </select>
                  </div>
                </td>
              </div>
              <div className="text-editor">
                <div className="content">
                  <textarea
                    className="text-area"
                    placeholder="Type your text here"
                    value={text}
                    onChange={handleTextChange}
                    style={{
                      fontWeight: isBold ? 'bold' : 'normal',
                      fontStyle: isItalic ? 'italic' : 'normal',
                      listStyleType: bulletsActive ? 'disc' : 'none',
                      borderLeft: quotesActive ? '4px solid gray' : 'none',
                      textAlign: alignLeftActive ? 'left' : 'initial',
                    }}
                  ></textarea>
                </div>
                <div className="footer"></div>

                <div className="checklist-container">
                  <p>Word Counts:</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-2 py-4 mt-4 text-xs text-white font-bold bg-[#0043A1] rounded-md ml-auto cursor-pointer text-center w-20">
                <button type="submit">
                  SUBMIT
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
      <style>
        {`
    .text-editor-container {
      display: flex;
  flex-direction: column;
  align-items: flex-start;
    }
    
    .text-editor {
      width: 100%;
      height: 400px;
      border: 1px solid #ccc;
      padding: 10px;
      display: flex;
      flex-direction: column;
      padding-right: 10px; 
    }
    
    .content {
      flex-grow: 1;
    }
    
    .font-type-select option {
      font-size: 10px;
      text-align: center;
    }
    
    .text-area {
      width: 100%;
      height: 100%;
      resize: none;
    }
    
    .footer {
      display: flex;
      align-items: center;
      padding-top:4px
    }
    
  .containertype{
    display: flex;
  justify-content: space-between;
  }

    .font-type-select1 {
      margin-top:5px;
      margin-right:5px;
      width: 100px;
      height: 30px;
      font-size: 11px;
      padding: 2px;
      text-align: center;
  
    }
    
    .font-type-select2 {
      margin-top: 5px;
      margin-right: 5px;
      width: 100px;
      height: 30px;
      font-size: 11px;
      padding: 2px;
      text-align: center;
      
  
    }
    
    .font-size-select {
      margin-right: 17rem;
      width: 100px;
      height: 30px;
      font-size: 11px;
      padding: 2px;
      text-align: center;
      margin-top:5px;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      margin-right: 20px;
      margin-bottom: 3px;
      padding-left:2px
    }
    
    .toolbar-button {
      display: flex;
      align-items: center;
      margin-right: 20px;
      padding: 1px;
      padding-top:4px
    }
    
    .symbol {
      margin: 1px;
    }
    .checklist-container {
      display: flex;
      flex-direction: column;
    }
    
    .checklist-text {
      margin-left: 10px;
    }
    
    .button-container {
      display: flex;
      margin-top: 10px;
    }
    
    .no-button,
    .yes-button {
      padding: 8px 25px; /* Mengurangi padding untuk ukuran yang lebih kecil */
      margin: 0 5px;
      line-height: 10px;
    }
.no-button {
      font-size: 11px; /* Mengurangi ukuran font untuk ukuran yang lebih kecil */
      background-color: white;
      color: blue;
      border-radius: 6px;
      width: 230px; /* Memperpanjang lebar tombol */
      border: 2px solid blue;
    }
    
    .yes-button {
      font-size: 11px; /* Mengurangi ukuran font untuk ukuran yang lebih kecil */
      background-color: blue;
      color: white;
      border-radius: 6px;
      width: 200px; /* Menyesuaikan lebar tombol */
    }
    .button-container-right {
      margin-top:40px;
      display: flex;
      justify-content: flex-end;
    }
    `}
      </style>
    </div>
  )
}
