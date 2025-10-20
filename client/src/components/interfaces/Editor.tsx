import  { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IconButton } from "@radix-ui/themes";
import { BiParagraph } from "react-icons/bi";
import {
  MdUndo,
  MdRedo,
  MdFormatBold,
  MdFormatItalic,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";
import { HiMiniH1, HiMiniH2 } from "react-icons/hi2";

type props = {
  content: string;
  setContent: (content: string) => void;
};

export default function Editor({ content = "", setContent }: props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const [, setRefresh] = useState(false);

  useEffect(() => {
    if (!editor) return;
    const update = () => setRefresh((r) => !r);
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) return null;

  const buttons = [
    {
      icon: <MdFormatBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <MdFormatItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <HiMiniH1 />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <HiMiniH2 />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <MdFormatQuote />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <MdFormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <MdFormatListNumbered />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <BiParagraph />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
    {
      icon: <MdFormatQuote />,
      action: () => editor.chain().focus(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <MdUndo />,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
    },
    {
      icon: <MdRedo />,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
    },
  ];

  return (
    <div onClick={() => editor.chain().focus().run()} className="border-[1px] border-gray-300 dark:border-gray-600/5 dark:bg-gray-800 rounded-lg">
      <div className="dark:bg-gray-900 bg-gray-50 static top-0 text-white rounded-t-lg p-2 flex flex-wrap gap-2">
        {buttons.map((btn, idx) => (
          <IconButton
            key={idx}
            type="button"
            size={"2"}
            radius="medium"
            onClick={btn.action}
            variant={btn.isActive ? "solid" : "soft"}
          >
            {btn.icon}
          </IconButton>
        ))}
      </div>
      <div className="p-4 h-[200px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
