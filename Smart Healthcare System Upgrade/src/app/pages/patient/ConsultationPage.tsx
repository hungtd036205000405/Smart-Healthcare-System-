import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Headphones,
  MessageSquare,
  Send,
  ShieldCheck,
  Star,
  User,
  Video,
} from "lucide-react";

type ChatMessage = {
  id: number;
  sender: "patient" | "assistant";
  text: string;
  time: string;
};

const experts = [
  {
    id: 1,
    name: "TS. Trần Đức Mạnh",
    specialty: "AI y tế",
    rating: 4.9,
    online: true,
    nextSlot: "Hôm nay, 16:00",
  },
  {
    id: 2,
    name: "PGS. Lê Thị Hoa",
    specialty: "Dinh dưỡng",
    rating: 4.8,
    online: true,
    nextSlot: "Hôm nay, 17:30",
  },
  {
    id: 3,
    name: "TS. Nguyễn Văn Sơn",
    specialty: "Tâm lý",
    rating: 4.9,
    online: false,
    nextSlot: "Ngày mai, 09:00",
  },
];

const quickQuestions = [
  "Tôi nên chuẩn bị gì trước buổi khám?",
  "Chỉ số huyết áp 120/80 có bình thường không?",
  "Tôi muốn tư vấn chế độ ăn giảm cân.",
  "Khi nào cần đi khám trực tiếp?",
];

export default function ConsultationPage() {
  const [selectedExpertId, setSelectedExpertId] = useState(experts[0].id);
  const [message, setMessage] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      text: "Xin chào, tôi có thể hỗ trợ bạn sàng lọc triệu chứng và chuẩn bị câu hỏi trước buổi tư vấn.",
      time: "09:00",
    },
  ]);

  const selectedExpert = useMemo(
    () => experts.find((expert) => expert.id === selectedExpertId) || experts[0],
    [selectedExpertId],
  );

  const sendMessage = (text = message) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setChatMessages((current) => [
      ...current,
      { id: Date.now(), sender: "patient", text: trimmed, time: now },
      {
        id: Date.now() + 1,
        sender: "assistant",
        text: "Tôi đã ghi nhận thông tin. Nếu có đau ngực dữ dội, khó thở nặng, ngất hoặc triệu chứng cấp tính, bạn nên đến cơ sở y tế ngay.",
        time: now,
      },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Tư vấn trực tuyến</h1>
              <p className="max-w-2xl text-blue-100">
                Chat nhanh với trợ lý sức khỏe, chọn chuyên gia và đặt lịch video
                call khi cần tư vấn sâu.
              </p>
            </div>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
              <Headphones className="size-9" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Chat hỗ trợ sức khỏe
                    </h2>
                    <p className="text-sm text-gray-600">
                      Không thay thế chẩn đoán của bác sĩ.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <ShieldCheck className="size-4" />
                    Bảo mật
                  </span>
                </div>
              </div>

              <div className="h-[430px] space-y-4 overflow-y-auto p-6">
                {chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex gap-3 ${
                      chat.sender === "patient" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {chat.sender === "assistant" && (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Bot className="size-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                        chat.sender === "patient"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-6">{chat.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          chat.sender === "patient"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {chat.time}
                      </p>
                    </div>
                    {chat.sender === "patient" && (
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                        <User className="size-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100"
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") sendMessage();
                    }}
                    placeholder="Nhập câu hỏi sức khỏe..."
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={() => sendMessage()}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white transition-all hover:bg-blue-700"
                  >
                    <Send className="size-5" />
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Chọn chuyên gia
              </h2>
              <div className="space-y-3">
                {experts.map((expert) => (
                  <button
                    key={expert.id}
                    onClick={() => setSelectedExpertId(expert.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedExpertId === expert.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.specialty}</p>
                      </div>
                      <span
                        className={`size-3 rounded-full ${
                          expert.online ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Star className="size-4 fill-yellow-400" />
                        {expert.rating}
                      </span>
                      <span className="text-gray-500">{expert.nextSlot}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <Video className="size-6" />
              </div>
              <h2 className="mb-2 text-lg font-bold text-gray-900">
                Đặt video call
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                {selectedExpert.name} còn lịch gần nhất: {selectedExpert.nextSlot}
              </p>
              <div className="mb-4 space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-blue-600" />
                  {selectedExpert.nextSlot.split(",")[0]}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-blue-600" />
                  {selectedExpert.nextSlot.split(",")[1]?.trim() || "09:00"}
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-4 text-blue-600" />
                  30 phút tư vấn
                </div>
              </div>
              <button
                onClick={() => setScheduled(true)}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Xác nhận đặt lịch
              </button>
              {scheduled && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  Đã ghi nhận lịch tư vấn. Lịch này sẽ được xác nhận bởi chuyên gia.
                </div>
              )}
            </motion.section>
          </aside>
        </div>
      </div>
    </div>
  );
}
