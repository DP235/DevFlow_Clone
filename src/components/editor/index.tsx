'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  codeBlockPlugin,
  codeMirrorPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import "./dark-editor.css"
import { basicDark } from "cm6-theme-basic-dark"
import { useTheme } from 'next-themes'
import { Separator } from '@radix-ui/react-dropdown-menu'

interface Props {
    value: string;
    fieldChange: (value: string) => void;
    editorRef: ForwardedRef<MDXEditorMethods> | null 
}

const Editor = ({ value, editorRef, fieldChange, ...props}: Props) => {
    const { resolvedTheme } = useTheme();

    const theme = resolvedTheme === "dark" ? [basicDark] : [];
    
    return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      className='background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border'
      onChange={fieldChange}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({ 
            codeBlockLanguages: { 
                css: 'CSS',
                txt: 'txt',
                sql: 'sql',
                html: 'html',
                sass: 'sass',
                scss: 'scss',
                bash: 'bash',
                json: 'json',
                js: 'javaScript', 
                ts: 'typescript',
                "": 'unspecified',
                tsx: 'TypeScript (React)',
                jsx: 'JavaScript (React)',
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        toolbarPlugin({
            toolbarContents: () => (
            <ConditionalContents
              options={[
                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      
                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  )
                }
              ]}
            />
            )
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}

export default Editor