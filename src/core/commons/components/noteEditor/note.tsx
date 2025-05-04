"use client"

// import './styles.css'
import "./index.scss"

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import { button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import { 
    Bold,
    Italic,
    ListOrdered,
    List,
    Code,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Quote,
    Undo,
    Redo,
    Minus,
    Eraser
} from 'lucide-react'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group border p-2 rounded-[10px]">
      <div className="button-group flex gap-5 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        //   variant="ghost"
          className={cn(editor.isActive('bold') ? 'is-active' : '', 'text-xs p-[2px]')}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={cn(editor.isActive('italic') ? 'is-active' : '', 'text-xs')}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={cn(editor.isActive('strike') ? 'is-active' : '', 'text-xs')}
        >
          <Strikethrough size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={cn(editor.isActive('code') ? 'is-active' : '', 'text-xs')}
        >
          <Code size={16} />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="text-xs">
          <Eraser size={16} />
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className="text-xs">
          <Minus size={16} />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor.isActive('heading', { level: 1 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading2 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive('heading', { level: 3 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading3 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={cn(editor.isActive('heading', { level: 4 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading4 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={cn(editor.isActive('heading', { level: 5 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading5 size={16} />
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={cn(editor.isActive('heading', { level: 6 }) ? 'is-active' : '', 'text-xs')}
        >
          <Heading6 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive('bulletList') ? 'is-active' : '', 'text-xs')}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') ? 'is-active' : '', 'text-xs')}
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') ? 'is-active' : '', 'text-xs')}
        >
          <Code size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive('blockquote') ? 'is-active' : '', 'text-xs')}
        >
          <Quote size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="text-xs"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="text-xs"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className="text-xs"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className="text-xs"
        >
          <Redo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={cn(editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : '', 'text-xs')}
        >
          <div style={{ backgroundColor: '#958DF1', width: 16, height: 16, borderRadius: '50%' }} />
        </button>
      </div>
    </div>
  )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({
        HTMLAttributes: {
            style: 'font-style: inherit; font-weight: inherit; text-decoration: inherit;',
        },
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

export default function TextEditor () {
  return (
    <div className="tiptap">
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions}></EditorProvider>
    </div>
  )
}