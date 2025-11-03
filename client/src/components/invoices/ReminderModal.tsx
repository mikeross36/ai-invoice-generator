import { useState, useEffect } from "react";
import { generateReminderContent } from "@/services/api";
import { useGenerateReminder } from "@/hooks/mutations";
import Loader from "@/components/Loader";

type PropsType = {
  reminderModalOpen: boolean;
  onClose: () => void;
  selectedInvoiceId: string | null;
};

const ReminderModal = ({
  reminderModalOpen,
  onClose,
  selectedInvoiceId,
}: PropsType) => {
  const [reminderContent, setReminderContent] = useState<string>("");
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const { generateReminderMutation, isGenerateReminderLoading } =
    useGenerateReminder();

  useEffect(() => {
    const fetchReminderContent = async (selectedInvoiceId: string) => {
      setReminderContent("");
      try {
        const content = await generateReminderContent(selectedInvoiceId);
        if (!content) {
          throw new Error("Failed to fetch reminder content!");
        }
        await generateReminderMutation(selectedInvoiceId);
        setReminderContent(content.reminderText);
      } catch (err) {
        console.error("Error generating reminder:", err);
        onClose();
      }
    };
    if (reminderModalOpen && selectedInvoiceId) {
      fetchReminderContent(selectedInvoiceId);
    }
  }, [generateReminderMutation, onClose, reminderModalOpen, selectedInvoiceId]);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(reminderContent)
      .then(() => {
        setHasCopied(true);
        setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      })
      .catch((err) => console.error("Error copying to clipboard:", err));
  };

  if (isGenerateReminderLoading) {
    return <Loader />;
  }

  if (!reminderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-900 opacity-75"
        ></div>
        <div
          className="relative bg-emerald-600 rounded-lg shadow-xl max-w-lg w-full transform transition-all
          p-6 text-left"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center text-lg font-semibold text-slate-100 capitalize">
              AI generated reminder
            </h3>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-slate-50 cursor-pointer"
            >
              close
            </button>
          </div>
          {isGenerateReminderLoading ? (
            <></>
          ) : (
            <div className="space-y-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-100 capitalize">
                  reminder text
                </legend>
                <textarea
                  name="reminderContent"
                  value={reminderContent}
                  readOnly
                  className="textarea h-32 bg-black border border-slate-300 text-slate-50
                  text-sm rounded-lg block w-full"
                ></textarea>
              </fieldset>
            </div>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="btn bg-white hover:bg-slate-100 text-slate-600
              border border-slate-300 hover:border-slate-400 capitalize"
            >
              close
            </button>
            <button
              onClick={handleCopyToClipboard}
              disabled={isGenerateReminderLoading}
              className="btn btn-neutral"
            >
              {hasCopied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
