import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { Editor, EditorState as EditorStateType } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToRaw } from 'draft-js'

interface IProps {
  mentions: any[]
  isLoading?: boolean
  onComment?: (comment: string) => void
}

const RichTextEditor: FC<IProps> = ({ mentions, isLoading, onComment }) => {
  const [editorState, setEditorState] = useState<EditorStateType>()
  console.log('EditorStateType: ', EditorStateType)

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  const handleComment = () => {
    if (onComment && editorState) {
      onComment(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    }
  }

  return (
    <Box width={'100%'} position={'relative'}>
      <Editor
        editorState={editorState}
        toolbarClassName='draftToolbarClassName'
        wrapperClassName='draftWrapperClassName'
        editorClassName='draftEditorClassName'
        onEditorStateChange={onEditorStateChange}
        placeholder='Write a Comment'
        wrapperStyle={{ display: 'flex', flexDirection: 'column-reverse' }}
        editorStyle={{ padding: '20px', minHeight: '150px', marginBottom: '5px' }}
        toolbar={{
          options: ['inline'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'monospace'],
          },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: 'apple' },
            { text: 'BANANA', value: 'banana', url: 'banana' },
            { text: 'CHERRY', value: 'cherry', url: 'cherry' },
            { text: 'DURIAN', value: 'durian', url: 'durian' },
            { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
            { text: 'FIG', value: 'fig', url: 'fig' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
            { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
          ],
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '30px',
          bottom: '10px',
        }}
      >
        <LoadingButton
          variant='contained'
          color='primary'
          loading={isLoading}
          onClick={handleComment}
        >
          Comment
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default RichTextEditor
