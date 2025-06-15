'use client';

import './index.scss';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import MenuBar from './menu-bar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  className,
  disabled,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    content: content, // Initial HTML content
    editorProps: {
      attributes: {
        class:
          'min-h-[156px] dark:bg-transparent bg-white outline-none rounded-md py-2 px-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Output HTML on change
    },
  });

  // Update editor content when the `content` prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false); // false prevents emitting an update event
    }
  }, [editor, content]);

  return (
    <div className='border rounded-md'>
      <MenuBar editor={editor} />
      <EditorContent
        className={className}
        editor={editor}
        disabled={disabled}
      />
    </div>
  );
}
