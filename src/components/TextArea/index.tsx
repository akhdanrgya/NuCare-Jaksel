import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HardBreak from "@tiptap/extension-hard-break";

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            }),
            HardBreak, // Menambahkan extension HardBreak
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            if (editor) {
                onChange(editor.getHTML());
            }
        },
    });

    return (
        <div>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
