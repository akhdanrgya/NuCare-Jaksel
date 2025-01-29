import { useState, useEffect } from "react";
import { List, Heading1, Heading2, Heading3, Code, Bold, Italic, Strikethrough, ListOrdered } from "lucide-react";
import { Editor } from '@tiptap/core';

export default function ToolBar({ editor }: { editor: Editor | null }) {
    const [active, setActive] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (editor) {
            const updatedState: { [key: string]: boolean } = {};
            const options = [
                "heading1", "heading2", "heading3", "bold", "italic", "strike", "bulletList", "orderedList", "code"
            ];
            options.forEach((key) => {
                updatedState[key] = editor.isActive(key);
            });
            setActive(updatedState);

            // Listen for updates to reset active state
            const handleEditorUpdate = () => {
                const updatedState: { [key: string]: boolean } = {};
                options.forEach((key) => {
                    updatedState[key] = editor.isActive(key);
                });
                setActive(updatedState);
            };

            editor.on('update', handleEditorUpdate);

            // Cleanup event listener on component unmount
            return () => {
                editor.off('update', handleEditorUpdate);
            };
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                // Reset active state for heading, bold, italic, etc. except list and code
                setActive((prevState) => ({
                    heading1: false,
                    heading2: false,
                    heading3: false,
                    bold: false,
                    italic: false,
                    strike: false,
                    // List and code remain unaffected
                    bulletList: prevState.bulletList,
                    orderedList: prevState.orderedList,
                    code: prevState.code,
                }));
            }
        };

        // Add event listener for keydown
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [editor]);

    const handleToggle = (key: string, callback: () => void, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (editor) {
            callback();
            setActive((prevState) => ({
                ...prevState,
                [key]: !prevState[key],
            }));
        }
    };

    const Options = [
        {
            key: "heading1",
            icon: <Heading1 className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            key: "heading2",
            icon: <Heading2 className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            key: "heading3",
            icon: <Heading3 className="size-4" />,
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
            key: "bold",
            icon: <Bold className="size-4" />,
            onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
            key: "italic",
            icon: <Italic className="size-4" />,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
            key: "strike",
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor?.chain().focus().toggleStrike().run(),
        },
        {
            key: "bulletList",
            icon: <List className="size-4" />,
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            key: "orderedList",
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        {
            key: "code",
            icon: <Code className="size-4" />,
            onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
        },
    ];

    return (
        <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
            {Options.map((option, i) => (
                <button
                    key={i}
                    className={`p-2 rounded-md ${active[option.key] ? "bg-blue-500 text-white" : "bg-white"}`}
                    onClick={(e) => handleToggle(option.key, option.onClick, e)} // Pass the event here
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
}
