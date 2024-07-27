
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>
{
    const notesIntial=[
        {
          "_id": "66a0ed933816a667ec523b91",
          "user": "669e8d62e94ca17e957afeba",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2024-07-24T12:03:31.941Z",
          "__v": 0
        },
        {
            "_id": "66a0ed933816a667ec523b91",
            "user": "669e8d62e94ca17e957afeba",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-07-24T12:03:31.941Z",
            "__v": 0
          },
          {
            "_id": "66a0ed933816a667ec523b91",
            "user": "669e8d62e94ca17e957afeba",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-07-24T12:03:31.941Z",
            "__v": 0
          },
          {
            "_id": "66a0ed933816a667ec523b91",
            "user": "669e8d62e94ca17e957afeba",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-07-24T12:03:31.941Z",
            "__v": 0
          },
          {
            "_id": "66a0ed933816a667ec523b91",
            "user": "669e8d62e94ca17e957afeba",
            "title": "my title",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2024-07-24T12:03:31.941Z",
            "__v": 0
          },
      ]
      const [notes,setNotes]=useState(notesIntial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;